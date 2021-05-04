import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile: { name, bio, skills } }) => (
  <>
    <div className="profile-about bg-light p-2">
      {bio ? (
        <>
          <h2 className="text-primary">{name}'s Bio</h2>
          <p>{bio}</p>
        </>
      ) : (
        <h4>Sin biografía</h4>
      )}
      <div className="line"></div>
      <h2 className="text-primary">Habilidades e Interses</h2>
      <div className="skills">
        {console.log(skills)}
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div className="p-1" key={index}>
              <i className="fas fa-check"></i> {skill}
            </div>
          ))
        ) : (
          <h4>Sin registros</h4>
        )}
      </div>
    </div>
  </>
);
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
