import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addProfileExperience } from "../../actions/profileActions";

const AddExperience = ({ addProfileExperience, history, auth: { user } }) => {
  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  //   const [toDateDisabled, toggleDisabled] = useState(false); not needed ?

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  } = experienceData;

  const handleChange = (e) =>
    setExperienceData({ ...experienceData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfileExperience(experienceData, history);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Agregar servicios en la iglesia</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Agregá algún servicio en el que
        hayas participado
      </p>
      <small>* = campos requeridos</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Cargo"
            name="title"
            required
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Ministerio"
            name="company"
            required
            value={company}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Lugar"
            name="location"
            value={location}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Desde</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={(e) => {
                setExperienceData({ ...experienceData, current: !current });
                // toggleDisabled(!toDateDisabled); not needed?
              }}
            />{" "}
            Servicio actual
          </p>
        </div>
        <div className="form-group">
          <h4>Hasta</h4>
          <input
            type="date"
            name="to"
            value={to}
            disabled={current ? "disabled" : ""}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Descripción del servicio"
            value={description}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to={`/profile/${user._id}`}>
          Volver atrás
        </Link>
      </form>
    </div>
  );
};

AddExperience.propTypes = {
  addProfileExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addProfileExperience })(
  withRouter(AddExperience) //withRouter allows to use history and pass it to the AddExperience component
);
