
import { useState, useEffect } from 'react';
import './App.css';
import { db } from './files/firebase';

function App() {
  const [task, setTask] = useState('');
  const [updatedtask, setUpdatedtask] = useState('');
  const [taskdata, setTaskdata] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === "") {
      alert("please enter task");
    } else {
      db.collection("tasks").add({
        task: task,
      }).then(() => {
        alert("task added successfully");
       window.location.reload();
      }).catch((error) => {
        console.log(error);
      })
      setTask('');  
    }
  }

  const updatetask = (id) => {

    if (updatedtask === "") {
      alert("enter updated value");
    } else {
      //console.log(id);
      db.collection("tasks").doc(id).update({ task: updatedtask }).then(()=>{
         alert("task updated");
       window.location.reload(true);
      });
     
    }
  }

  useEffect(() => {
    db.collection("tasks").get().then((snapshot) => {
      snapshot.forEach(element => {
        var id = element.id;
        var data = element.data();
        setTaskdata(arr => [...arr, { id: id, data: data }]);
         
      })

    })
    console.log(taskdata);
  }, [])
  return (
    <div>
      <p className="text-center header"style={{marginLeft:"31%",fontWeight:"normal"}}>CRUD OPERATIONS USING REACT AND FIREBASE</p>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="well well-sm">
              <form className="form-horizontal">
                  <div className="form-group">
                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                    <div className="col-md-8">
                      <input id="task" name="task" type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter Task..." className="form-control" />&nbsp; <a className="addtask" onClick={handleSubmit} >add task</a>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="secondcontainer">
       
        {
          taskdata.map((data, index) => {
            if (data === "") {
              return <p>no task added yet...</p>
            } else {
              return <div key={index}>
                <p>Task : {data.data.task}</p>
                <p>Update task : <input type="text"  onChange={(e) => setUpdatedtask(e.target.value)} /> &nbsp; <a className="update" onClick={() => updatetask(data.id)} >update</a></p>

                <p>Delete task : <a className="trash" onClick={() => {db.collection("tasks").doc(data.id).delete().then(()=>{
                  window.location.reload(true);
                });}} >delete</a></p>
              </div>
            }
          })
        }
      </div>
    </div>
  );
}

export default App;
