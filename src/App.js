import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from "./components/About";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { AddTask } from "./components/AddTask";
import { useState,useEffect } from "react";
function App() {

  // const name ='omar'
  // const x = false ;
  const [showAddTask , setShowAddTask]=useState(false);
   const [tasks,setTasks]= useState(
    [])
    useEffect( () => {
      const getTasks = async ()=>{
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }
      getTasks()
     },[])
     //fetch tasks
     const fetchTasks =async () => 
    {
     const res  = await fetch('http://localhost:5000/tasks')
     const data = await res.json()
    return data;
      }
      const fetchTask =async (id) => 
    {
     const res  = await fetch(`http://localhost:5000/tasks/${id}`)
     const data = await res.json()
    return data;
      }
   function toggleAddtask(){
    setShowAddTask(!showAddTask)
   
   }
   const addTask= async (task) => {

    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(task),

    })
    const data = await res.json()
    setTasks([...tasks,data])


    // const id=Math.floor(Math.random()*10000)+1
    // const createdTask={id,...task}
    // setTasks([...tasks,createdTask])
    // console.log("task:==>",task)
   }
    const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter((task)=>task.id!==id))
   }
   const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,reminder:!taskToToggle.reminder}
    const res = await fetch (`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(updTask)
    })
    const data = await res.json()

     setTasks(tasks.map((task)=>task.id===id?{...task,reminder: !data.reminder}:task)
     )  }
  return (
    
    <Router>
     
    <div className="container">
      {/* <h1>Hello from react</h1>
      <h2>hello {x ? name : 'Oops name not found'}</h2> */}
      <Header title='Task Tracker' toggle={toggleAddtask} showAddTask={showAddTask} />
      
      {/* <Header title={12} /> */}
      <Routes>
      <Route path='/' element={<>
        {showAddTask?<AddTask onAdd={addTask} />:''}
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      </>} />
      <Route path='/about' element={<About/>} />
      </Routes>
      <Footer/>
    </div>
    
    </Router>
    
  );
}

export default App;
