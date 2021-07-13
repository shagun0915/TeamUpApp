import "./topbar.css"
import Search from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Togglemenu from "../togglemenu/Togglemenu";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";


import React from 'react';

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, []);
    
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}><span className="logo">TeamUp</span></Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <Search className="searchIcon"/>
                <input placeholder="Search for People and Chats" className="searchInput" />         
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <PersonIcon />
                    <span className="topbarIconBadge">1</span>
                </div> 
                <div className="topbarIconItem">
                    <ChatIcon />
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                    <NotificationsIcon />
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
           <div className="toggleMenu">
                <Togglemenu />
           </div>
           <Link to={`/profile/${user.username}`}>
            <img  src={`https://avatars.dicebear.com/api/human/${seed}.svg`} alt="UserProfileImg" className="topbarImg" />
            </Link>
        </div>
    </div>
  );
}
