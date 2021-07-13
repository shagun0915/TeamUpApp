import React from 'react';
import "./feed.css";
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


export default function Feed() {
    const [seed, setSeed] = useState("");
    const [friends, setFriends] = useState([]);
    const { user} = useContext(AuthContext);
    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendList = await axios.get("/users/friends/" + user._id);
            setFriends(friendList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getFriends();
      }, [user]);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, []);

    return ( 
        <div className = "feed" >
            <div className="feedWrapper">
                <div className="feedHeading">
                        <span className="feedHeadingText">Your Friends</span>
                        <MenuOutlinedIcon className="feedHeadingIcon"/>
                </div>
                <hr className="feedHeadingLine"/>
                <div className="chat-cards-listing">
                {friends.map((friend) => (
                    <Link
                    to={"/profile/" + friend.username}
                    style={{ textDecoration: "none" }}
                  >
                <div className="card">
                    
                    <div className="img-container">
                        <img alt="OnlineFriendImage" src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    </div>
                    <div className="card-detail">
                    <h4 className="title">{friend.username}</h4>
                    
                    </div>
                </div>
                </Link>
                  ))} 
                </div>
            </div>
        </div>
    );
}