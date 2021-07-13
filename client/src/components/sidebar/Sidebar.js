import React from 'react';
import "./sidebar.css";
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import {Link} from "react-router-dom";


export default function Sidebar() {

    
  return (
    <div className="sidebar">
    <div className="sidebarWrapper">
        <ul className="sidebarList">
        <Link to ="/" style={{textDecoration:"none", color: 'black'}}>
            <li className="sidebarListItem">
                
                <NotificationsNoneOutlinedIcon className="sidebarIcon"/>
               
                <span className="sidebarListItemText">Activity</span>

            </li>
            </Link>
            <Link to ="/chat" style={{textDecoration:"none", color:"black"}}>
            <li className="sidebarListItem">
                <ChatOutlinedIcon className="sidebarIcon"/>

                <span className="sidebarListItemText">Chat</span>
            </li>
            </Link>
            <li className="sidebarListItem">
                <GroupOutlinedIcon className="sidebarIcon"/>
                <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
                <EventNoteOutlinedIcon className="sidebarIcon"/>
                <span className="sidebarListItemText">Events</span>
            </li>
        </ul>
    </div>
    </div>
  );
}
