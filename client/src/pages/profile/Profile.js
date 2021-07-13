import React from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar";


export default function Profile() {
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [seed, setSeed] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?username=${username}`);
          setUser(res.data);
        };
        fetchUser();
      }, [username]);


      useEffect(() => {
          setSeed(Math.floor(Math.random() * 5000));        
      }, []);
    return (
        <>
        <Topbar />
        <div className="profileContainer">
            <Sidebar />
            <div className="profile">
                <div className="profileTop">
                    <div className="profileCover">
                        <img
                            className="profileCoverImg"
                            src="/assets/coverPic.jpg"
                            // {
                            //   user.coverPicture
                            //     ? PF + user.coverPicture
                            //     : PF + "person/noCover.png"
                            // }
                            alt=""
                        />
                        <img
                            className="profileUserImg"
                            src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                            // {
                            //   user.profilePicture
                            //     ? PF + user.profilePicture
                            //     : PF + "person/noAvatar.png"
                            // }
                            alt=""
                        />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                    </div>
                </div>
                <div className="profileBottom">
                    <ProfileRightbar user={user}/>
                </div>
            </div>
        </div>
        </> 
            
        
    )
    }
