
import React from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import "./meeting.css";
import Topbar from '../../components/topbar/Topbar';


const Meeting = () => {

  const history = useHistory();
  
  const startCall = () => {
     //generate unique meeting id
    const uid = shortid.generate();
    //redirect to the callpage
    history.push(`/${uid}#init`);
  };

  return (
      <>
    <Topbar />
    <div className="home-page">
    
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2>Premium video meetings. Now free for everyone.</h2>
            <p>
              TeamUp, the service built for secure virtual meetings
            </p>
            <div className="action-btn">
              <button className="btn green" onClick={startCall}>
                <FontAwesomeIcon className="icon-block" icon={faVideo} />
                New Meeting
              </button>
              <div className="input-block">
                <div className="input-section">
                  <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                  <input placeholder="Enter a code or link" />
                </div>
                <button className="btn no-bg">Join</button>
              </div>
            </div>
          </div>
          <div className="help-text">
            <a href="">Learn more</a> about TeamUp
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <img src="/assets/meetingSS.jpg" alt="meetingIllustration"/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Meeting;