import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const EditUser = () => {
    const [user, setUser] = useState({
        id: '',
        employee_name: '',
        employee_salary: '',
        employee_age: '',
    });

    const [show, setShow] = useState(false);

    const { number } = useParams();
    const { id, employee_name, employee_salary, employee_age } = user;


    const fetchData = async () => {
        const result = await axios.get(`https://dummy.restapiexample.com/api/v1/employee/${number}`);
        setUser(result.data.data);
        // console.log("Here's the result", result.data.data);
    };
    useEffect(() => {
        fetchData()
    }, []);


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value }); //if user clicks on the id input field or username input field then value will be id 0r username.
        // ... is written because for example- if the user clicks on the salary input and do changes there, then whatever we've written in other field got erased. So to prevent it from erasing we are using spread operator(...)  
    //... is the spread operator which allows us to expand the array into individual elements.
    }

    const handleSubmit = async (e) => {  
        e.preventDefault();
        try {
            const response = await axios.put(`https://dummy.restapiexample.com/api/v1/update/${id}`, user);  //we are requesting POST request as we want to add the data that's why we are writing this line. & What data we are sending that's y written "user". 
            setShow(true);
        }
        catch (error) { //if the promise is rejected...
            console.log(error);
        }
    }
    console.log("HEEELOOOO",user);


    //console.log("here's the updated state", user)


    return (
        <>
            <div className='container w-75 mx-auto shadow p-5'>
                <h2>Edit Employee Data</h2>
                <form onSubmit={e => handleSubmit(e)}>
                { show ? <div class="alert alert-success" role="alert"> Your data has been successfully added....</div> : null}
                    <div className="form-control">
                        <label className="form-label">ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="id"
                            placeholder='Enter your unique ID...'
                            value={id}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="form-label">Employee Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="employee_name"
                            placeholder='Enter your name...'
                            value={employee_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="form-label">Employee Salary</label>
                        <input
                            type="text"
                            className="form-control"
                            name="employee_salary"
                            placeholder='Enter your salary...'
                            value={employee_salary}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="form-label">Employee Age</label>
                        <input
                            type="text"
                            className="form-control"
                            name="employee_age"
                            placeholder='Enter your age...'
                            value={employee_age}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                    <button type="submit" className="btn btn-warning" >Update Employee data</button>
                </div>
                </form>
            </div>
        </>
    )
}

export default EditUser;