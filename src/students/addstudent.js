import { useFormik } from "formik";
import Base from "../base";
import * as yup from "yup";
import { json, useNavigate } from "react-router-dom";

export const studentValidation = yup.object({
    name:yup.string().required("Enter your name"),
    batch:yup.string().required("Enter your batch name"),
    course:yup.string().required("Enter your course name")
});

function AddStudent({student, setStudent}){
    let navigate=useNavigate()
    let {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues:{
            name:"",
            batch:"",
            course:""
        },
        validationSchema:studentValidation,
        onSubmit:(obj)=>{
            console.log(obj);
            addToApi(obj);
        }

    })

    async function addToApi(obj){
        let data = await fetch("https://649720f983d4c69925a37080.mockapi.io/students",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let newData = await data.json();
        setStudent([...student, newData]);
        navigate("/student")

    }


    return (
        <Base 
        name={"Add New Student"}>
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
                    {errors.batch && touched.batch ? <p style={{color:"crimson"}}>Enter Batch</p>:""}
                    <input type="text" placeholder="Course Name"
                    value={values.course}
                    onBlur={handleBlur}
                    name="course"
                    onChange={handleChange}/>
                    {errors.course && touched.course ? <p style={{color:"crimson"}}>Enter Course</p>:""}
                    <button type="submit" className="submit-btn">Create</button>
                </form>
            </div>
        </div>
        </Base>
    )
}
export default AddStudent;