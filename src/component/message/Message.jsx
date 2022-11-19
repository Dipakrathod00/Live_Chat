import React from 'react'
import "./message.css"

export default function Message({user, message , classes}) {
  if(user){
    return (
      <div>
        <div className={`alert alert-success ${classes}`}>
         {`${user}:${message}`}
        </div>
      </div>
    )
  }else{
    return (
      <div>
        <div className={`alert alert-success ${classes}`}>
         {`You : ${message}`}
        </div>
      </div>
    )
  }
  
}
