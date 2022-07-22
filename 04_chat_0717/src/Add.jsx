import React from "react";

const Add = ({ addData, handleInputChange, titleValue,title2Value, handleInputChange2 }) => {
  return (
    <div>
      {/* hrタグは線 */}
      <hr />
      <h1>登録の処理</h1>
      {/* このあとuseStateを新しく記述します🤗 */}
      <p>{titleValue}</p>
      <input id="bg-color" type="color" value="" />
      {/* 入力させるinputタグを記述 */}
      <input type="text" value={titleValue} onChange={handleInputChange} />
      <input type="text" value={title2Value} onChange={handleInputChange2} />
      {/* 送信のボタンを記述 */}
      <button onClick={addData}>送信</button>
    </div>
  );
};

export default Add;