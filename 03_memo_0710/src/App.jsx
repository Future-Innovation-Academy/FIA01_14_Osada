import { useState, useEffect } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import { DragDropContext,Droppable } from 'react-beautiful-dnd';


//reactの場合画面表示のサイクルが違うため、デベロッパーツールのtestに値が送信ボタン押しただけだと入ってないように見える
//useStateはinputにつき一つ作る

function App() {

const getTodoLists = () =>{
  const todoLists = localStorage.getItem("todo");
  if(todoLists){
    return JSON.parse(todoLists);
  } else{
    return[];
  }
};

  //登録されるデータを保持するuseState
  const [todoLists,setTodoLists] =useState(getTodoLists);
  //タイトル入力欄のテキスト情報を保持するuseState
  const [title,setTitle] = useState("");
  const [title2,setTitle2] = useState("");

  const handleAddSubmit = (e) =>{
    e.preventDefault();
    let pushData = {
      title,title2,
    };
    setTodoLists([...todoLists, pushData]);
    setTitle("");
    setTitle2("");  
  }
//todoという名前でlocalstrageに保存
  useEffect(() => {localStorage.setItem("todo",JSON.stringify(todoLists));}, [todoLists]);
 
//削除
  const deleteItem= (index,e) =>{

   // e.preventDefault();
    const storageItem = getTodoLists();
    if (storageItem) {
      // 「delete オブジェクト名.プロパティ名」で特定のプロパティを削除
 //     delete storageItem.title;
 //     delete storageItem.title2;
 //       delete storageItem[index];
      storageItem.splice(index, 1);
      // JSONに変換し直してローカルストレージに再設定
      localStorage.setItem('todo', JSON.stringify(storageItem));
      window.location.reload()
    }
  }
  const deleteDoneItem= (index,e) =>{

    // e.preventDefault();
     const storageItem = getDoneLists();
     if (storageItem) {
       // 「delete オブジェクト名.プロパティ名」で特定のプロパティを削除
  //     delete storageItem.title;
  //     delete storageItem.title2;
  //       delete storageItem[index];
       storageItem.splice(index, 1);
       // JSONに変換し直してローカルストレージに再設定
       localStorage.setItem('done', JSON.stringify(storageItem));
       window.location.reload()
     }
   }

//編集
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const submitEdits = (rnkeIndex) => {
    const updatedTodoLists = todoLists.map((item,index) => {
      if (index === rnkeIndex) {
        item.title = editingText;
      }
      return item;
    });
    setTodoLists(updatedTodoLists);
    setTodoEditing(null);
    setEditingText("");
  };

//完了
  
const getDoneLists = () =>{
  const doneLists = localStorage.getItem("done");
  if(doneLists){
    return JSON.parse(doneLists);
  } else{
    return[];
  }
};

const [doneLists,setDoneLists] =useState(getDoneLists);


const doneItem = (title,title2,index,e) =>{
  e.preventDefault();
  let pushData = {
    title,title2,
  };
  setDoneLists([...doneLists, pushData]);
  deleteItem(index);
}

useEffect(() => {localStorage.setItem("done",JSON.stringify(doneLists));}, [doneLists]);


  return (
    <div className="App">
      <h1 className='App__title text__center'>localStrage-todo</h1>

    
      <div className='inputArea'>
        <form onSubmit={handleAddSubmit}>
          {/*title1*/}     
          <div className='inputTodo'>
           
            <input 
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Todo"
            />
           
            
            {/*title2*/}        
            <input 
              type="text"
              required
              onChange={(e) => setTitle2(e.target.value)}
              value={title2}
              placeholder="sub-Todo"
            />
            
          </div>
          <div className='button'>
            {/*送信ボタン*/}
            <Button color="secondary" type='submit'>submit</Button>
          </div>
        </form>
      </div>



      <div class="output-flex">
        <div class="imcompleteArea text__center">
          <h2 >ToDo</h2>

          <div > 
          {todoLists.map((item, index) => (
            <div className='todolists' key={index}>
              
            <div className='checkbox'>
            <Checkbox label="Simple" onClick={(e) => doneItem(item.title,item.title2,index,e)}/>
            </div>
            
            <div className='todo__titles'>
                <div className='item__title'>{item.title}</div>
                <div className='item__title2'>{item.title2}</div>
            </div>

              {todoEditing === index ? (
                 <input
                   type="text"
                   placeholder="編集内容を入力"
                   className="m-7 p-3 w-4/5 border-2"
                   value={editingText}
                   onChange={(e) => setEditingText(e.target.value)}
                 />
               ) : (
                 <div>{}</div>
               )}    

              <button type='submit' onClick={(e) => deleteItem(index,e)}>削除</button>          
              
              {index === todoEditing ? (            
              <button type='submit' onClick={() => submitEdits(index)}>再投稿</button>   
              ):( 
              <button type='submit' onClick={() => setTodoEditing(index)}>編集</button> 
              )  }

              </div>
          ))}
        
          
          </div>
         
          
        </div>
        <div class="completeArea text__center">
          <h2>Done</h2>
          
          <div > 
          {doneLists.map((item, index) => (
            <div  className='donelists' key={index}>
            <div className='number'>
            {index}
              </div>
              <div className='done__titles'>
                <div className='item__title'>{item.title}</div>
                <div className='item__title2'>{item.title2}  </div>
              </div> 

              <button type='submit' onClick={(e) => deleteDoneItem(index,e)}>削除</button>          

  
              </div>
          ))}
        
          
          </div>
        </div>
      </div>


    </div>
  )
}

export default App
