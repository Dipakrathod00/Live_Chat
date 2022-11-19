import React ,{useState} from 'react'
import "./Join.css"
import logo from "../../images/whatsapp.png"
import {Link} from "react-router-dom"
 
let user
export default function Join() {
  const [username, setusername] = useState("")
      const senduser =()=>{
        user =document.getElementById("loginInput").value
               document.getElementById("loginInput").value =" "

      }
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img className='logoImage' src={logo} alt="" />
            <h1>Live Chat</h1>
            <div className='loginDiv'>
            <input onChange={e=> setusername(e.target.value)} type="text" id='loginInput' placeholder='please enter login Credential' className='joinInput'  />
          <Link onClick={e=> !username ? e.preventDefault(): null} to="/chat">  <button className='loginBtn' onClick={senduser}>logIn</button></Link>
            </div>
        </div>
    </div>
  )
}
export {user}
