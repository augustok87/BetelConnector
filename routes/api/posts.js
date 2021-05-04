const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route           POST api/posts
// @description     Create a post
// @access          Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const profile = await Profile.findOne({ user: req.user.id });

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        company: profile.company,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           Get api/posts
// @description     Get all posts
// @access          Private

router.get("/", [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const allPosts = await Post.find().sort({ date: -1 }); //oldest first
    res.json(allPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route           Get api/:id
// @description     Get a post by id
// @access          Private

router.get("/:id", [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
    //
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route           Delete api/posts/:id
// @description     Delete a post by id
// @access          Private

router.delete("/:id", [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user is the owner of the post
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Post.findOneAndRemove({ _id: req.params.id });
    // or just do await post.remove()

    res.json({ msg: "Post removed" });
    //
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route           Put api/posts/like/:id
// @description     Like a post
// @access          Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
    //
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route           Delete api/posts/unlike/:id
// @description     Dislike a post
// @access          Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post haven't been liked" });
    }

    post.likes.pop({ user: req.user.id });

    await post.save();

    res.json(post.likes);
    //
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route           Put api/posts/comments/:id
// @description     Add a comment to a post
// @access          Private

router.put(
  "/comments/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        name: req.user.name,
        text: req.body.text,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
      //
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           Delete api/posts/comments/:id/:comment_id
// @description     Delete a comment from a post
// @access          Private

router.delete("/comments/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure comment exists
    if (!comment) {
      return res
        .status(400)
        .json({ msg: "Comment is no longer available for deletion" });
    }

    //Check User
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const removeIndex = post.comments.indexOf(comment);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
    //
  } catch (error) {
    // if (error.kind === "ObjectId") {
    //   return res.status(404).json({ msg: "Comment not found for deletion" });
    // }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
