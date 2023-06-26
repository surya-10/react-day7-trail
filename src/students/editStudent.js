import { useNavigate, useParams } from "react-router-dom";
import Base from "../base";
import { useFormik } from "formik";
import { studentValidation } from "./addstudent";

function EditStudent({student, setStudent}){
    console.log(student);
    let {id} = useParams();
    console.log(id)
    let findEdit = student.find((val)=>val.id===id);
    console.log(findEdit);

    let navigate=useNavigate();
    let {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues:{
            name:findEdit.name,
            batch:findEdit.batch,
            course:findEdit.course
        },
        validationSchema:studentValidation,
        onSubmit:(obj)=>{
            console.log(obj);
            updateToApi(obj);
        }

    })

    async function updateToApi(obj){
        console.log(obj);
        let findInd = student.findIndex((val)=>val.id===id);

        let data = await fetch(`https://649720f983d4c69925a37080.mockapi.io/students/${id}`,{
            method:"PUT",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let updatedData = await data.json();
        console.log(updatedData)
        student[findInd] = updatedData;
        setStudent([...student]);
        navigate("/student");
    }


    return (
        <Base
        name={"Edit Student Data"}>
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
                    <input type="text" placeholder="Course Name"
                    value={values.course}
                    onBlur={handleBlur}
                    name="course"
                    onChange={handleChange}/>
                    {errors.course && touched.course ? <p style={{color:"crimson"}}>Enter course</p>:""}
                    <button type="submit" className="update-btn">Update</button>
                </form>
            </div>
        </div>
        </Base>
    )
}
export default EditStudent;