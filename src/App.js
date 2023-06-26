import logo from './logo.svg';
import './App.css';
import Base from './base';
import { useEffect, useState } from 'react';
import Student from './students/student';
import Home from './home';
import { Route, Routes } from 'react-router-dom';
import AddStudent from './students/addstudent';
import EditStudent from './students/editStudent';
import Mentor from './mentor/mentor';
import AddMentor from './mentor/addMentor';
import EditMentor from './mentor/editMentor';


function App() {
  let [student, setStudent] = useState([]);
  let [mentor, setMentor] = useState([]);
  

  useEffect(()=>{
    async function getStudData(){
      let data = await fetch("https://649720f983d4c69925a37080.mockapi.io/students", {
        method:"GET",
        headers:{
          "content-type":"application/json"
        }
      })
      let studData = await data.json();
      console.log(studData);
      setStudent(studData);
    }
    getStudData();

    async function getMentorData(){
      let data = await fetch("https://649720f983d4c69925a37080.mockapi.io/mentors", {
        method:"GET",
        headers:{
          "content-type":"application/json"
        }
      })
      let mentorData = await data.json();
      console.log(mentorData);
      setMentor(mentorData)
    }
    getMentorData();
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
     
      {/* <Base/> */}
      <Route path='/student' element={<Student
      student={student}
      setStudent={setStudent}
      />}/>
      <Route path="/new-stud" element={<AddStudent
      student={student}
      setStudent={setStudent}
      />}/>
       <Route path="edit-stud/:id" element={<EditStudent
      student={student}
      setStudent={setStudent}
      />}/>
      <Route path='/mentor' element={<Mentor
      mentor={mentor}
      setMentor={setMentor}
      />}/>
      <Route path='/add-mentor' element={<AddMentor
      mentor={mentor}
      setMentor={setMentor}/>}/>
      <Route path='edit-mentor/:id' element={<EditMentor
      mentor={mentor}
      setMentor={setMentor}/>}/>
       </Routes>
      {/* <Student
      student={student}
      setStudent={setStudent}/> */}
    </div>
  );
}

export default App;


