import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileActions";

const Education = ({ education, deleteEducation }) => {
  const educationList = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Historial académico/profesional</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Estudios/Trabajos</th>
            <th className="hide-sm">Título/Empresa</th>
            <th className="hide-sm">Años</th>
            <th />
          </tr>
        </thead>
        <tbody>{educationList}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
