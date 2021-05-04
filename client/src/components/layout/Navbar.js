import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

const Navbar = ({
  profile: { profile, loading: profileLoading },
  auth: { isAuthenticated, loading, user },
  logout,
}) => {
  const authLinks = (
    <>
      <ul>
        <li>
          <Link to="/profiles">Contactos</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          {!profile ? (
            <Link to={`/create-profile`}>
              <i className="fas fa-user" />{" "}
              <span className="hide-sm">Crear perfil</span>
            </Link>
          ) : (
            <Link to={`/profile/${user._id}`}>
              <i className="fas fa-user" />{" "}
              <span className="hide-sm">Mi perfil</span>
            </Link>
          )}
        </li>
        <li>
          <a
            onClick={() => {
              logout();
            }}
            href="#!"
          >
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    </>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Integrantes</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  // if (!isAuthenticated) {
  //   return <Redirect to="/" />
  // }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">⛪️ CNB Home</Link>
      </h1>
      {!loading && (isAuthenticated ? authLinks : guestLinks)}
      {!isAuthenticated && <Redirect to="/" />}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout })(Navbar);
