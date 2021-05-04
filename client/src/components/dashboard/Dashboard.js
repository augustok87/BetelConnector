import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getCurrentProfile,
  getAllProfiles,
} from "../../actions/profileActions";
import { deleteAccount } from "../../actions/profileActions";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { setAlert } from "../../actions/alertActions";

const Dashboard = ({
  setAlert,
  getCurrentProfile,
  getAllProfiles,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getAllProfiles();
  }, [getCurrentProfile, getAllProfiles]);

  return (
    <>
      {loading === true || profile === null ? <Spinner /> : null}

      <>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Bienvenido {user && user.name} !
        </p>
        {profile !== null ? (
          <>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2" onClick={() => deleteAccount()}>
              <button className="btn btn-danger">
                <i className="fas fa-user"></i> Borrar mi cuenta
              </button>
            </div>
          </>
        ) : (
          <>
            <p>You have not yet setup a profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </>
        )}
      </>
    </>
  );
};

Dashboard.propTypes = {
  setAlert: PropTypes.func,
  getCurrentProfile: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  setAlert,
  getCurrentProfile,
  getAllProfiles,
  deleteAccount,
})(Dashboard);
