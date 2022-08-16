
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Teachers from './components/teacher/Teachers';
//import {AddTeacher,Teachers,Teacher,EditTeacher,ViewTeacher,Navbar} from './components'
const App=()=> {
  const[getTeachers,setTeachers]=useState([]);
  const [Loading,setLoading]=useState(false);
  return (
    <div className="App">
      
  <Navbar />
 
  <Teachers Teachers={getTeachers} Loading={Loading} />
  
    </div>
  );
}

export default App;
