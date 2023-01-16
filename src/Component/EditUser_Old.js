import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const EditUser = () => {


    const { number } = useParams();

    // after adding the employee detail it should redirect to the home page thats why we are using hook called as useNavigate.
    // let navigate = useNavigate();


    //show & hide the banner of successful message...
    //first we will create the state. and set the initial value as false.
    const [show, setShow] = useState(false);


    // It's important, the data which we are writing in the input feild to store in state, that's y we are using useState.
    // user is the initial state, setUser is the function that update state & useState contains the initial value of state
    const [user, setUser] = useState({
        id: '',
        name: '',
        salary: '',
        age: '',
    });
    //In above type of useState is object.

    //whenever any user type the data in input feild,it should save also for that we are creating a function. Here "e" is the event which is the action done by the user or the system.
    console.log('current state', user, typeof user);
    const { id, name, salary, age } = user; //destructuring is done in this line. (declaring the variable), this will help us not to write {user.id}, {user.username} etc in the value feild.

    //Creating function for Changing the input feild i.e for form filling.

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value }); //if user clicks on the id input field or username input field then value will be id 0r username.
        // ... is written because for example- if the user clicks on the salary input and do changes there, then whatever we've written in other field got erased. So to prevent it from erasing we are using spread operator(...)  
    } //... is the spread operator which allows us to expand the array into individual elements.


    //creating function for Saving the data...

    const handleSubmit = async (e) => {  //as we are sending the request.
        e.preventDefault(); // prevent the default behaviour
        try {
            const response = await axios.put(`https://dummy.restapiexample.com/api/v1/update/${id}`, user);  //we are requesting Put request as we want to update the data that's why we are writing this line. & What data we are sending that's y written "user". 
            console.log(response);
            setShow(true);
        }
        catch (error) { //if the promise is rejected...
            console.log(error);
        }

        // navigate("/") //as we are redirecting directly to the home page after filling the form.
    }

    // For editing the data and calling all the data to our form for editing....

    const loadUser = async () => {
        const result = await axios.get(`https://dummy.restapiexample.com/api/v1/employee/${number}`);
        setUser(result.data.data); //because everything comes in data propoerty...
    };

    useEffect(() => {
        loadUser()
    }, []);

    console.log("HIIIII",setUser);
        

    return (
        <div className='container w-75 mx-auto shadow p-5'>
            <h2>Edit Employee Data</h2>
            <form onSubmit={e => handleSubmit(e)} >
                {show ? <div class="alert alert-success" role="alert"> Your data has been successfully added....</div> : null}
                <div className="form-control">
                    <label className="form-label">ID</label>
                    {/* Whenever there is update or change in the input field, onChange event occurs. */}
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
                        name="name"
                        placeholder='Enter your name...'
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control">
                    <label className="form-label">Employee Salary</label>
                    <input
                        type="text"
                        className="form-control"
                        name="salary"
                        placeholder='Enter your salary...'
                        value={salary}
                        onChange={handleChange}

                    />
                </div>
                <div className="form-control">
                    <label className="form-label">Employee Age</label>
                    <input
                        type="text"
                        className="form-control"
                        name="age"
                        placeholder='Enter your age...'
                        value={age}
                        onChange={handleChange}

                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-warning" >Update Employee data</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser;