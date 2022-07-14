import { FC, useState } from "react";
import logo from './logo.svg'
import './Login.css'
import React from "react";
import ReactDOM from "react-dom";
import { motion, useCycle ,useDragControls, useReducedMotion, AnimatePresence} from "framer-motion";
import { useAnimation } from "framer-motion";
import Modal from "./Modal"; //Modalコンポーネントをimportする
import { MouseEvent } from "react";
import {
  Link,
  Route,
  useLocation,
  Routes,
  BrowserRouter
} from "react-router-dom";





function App() {


  return (
  <div className="App">


    <div className="hello">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [50, 0] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div >
          <Link to={`/Home`} style={{ textDecoration: 'none', color: 'black' }} >Welcome to E-CARD</Link> 
        </div>
      </motion.div>
	  </div>

  </div>
  )
}


var styles={
  divStyle:{
      textAlign: "center",
      marginTop: 100,
      marginLeft: 500,
      marginRight: 500,
      backgroundColor: '#ddd',
      
  },
  divStyle2:{
    
  },

}

export default App
