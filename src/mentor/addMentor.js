import { useNavigate } from "react-router-dom";
import Base from "../base";
import * as yup from "yup";
import { useFormik } from "formik";

export const mentorValidation = yup.object({
    name:yup.string().required("Enter your name"),
    batch:yup.string().required("Enter your batch name"),
    experience:yup.string().required("Enter your course name")
});

function AddMentor({mentor, setMentor}){

    let navigate=useNavigate()
    let {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues:{
            name:"",
            batch:"",
            experience:""
        },
        validationSchema:mentorValidation,
        onSubmit:(obj)=>{
            console.log(obj);
            addToApi(obj);
        }

    })

    async function addToApi(obj){
        let data = await fetch("https://649720f983d4c69925a37080.mockapi.io/mentors",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let newData = await data.json();
        setMentor([...mentor, newData]);
        navigate("/mentor")

    } 
    return (
        <Base
        name={"Add New Mentor"}>
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
                    <button type="submit" className="submit-btn">Create</button>
                </form>
            </div>
        </div>
        </Base>
    )
}
export default AddMentor;