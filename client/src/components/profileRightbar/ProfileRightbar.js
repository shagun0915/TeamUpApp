import React from 'react';
import "./profileRightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";


export default function ProfileRightbar({ user }) {
    const [seed, setSeed] = useState("");
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));


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

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));        
}, []);
    return (
        <>

                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                    <Link
                        to={"/profile/" + friend.username}
                        style={{ textDecoration: "none" }}
                    >
                        <div className="rightbarFollowing">
                            <img
                                src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                    </Link>
                    ))}
                </div>

        </>
      );
    };
