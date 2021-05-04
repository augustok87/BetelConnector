import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alertActions";
import { register } from "../../actions/authActions";

const Register = ({ setAlert, register, isAuthenticated, firstTime }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger", 5000);
    } else {
      register({ email, password });

      // Commenting the below since we will use Redux to handle the state
      // const newUser = {
      //   name,
      //   email,
      //   password,
      //   password2,
      // };

      // try {
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };

      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post("/api/users", body, config);
      //   console.log(res.data);
      //   //
      // } catch (error) {
      //   console.error(error.response.data);
      // }
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/create-profile" />;
  }

  return (
    <div className="container">
      <section>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Creá tu cuenta
        </p>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          {/* <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div> */}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        {/* <p className="my-1">
          Ya tenés una cuenta? <Link to="/login">Sign In</Link>
        </p> */}
      </section>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, //coming from initialState from authReducer
});

export default connect(mapStateToProps, { setAlert, register })(Register);
