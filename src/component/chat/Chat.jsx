import React from "react";
import { user } from "../join/Join";
import socketIo from "socket.io-client";
import { useEffect } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom"
import "./Chat.css";
import { useState } from "react";
import Message from "../message/Message"

let socket;
const ENDPOINT = "https://livechat0.herokuapp.com/";

export default function Chat() {
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([])
  
  const send = () => {
    const message = document.getElementById("messageInput").value;
    socket.emit("message", { message, id });
    document.getElementById("messageInput").value = "";
  };
console.log(messages);
  useEffect((e) => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("connected");
      setid(socket.id);
    });
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setmessages([...messages , data])
      console.log(data.user, data.message);

    });

    socket.on("userjoined", (data) => {
      setmessages([...messages , data])
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setmessages([...messages , data])
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect ");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendmessage", (data) => {
      setmessages([...messages , data])
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <>
      <div className="MyPage">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-2">
              .
              <div class="alert alert-primary">
                <div className="card">
                  
                  <div className="card-header d-flex justify-content-between align-items-center">
                  <i class="bi bi-chat-square-heart"></i>
                   <h5> Love Bird Chat</h5>
                    <a href="/"><i class="bi bi-x-square"></i></a>
                    </div>
                   
                  <ReactScrollToBottom className="card-body">
                    {
                      messages.map((item , i)=><Message message={item.message} user={item.id===id ? "You" : item.user}  classes={item.id===id ? "right" : "left"}/>)
                    }
                  </ReactScrollToBottom>
                  <div className="card-footer">
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control"
                        id="messageInput"
                        onChange={onkeyup=(Event)=Event ==="Enter" ? send() : null }
                      />
                      <button onClick={send} className="btn btn-success ">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
