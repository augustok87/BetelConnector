import React, { useState, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfileAction,
  getCurrentProfile,
} from "../../actions/profileActions";

import Spinner from "../layout/Spinner";

const CreateProfile = ({
  auth: { user },
  getCurrentProfile,
  createProfileAction,
  history,
  profile: { profile, loading },
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

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading) return <Spinner />;
  if (profile) return <Redirect to="/edit-profile" />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfileAction(formData, history, false);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Crea tu perfil</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Contanos un poco de vos.
      </p>
      <small style={{ color: "red" }}>* campos requeridos</small>

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Cómo te llamas?"
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">Cuál es tu nombre y apellido?</small>
        </div>

        <div className="form-group">
          <select
            type="text"
            name="status"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            <option value="0">Selecciona tu status académico/laboral</option>
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
            placeholder="Habilidades o Hobbies"
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

CreateProfile.propTypes = {
  createProfileAction: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfileAction,
  getCurrentProfile,
})(
  withRouter(CreateProfile) //withRouter allows to use history and pass it to the CreateProfile component
);
