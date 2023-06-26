import { useNavigate } from "react-router-dom";
import Base from "../base";

function Mentor({mentor, setMentor}){
    let navigate = useNavigate();
    function editData(id){
        navigate(`/edit-mentor/${id}`);
    }

    async function deleteData(id){

        let removedList = mentor.filter((val)=>val.id!==id);
        let data = await fetch(`https://649720f983d4c69925a37080.mockapi.io/mentors/${id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            }
        })
        let deleted = await data.json();
        setMentor(removedList);
    }
    return (
        <Base
        name={"All mentors data displayed here"}>
        <div className="stud-div">
            <div className="table">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Batch Name</th>
                        <th>Experience</th>
                        <th>Change</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mentor.map((val, ind)=>(
                        
                        <tr key={ind}>
                            <td>{val.name}</td>
                            <td>{val.batch}</td>
                            <td>{val.experience}</td>
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
export default Mentor;