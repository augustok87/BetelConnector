import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addProfileEducation } from "../../actions/profileActions";

const AddEducation = ({ addProfileEducation, history, auth: { user } }) => {
  const [educationData, setEducationData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = educationData;

  const handleChange = (e) =>
    setEducationData({ ...educationData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfileEducation(educationData, history);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Agregá tu experiencia en el mundo</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Tus estudios o experiencia
        profesional
      </p>
      <small>* Campos requeridos</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Estudio o Profesión"
            name="school"
            value={school}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Título o empresa"
            name="degree"
            value={degree}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Área de estudio o profesión"
            name="fieldofstudy"
            value={fieldofstudy}
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
              onChange={(e) => {
                setEducationData({ ...educationData, current: !current });
              }}
            />{" "}
            Estudio o Profesión actual
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
            placeholder="Descripción del estudio o trabajo"
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

AddEducation.propTypes = {
  addProfileEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addProfileEducation })(
  withRouter(AddEducation) //withRouter allows to use history and pass it to the AddEducation component
);
