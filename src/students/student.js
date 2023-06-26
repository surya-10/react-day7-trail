import { useNavigate } from "react-router-dom";
import Base from "../base";

function Student({student, setStudent}){
    let navigate = useNavigate();

    function editData(id){
        navigate(`/edit-stud/${id}`)

    }
    async function deleteData(id){

        let removedList = student.filter((val)=>val.id!==id);
        let data = await fetch(`https://649720f983d4c69925a37080.mockapi.io/students/${id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            }
        })
        let deleted = await data.json();
        setStudent(removedList);
    }
    return (
        <Base
        name={"All Students data displayed here"}>
        <div className="stud-div">
            <div className="table">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Batch Name</th>
                        <th>Course Name</th>
                        <th>Change</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {student.map((val, ind)=>(
                        
                        <tr key={ind}>
                            <td>{val.name}</td>
                            <td>{val.batch}</td>
                            <td>{val.course}</td>
                            <td><button className="edit" onClick={()=>editData(val.id)}>Edit</button></td>
                            <td><button className="delete" onClick={()=>deleteData(val.id)}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
        </div>
        </Base>
    )
}
export default Student;