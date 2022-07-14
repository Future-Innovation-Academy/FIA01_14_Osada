import { Link } from "react-router-dom";
import { useState } from 'react'
import './Home.css'
import React from 'react';
import ReactDOM from 'react-dom';
import emperor from './img/emperor.jpg';
import slave from './img/slave.jpg';
import citizen from './img/citizen.jpg';
import Modal from "./Modal"; 
import ResultModal from "./ResultModal"; 


const opponent__cards = [citizen, citizen, emperor, citizen, citizen]
const your__cards = [{id: 1, name:citizen}, {id: 2, name:citizen}, {id: 3, name:slave}, {id: 4, name:citizen}, {id: 5, name:citizen}]

var kekka = "";
var opponentchoice = "";
var arrayIndex = "";


// function choose_opponent(arrayData) {
//     var arrayIndex = Math.floor(Math.random() * arrayData.length);
//     return arrayData[arrayIndex];
//   }
  
  function kekka_happyo(choice,opponentchoice) {
    if( (choice === "/src/img/slave.jpg" && opponentchoice === "/src/img/emperor.jpg")){
        kekka = "You Win!!!"
    } else if((choice === "/src/img/slave.jpg" && opponentchoice === "/src/img/citizen.jpg") || 
    (choice === "/src/img/citizen.jpg" && opponentchoice === "/src/img/emperor.jpg")){
        kekka = "You lose... "
    }else if(choice === "/src/img/citizen.jpg" && opponentchoice === "/src/img/citizen.jpg") {
        kekka = "Stay"
    }   
    return kekka
  }
  



const Home = () => {

    //相手の手
    

    const choose_opponent = (arrayData) => {
        var arrayIndex = Math.floor(Math.random() * arrayData.length);
        return arrayIndex;
      }

    //自分の手と回数
    const [choice, setChoice] = useState();
    
    const [num, setNum] = useState(0);

    const [showResultModal, setShowResultModal] = useState(false); // Modalコンポーネントの表示の状態を定義する

    
    const handleClick = (ary, e) => {
        //両者の手        
        setChoice(ary[0]);
        arrayIndex = choose_opponent(opponent__cards);
        opponentchoice = opponent__cards[arrayIndex];
        //手札を減らす   
        your__cards.splice(ary[1],1);
        opponent__cards.splice(arrayIndex,1);
        //回数
        setNum(num => num+1);
        //結果をモーダルで表示
        setShowResultModal(true);

      };


    const kekka = kekka_happyo(choice,opponentchoice);

    const [showModal, setShowModal] = useState(false); // Modalコンポーネントの表示の状態を定義する
    const ShowModal = () => {
      setShowModal(true);
    };



  return (
    <>
    <body>
    <header className="App-header">
        <div className="title" ><a href="#" onClick={ShowModal}>E-CARD</a></div>
        
           
        {/* Appコンポーネントから子であるModalコンポーネントにpropsを渡す */}
        <Modal showFlag={showModal} setShowModal={setShowModal} content="ルール"/>

         {/* Appコンポーネントから子であるModalコンポーネントにpropsを渡す */}
         <ResultModal showFlag={showResultModal} setShowResultModal={setShowResultModal} kekka={kekka} choice={choice} opponentchoice= {opponentchoice} />
         <h3 className="choice__count text__center">{num} times choices</h3>

    </header>

      <main>
        
        <hr />
        <div className="OpponentHand">
           <u><h3 className="emperor_title text__center">EMPEROR</h3></u>
            <div className="OpponentCard">
                <ul>
                    {opponent__cards.map((item,index)=>{return <li key={index}>
                    <img src={item} alt={item}  border="10" /> 
                    
                        </li>})}
                </ul>
            </div>
        </div>


        <hr />

        <div className="YourHand">
        <u><h3 className="slave_title text__center">SLAVE</h3></u>
            <div className="YourCard">
                <ul>
                    {your__cards.map((card,index)=>{return <li key={card.id}>
                    <img src={card.name} onClick={(e) => {handleClick([card.name,index], e);}} alt={card.name} value =  {index}  border="10"/>
                   
                        </li>})}
                </ul>
            </div>
        </div>   

        <hr />
        
      </main>

      <footer>
        <div className="text__center">
            <Link to={`/`} style={{ textDecoration: 'none', color: 'gray'}}>back</Link>
        </div>
      </footer>
      </body>
    </>
  );
};

export default Home;