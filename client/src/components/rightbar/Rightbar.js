import React from 'react';
import "./rightbar.css"
import Newmessage from '../newMessage/Newmessage';
import Newmeeting from '../newMeeting/Newmeeting';

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="activitycontainer">
          <Newmessage />
          <Newmeeting />
      </div>
    </div>
  );
}