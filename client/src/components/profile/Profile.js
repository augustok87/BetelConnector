import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
// import ProfileGithub from "./ProfileGithub";
import {
  getProfileById,
  deleteExperience,
  deleteEducation,
} from "../../actions/profileActions";
import DashboardActions from "../dashboard/DashboardActions";

const Profile = ({
  setAlert,
  deleteExperience,
  getProfileById,
  auth,
  profile: { profile, loading },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <div className="container">
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Editar Perfil
              </Link>
            )}

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <DashboardActions />
            <ProfileAbout profile={profile} />

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experiencia</h2>
              {profile.experience.length > 0 ? (
                profile.experience.map((exp) => (
                  <tr className="space-between">
                    <td>
                      <ProfileExperience key={exp._id} experience={exp} />
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
                ))
              ) : (
                <h4>Sin registros de servicio en la iglesia</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Educación</h2>

              {profile.education.length > 0 ? (
                profile.education.map((edu) => (
                  <tr className="space-between">
                    <td>
                      <ProfileEducation key={edu._id} education={edu} />
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
                ))
              ) : (
                <h4>Sin registros de educación</h4>
              )}
            </div>

            {/* {auth.user._id === profile.user._id ? <Dashboard /> : null} */}
          </div>
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, deleteExperience })(
  Profile
);
