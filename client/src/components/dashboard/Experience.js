import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr exp={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(exp._id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Servicio en la iglesia </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Ministerio</th>
            <th className="hide-sm">Cargo</th>
            <th className="hide-sm">Años</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
