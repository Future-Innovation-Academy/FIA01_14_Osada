import React from "react";
import './Modal.css'



const Modal = (props) => {
    const closeModal = () => {
        props.setShowModal(false);
      };
      
    return (
      <>
        {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
          <div id="overlay__modal" className="overlay__modal">
            <div id="modalContent" className="modalContent">
             
              <h3 className="rule__title text__center ">{props.content}</h3>

              <div className="rule__contents" >
                <p>カードにはそれぞれ三すくみの関係がある。</p>
                <p><b>皇帝のカードは市民のカードに勝ち</b>
                  <br/><b>市民のカードは奴隷のカードに勝ち</b>
                  <br/><b>奴隷のカードは皇帝のカードに勝ち</b></p>
                <p>というじゃんけんのような法則があり、<br/>
                  5枚のカードを出し終えた時点で勝利数が多いプレイヤーが勝ちである。</p>
              </div>
              <div className="rule__contents" >
                
                <p><b>つまり、一度だけ勝敗がついた時点で勝敗が決定する。</b></p>
              </div>

              <div className="text__center"> <button onClick={closeModal}>Close</button></div>

             
            </div>
          </div>
        ) : (
          <></>// showFlagがfalseの場合はModalは表示しない
        )}
      </>
    );
  };

export default Modal;