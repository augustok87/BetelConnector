const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    // eliminar o reemplazar
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    // cambiar a barrio, ciudad y pais
    type: String,
  },
  status: {
    // eliminar o reemplazar
    type: String,
  },
  skills: {
    // cambiar etiqueta a "skills para servicio"
    type: [String],
  },
  bio: {
    type: String,
  },
  githubusername: {
    // eliminar
    type: String,
  },
  experience_church: [
    // cambiar a experiencia en la iglesia
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        // cambiar a "ministerio"
        type: String,
        required: true,
      },
      location: {
        // eliminar
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    // Educacion fuera de la iglesia
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  experience: [
    // cambiar a experiencia laboral fuera de la iglesia
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
