import React from 'react';
import "./chat.css";
import {useContext, useEffect, useState, useRef } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import ChatCardsListing from '../../components/chatCardsListing/ChatCardsListing';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSmile, faPaperclip, faMicrophone, faSearch } from "@fortawesome/free-solid-svg-icons";
import Message from '../../components/message/Message';
import OnlineCards from '../../components/OnlineCards/OnlineCards';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client";

export default function Chat() {
 
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect(()=>{
        socket.current = io("http://localhost:4000");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });
    },[]);

    useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);
    
      useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
          setOnlineUsers(
            user.followings.filter((f) => users.some((u) => u.userId === f))
          );
        });
      }, [user]);
    
      useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get("/conversations/" + user._id);
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
      }, [user._id]);
    
      useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await axios.get("/messages/" + currentChat?._id);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        };
    
        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
    
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });
    
        try {
          const res = await axios.post("/messages", message);
          setMessages([...messages, res.data]);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return (
        <>
        <Topbar />
        <div className="homeContainer">
            <Sidebar />
            <div className="chatfeed">
            <div className="feedWrapper">
                <div className="feedHeading">
                <span className="feedHeadingText">Chats</span>
                <MenuOutlinedIcon className="feedHeadingIcon"/>
                </div>
                <hr className="feedHeadingLine"/>
                <div className="search">
                    <FontAwesomeIcon className="icon-block" icon={faSearch} />
                    <input placeholder = "Search or Start a new Chat" />
                </div>
                <div className="chat-cards-listing">

                     {conversations.map((c) => (
              <div onClick={()=> setCurrentChat(c)}>
              <ChatCardsListing conversation={c} currentUser={user} />
              </div>
            ))}
                
                </div>
            </div>
        </div>
        <div className="chatrightbar">
            <div className="chatcontainer">
                {currentChat ? 
                <>
                <div className="chat-section">
                    {messages.map(m=>(
                        <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id}/>
                        </div>
                    ))}
                 </div>

                <form>
                    <div className="chat-form"> 
                        <div  className="action-btn">
                            <FontAwesomeIcon className="icon-block" icon={faSmile} />
                            <FontAwesomeIcon className="icon-block" icon={faPaperclip} />
                        </div>
  
                        <input onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} className="chat-input" placeholder="Type your message here" type="text"/>
                        <button type="submit" onClick={handleSubmit}>Send msg</button>
                        <FontAwesomeIcon className="icon-block" icon={faMicrophone}/>
                    </div>
                </form>
                </> : <span className="noConversationText">Open a conversation to start a chat</span>
                }
            </div>
        </div>
        <div className="chatOnline">
        <div className="chatOnlineWrapper">
        <div className="OnlinefeedHeading">
                <span className="OnlinefeedHeadingText">Online Friends</span>
                </div>
                <hr className="OnlinefeedHeadingLine"/>
                <div className="chat-cards-listing">
                <OnlineCards onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                </div>
        </div>
        </div>


        </div>
    </>
    )
}
