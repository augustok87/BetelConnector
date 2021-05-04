import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfileAction,
  getCurrentProfile,
} from "../../actions/profileActions";

const EditProfile = ({
  auth: { user },
  profile: { profile, loading },
  createProfileAction,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleDisplaySocialInputs] = React.useState(
    false
  );

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      name: loading || !profile.name ? "" : profile.name,
      company: loading || !profile.company ? "" : profile.company,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading, getCurrentProfile, createProfileAction]);

  const {
    name,
    company,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      // [e.target.name]: e.target.value === "" ? undefined : e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfileAction(formData, history, true);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Edita tu Perfil</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Contanos un poco sobre tu perfil.
      </p>
      <small style={{ color: "red" }}>* campos requeridos</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tu nombre..."
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Si quieres cambiarte el nombre de perfil.
          </small>
        </div>
        <div className="form-group">
          <select
            type="text"
            name="status"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            <option value="0">* Seleccione su status academico/laboral</option>
            <option value="Trabajador">Trabajador</option>
            <option value="Estudiante">Estudiante</option>
            <option value="Trabajador y Estudiante">
              Trabajador y Estudiante
            </option>
            <option value="Amo/Ama de casa">Amo/Ama de casa</option>
          </select>
          <small className="form-text">
            Danos una idea de qué andás haciendo estos días...
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Qué/Dónde estudiás o trabajás?"
            name="company"
            value={company}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Tu colegio/universidad y/o nombre de empresa
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Lugar"
            name="location"
            value={location}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">Provincia, Ciudad, Barrio</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Contanos cuáles son tus habilidades, utilizando comas en el medio
            (Técnica, Arte, Deporte, etc)
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="Contanos un poco más de vos..."
            name="bio"
            value={bio}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <small className="form-text">
            Si querés compartinos una breve descripción de tu vida.
          </small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleDisplaySocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to={`/profile/${user._id}`}>
          Go Back
        </Link>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  createProfileAction: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createProfileAction,
  getCurrentProfile,
})(
  withRouter(EditProfile) //withRouter allows to use history and pass it to the CreateProfile component
);
