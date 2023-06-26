import { useNavigate, useParams } from "react-router-dom";
import Base from "../base";
import { mentorValidation } from "./addMentor";
import { useFormik } from "formik";
import * as yup from "yup";

function EditMentor({mentor, setMentor}){
    let {id} = useParams();
    let navigate = useNavigate();
    console.log(id)
    let findEdit = mentor.find((val)=>val.id===id);
    console.log(findEdit);

    let {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues:{
            name:findEdit.name,
            batch:findEdit.batch,
            experience:findEdit.experience
        },
        validationSchema:mentorValidation,
        onSubmit:(obj)=>{
            console.log(obj);
            updateToApi(obj);
        }

    })

    async function updateToApi(obj){
        console.log(obj);
        let findInd = mentor.findIndex((val)=>val.id===id);

        let data = await fetch(`https://649720f983d4c69925a37080.mockapi.io/mentors/${id}`,{
            method:"PUT",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let updatedData = await data.json();
        console.log(updatedData)
        mentor[findInd] = updatedData;
        setMentor([...mentor]);
        navigate("/mentor");
    }
    return (
        <Base
        name={"Edit Mentor Data"}>
        <div className="add-stud-div">
            <div className="form-div">
                <p>Fill below details</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter Name"
                    value={values.name}
                    onBlur={handleBlur}
                    name="name"
                    onChange={handleChange}/>
                    {errors.name && touched.name ? <p style={{color:"crimson"}}>Enter Name</p>:""}
                    <input type="text" placeholder="Batch Name"
                    value={values.batch}
                    onBlur={handleBlur}
                    name="batch"
                    onChange={handleChange}/>
                    {errors.batch && touched.batch ? <p style={{color:"crimson"}}>Enter batch</p>:""}
                    <input type="text" placeholder="Experience"
                    value={values.experience}
                    onBlur={handleBlur}
                    name="experience"
                    onChange={handleChange}/>
                    {errors.experience && touched.experience ? <p style={{color:"crimson"}}>Enter Experience</p>:""}
                    <button type="submit" className="submit-btn">Update</button>
                </form>
            </div>
        </div>
        </Base>
    )
}
export default EditMentor;