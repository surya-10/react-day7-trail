import { Children, useState } from "react";
import { useNavigate } from "react-router-dom";

function Base({name, description, children}){

    function showMenu(){
        let leftMenu = document.querySelector(".left-div");
        console.log(leftMenu.className)
        if(leftMenu.className==="left-div"){
            leftMenu.className+=" left-div1";
        }
        else{
            leftMenu.className="left-div";
        }
    }
    let navigate = useNavigate();
    let [show, setShow] = useState(false);
    let [show2, setShow2] = useState(false);
    return (
        <div className="base-div">
            <div className="main-div">
            {/* <i class="fa-solid fa-bars"></i> */}
                <div className="left-div">
                    
                    <div className="stud-dashboard">
                        <div className="stud-nav">
                        <button onClick={()=>setShow(!show)} className="stud-title">STUDENTS</button>
                        {show && (<div className="nav1">
                        <div className="stud-data-div">
                        <button onClick={()=>navigate("/student")}>Dashboard</button>
                        <button onClick={()=>navigate("/new-stud")}>Add Student</button>
                        </div>
                        </div>
                        )}
                        </div>
                        <div className="mentor-nav">
                        <button onClick={()=>setShow2(!show2)} className="mentor-title">MENTORS</button>
                        {show2 && (<div className="nav2">
                        <div className="stud-data-div">
                        <button onClick={()=>navigate("/mentor")}>Dashboard</button>
                        <button onClick={()=>navigate("/add-mentor")}>Add Mentor</button>
                        </div>
                        </div>
                        )}
                        </div>


                    </div>
            {/* <button>SO TO MENTORS DASHBOARDgjk</button> */}
            </div>
            <div className="right-div">
                <div className="account">
                <i class="fa-solid fa-bars bars" onClick={showMenu}></i>
                <h3 className="avatar-title"> Surya<i class="fa-solid fa-user-tie avatar"></i></h3>
                </div>
                <div className="headings">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Base;