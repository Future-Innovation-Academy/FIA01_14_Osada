import React from "react";
import './ResultModal.css'



const ResultModal = (props) => {
    const closeResultModal = () => {
        props.setShowResultModal(false);
      };
      
    return (
      <>
        {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay__modal__Result" className="overlay__modal__Result">
          <div id="modalContent__Result" className="modalContent__Result">
            <div className="result__field">
                <div className="result__opponent">
                    <h3>Opponent's card</h3>
                    <div>
                      <img src= {props.opponentchoice} alt= {props.opponentchoice} border="10"  />
                    </div>
                </div>
                <div className="result__your">
                    <h3>Your card</h3>
                    <div>
                      <img src= {props.choice} alt= {props.choice}  border="10" />
                    </div>
                </div>
            </div>
            <div className="result text__center">
              <p className="kekka">{props.kekka}</p>
            </div>
             
              <div className="text__center"> <button onClick={closeResultModal}>Close</button></div>
           
          </div>
        </div>
        ) : (
          <></>// showFlagがfalseの場合はModalは表示しない
        )}
      </>
    );
  };

export default ResultModal;