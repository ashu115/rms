import React, { useState, useEffect } from 'react';
import Loginauth from '../loginauth';
import ShowSem from './ShowSem';

const ShowCourse = (props) => {
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [isRendered, setIsRendered] = useState({ state: false, semName: '' });

    const getCourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/fetchMyCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cid: User.cid }),
            });
            const json = await response.json();
            if (json.error) {
                alert(json.error);
                return;
            }
            sessionStorage.setItem('Mycourses', JSON.stringify(json));
        } catch (error) {
            console.log('Error fetching courses:', error);
        }
    };

    const showsemdetail = async (e) => {
        setIsRendered({ state: true, semName: e.target.id });
    };

    useEffect(() => {
        const fetchData = async () => {
            await getCourses();
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(isRendered);
    }, [isRendered]);
    let semList;
    let Mysemarray = [];

    semList = Mysemarray.map((item, index) => (
        <p key={index} onClick={showsemdetail} id={item.semName}>
            {item.semName}
        </p>
    ));
    console.log(semList)
    return (
        <>
            <Loginauth type="teacher" />
            {semList}
            {isRendered.state && <ShowSem sem={isRendered.semName} />}
        </>
    )
};

export default ShowCourse;