import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import './App.css'
import { db, auth } from "./firebase";
import Add from "./Add";

function App() {
  //1.useStateを準備して、データを取得できるようにする
  const [data, setData] = useState([{id:"", title:"", title2: "",}]);


  console.log(data, "useStateの箱の方をみましょう！");

 //3. 登録用のuseStateを準備します🤗
 const [titleValue, setTitleValue] = useState("");

 const [title2Value, setTitle2Value] = useState("");

  // 2.useEffectを使って画面表示の際にfirebaseからデータを取得する
  useEffect(() => {
    //2.1 query = コレクション(firebaseの箱のこと)の指定をする
    // firebaseで用意されたおまじない
    const q = query(collection(db, "group")); //データにアクセス

    //2.2 クリーンアップ関数(これ書かないと、firebase側でデータをいじった場合、リロードされない)

    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          title2: doc.data().title2,
        }))
      );
    });

    return () => unsub();
  }, []);

  // inputのonChangeのイベントを記述🤗
  const handleInputChange = (e) => {
    // console.log(e, "event");
    // console.log(e.target, "event target");
    setTitleValue(e.target.value);
  };

  const handleInputChange2 = (e) => {
    // console.log(e, "event");
    // console.log(e.target, "event target");
    setTitle2Value(e.target.value);
  };

  //送信の処理を記述＝送信のボタンが押されたら登録の処理を実行する🤗
  const addData = async () => {
    // 処理を記述していきます🤗
    // alert(1); 記述後、送信ボタンを押す→画面に変化があればコメントアウトしましょう🤗

    // firebaseへの登録の処理
    await addDoc(
      collection(db, "group"), //場所どこ？
      {
        title: titleValue,
        title2: title2Value,
      }
    );

    // 文字を空にします🤗
    setTitleValue("");
    setTitle2Value("");
  };






  return (
    <div className="App">
      <h1>REACT</h1>

      {data.map((item, index) => (
        // mapを使うときは,keyという指定が必須です！忘れるとエラーが出ます🤗
        // Warning: Each child in a list should have a unique "key" prop.
        <div key={index}>
          <div>{index}</div>
          <div>{item.id}</div>
          <div>{item.title}</div>
          <div>{item.title2}</div>
        </div>
      ))}


      <Add
        addData={addData}
        titleValue={titleValue}
        title2Value={title2Value}
        handleInputChange={handleInputChange}
        handleInputChange2={handleInputChange2}
      />




    </div>
  )
}

export default App
