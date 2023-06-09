import React from 'react'
import { Link } from "react-router-dom";
import Loginauth from '../loginauth'
import Nav from '../nav';

function StudentDash() {
    return (
        <>
            <Loginauth type="student" />
            <Nav type="student" />
            <div className='card-container'>
                <Link className='card' to="myCourse">
                    <span className="material-symbols-outlined">folder_special</span>
                    <p>My Course</p>
                </Link>
                <Link className='card' to="joinCourse">
                    <span className="material-symbols-outlined">
                        drive_file_move
                    </span>
                    <p>
                        Join Course
                    </p>
                </Link>
                <Link className='card' state={{type:"student"}} to="updateProfile">
                    <span className="material-symbols-outlined">
                        account_box
                    </span>
                    <p>My Profile</p>
                </Link>
            </div>
        </>
    )
}

export default StudentDash