import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

const Login = ({ login, isAuthenticated, profile: { profile } }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container">
      {/* {isAuthenticated && <Redirect to="/login" />} */}
      <section>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Ya tienes cuenta? Log-In !
        </p>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Log In!" />
        </form>
        <p className="my-1">
          No tenés una cuenta? <Link to="/register">Registrate</Link>
        </p>
      </section>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, //coming from initialState from authReducer
  profile: state.profile,
});

export default connect(mapStateToProps, { login })(Login);
