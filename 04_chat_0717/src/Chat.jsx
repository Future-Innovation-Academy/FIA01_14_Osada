import React from "react";


const Chat = ({ addData, handleInputChange,  msgValue, userName}) => {
  return (
    <>
      <h2>{userName}</h2>   
      <input type="text" value={msgValue} onChange={handleInputChange} />
      {/* <input type='image' onClick={addData} src='/src/img/Airplane.png' alt='' />        */}
      <button onClick={addData}>送信</button>
    </>
  );
};

export default Chat;