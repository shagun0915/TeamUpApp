import React from 'react';
import "./onlinecards.css";
import {useEffect, useState} from 'react';
import axios from "axios";


function OnlineCards({onlineUsers, currentId, setCurrentChat}) {
    const [seed, setSeed] = useState("");
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(()=>{
      const getFriends = async() => {
        const res = await axios.get("/users/friends/" + currentId);
        setFriends(res.data);
      };
      getFriends();
    },[currentId]);

    useEffect(()=>{
      setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)));
    },[friends, onlineUsers]);

    const handleClick = async (user) =>{
      try{
        const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
        setCurrentChat(res.data);
      }catch(err){
        console.log(err);
      }
    }

    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));        
  }, []);
    return (
        <div className="cardContainer">
          
          {onlineFriends.map((o)=>(
          <div className="card" onClick={()=>handleClick(o)}>
          
          <div className="img-container">
              <img alt="OnlineFriendImage" src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          </div>
          <div className="card-detail">
            <h4 className="title">{o?.username}</h4>
          </div>
          </div>
          ))}
      </div>
    )
}

export default OnlineCards;
