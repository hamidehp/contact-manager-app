
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Teachers from './components/teacher/Teachers';
import Teacher from './components/teacher/Teacher';
import AddTeacher from './components/teacher/AddTeacher';
import EditTeacher from './components/teacher/EditTeacher';
import {Route,Routes,Navigate,useNavigate} from 'react-router-dom';
//import {AddTeacher,Teachers,Teacher,EditTeacher,ViewTeacher} from './components/teacher'
const App=()=> {
  const[getTeachers,setTeachers]=useState([]);
  const [Loading,setLoading]=useState(false);
  return (
    <div className="App">
      
  <Navbar />
  
  <Routes>
      <Route path="/" element={<Navigate to="/teachers" />} />
      <Route path="/teachers" element={<Teachers  Teachers={getTeachers} Loading={Loading}/>} />
      <Route path="/teachers/add" element={<AddTeacher/>} />
      <Route path="/teachers/:teacherId" element={<Teacher/>} />
      <Route path="/teachers/edit/:teacherId" element={<EditTeacher/>} />

    </Routes>
    
    </div>
  );
}

export default App;
