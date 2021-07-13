import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./chatcardslisting.css";
import axios from 'axios';




export default function ChatCardsListing({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const [seed, setSeed] = useState("");

  useEffect(()=>{
    const friendId = conversation.members.find((m)=>m !==currentUser._id);
    
    const getUser = async ()=>{
      try{
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      }catch(err){
        console.log(err);
      }
      
    }
    getUser();
  },[currentUser, conversation]);



  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));        
}, []);




    return (
        
            <div className="card">
              <div className="img-container">
                  <img alt="Userimage" src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
              </div>
              <div className="card-detail">
                <h4 className="title">{user?.username}</h4>
                <p className="desc">Last message</p>
              </div>
              <div className="time">10 PM
              </div>
              <div className="action-btn">
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>

    );
}
