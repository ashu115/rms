import React, { useState } from 'react'
import Loginauth from '../loginauth'
function AddSem() {
    var course = {
        cid: "",
        semName: "",
        sub: ""
    };
    const [credentials, setCredentials] = useState(course)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/addSem", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                semid: credentials.cid.concat(" sem ", credentials.semName),
                cid: credentials.cid,
                semName: "sem ".concat(credentials.semName),
                subCount: credentials.sub,
                semno: credentials.semName
            })
        });
        const json = await response.json()
        if (json.semName) {
            alert("semester created")
        }
        else if (json.error) {
            alert(json.error)
        }
        else if (json.errors) {
            alert(json.errors[0].msg);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    //fetching the courses
    const getCourses = async (e) => {
        // e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/fetchCourse", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        const json = await response.json()
        sessionStorage.setItem('courses', JSON.stringify(json));
    }
    getCourses();


    const courses = JSON.parse(sessionStorage.getItem("courses"));
    if (courses.error) {
        alert(courses.error)
    }
    let courseNames = []
    for (let i = 0; i < courses.length; i++) {
        courseNames.push(courses[i].cid);
    }
    let courseList = courseNames.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

    let selectedObj = courses.find(obj => {
        return obj.cid === credentials.cid
    })
    let loopend;
    if (selectedObj) {
        loopend = JSON.parse(selectedObj.sem)
    }
    let semlistarr = []
    for (let i = 1; i <= loopend; i++) {
        semlistarr.push(i);
    }
    let semList = semlistarr.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })
    return (
        <>
            <Loginauth type="admin" />
            <h2>Create Course</h2>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor='courseName'>Course Name:-</label>
                <select name="cid" id="courseName" onChange={onChange} value={credentials.cid}>
                    <option hidden>select course</option>
                    {courseList}
                </select>

                <label htmlFor='sem'>Semester Name:-</label>
                <select name="semName" id="sem" onChange={onChange} value={credentials.semName}>
                    <option hidden>select sem</option>
                    {semList}
                </select>


                <label htmlFor='sub'>Total Subjects:-</label>
                <input type="number" name='sub' id='sub' value={credentials.sub} onChange={onChange} required placeholder='No. of semester' />

                <input type='submit' name='submit' value="create" />
            </form>
        </>
    )
}

export default AddSem