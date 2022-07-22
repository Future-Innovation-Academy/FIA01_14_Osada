import { useState, useMemo,useEffect } from 'react'
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy } from "firebase/firestore";
import './App.css'
import { db, auth } from "./firebase";
import Chat from "./Chat";

const chatbot__messages = ['どうしたの？ 大丈夫？', 'つらかったね。 大変だったね', '今まで、がんばってきたんだね', '大丈夫だよ／心配ないさ ', 'いつもそばにいるよ','明日はきっとよくなるよ',
'頑張ってるの知ってるよ','なんでも話聞くよ']

var arrayIndex = "";
var chatbotMessage = "";


function App() {
/**
 * ユーザー名 (localStrageに保存)
 **/
 const getUName = () =>  {
  const userName = localStorage.getItem('firebase-Chat1-username');
  if (!userName) {
    const inputName = window.prompt('ユーザー名を入力してください', '');
    if (inputName){
      localStorage.setItem('firebase-Chat1-username', inputName);
      return inputName;
    }    
  }
  return userName;
}

const userName = useMemo(() => getUName(), []);

function getStrTime(time){
  let t = new Date(time);
  return `${t.getHours()}`.padStart(2, '0') + ':' + `${t.getMinutes()}`.padStart(2, '0');
}


  //1.useStateを準備して、データを取得できるようにする
  const [data, setData] = useState([{id:"", name:"",msg:"", date: "",}]);

 //3. 登録用のuseStateを準備します🤗
 const [msgValue, setMsgValue] = useState("");
 const [chatbot, setChatbot] = useState("");

 const randomChatbot = (arrayData) => {
  var arrayIndex = Math.floor(Math.random() * arrayData.length);
  return arrayIndex;
}

  // 2.useEffectを使って画面表示の際にfirebaseからデータを取得する
  useEffect(() => {
    //2.1 query = コレクション(firebaseの箱のこと)の指定をする
    // firebaseで用意されたおまじない
    const q = query(collection(db, "group"),orderBy("date")); //データにアクセス

    //2.2 クリーンアップ関数(これ書かないと、firebase側でデータをいじった場合、リロードされない)

    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          msg: doc.data().msg,
          date:doc.data().date,
          
        }))
      );
    });

    return () => unsub();

    window.scroll(0, document.documentElement.scrollHeight - document.documentElement.clientHeight)
    
  }, []
  
  );

  // inputのonChangeのイベントを記述🤗
  const handleInputChange = (e) => {
    // console.log(e, "event");
    // console.log(e.target, "event target");
    setMsgValue(e.target.value);
    
    arrayIndex = randomChatbot(chatbot__messages);
    chatbotMessage = chatbot__messages[arrayIndex];
    
    setChatbot(chatbotMessage);
    console.log(chatbot);
  };


  //送信の処理を記述＝送信のボタンが押されたら登録の処理を実行する🤗
  const addData = async () => {
    // 処理を記述していきます🤗
    // alert(1); 記述後、送信ボタンを押す→画面に変化があればコメントアウトしましょう🤗

    
    // firebaseへの登録の処理
    await addDoc(
      collection(db, "group"), //場所どこ？
      {
        name: userName,
        msg: msgValue,
        date: new Date().getTime(),
      },
    );
    await addDoc(

      collection(db, "group"), //場所どこ？
      {
        name: "チャットボット君",
        msg: chatbot,
        date: new Date().getTime(),
      }
    );
    // 文字を空にします🤗
    setMsgValue("");
    setChatbot("");
  };



  return (
    <div className="App">
      <h1>なぐさめチャットボット</h1>

      {data.map((item, index) => (
        // mapを使うときは,keyという指定が必須です！忘れるとエラーが出ます🤗
        // Warning: Each child in a list should have a unique "key" prop.


        <div key={index}>


        <div className={userName===item.name? 'balloon_r': 'balloon_l'} key={item.key}>
          {userName===item.name? getStrTime(item.date): '' }
          <div className="faceicon">
            <img src={userName===item.name? '/src/img/cat.png': '/src/img/dog.png'} alt="" />
          </div>
          <div style={{marginLeft: '3px'}}>
            {item.name}<p className="says">{item.msg}</p>
          </div>
          {userName===item.name? '': getStrTime(item.date)}
        </div>


        </div>
      ))}

       <Chat
        addData={addData}
        msgValue={msgValue}
        userName={userName}
        handleInputChange={handleInputChange}     
      /> 

    </div>
  )
}

export default App
