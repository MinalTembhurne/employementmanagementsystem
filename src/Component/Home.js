import React, { useEffect, useState } from 'react';
import "../style.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import ModalBox from "./Modal";


const Home = () => {
    //to manage the loading phase of application.... 1)employeeData =for initial state, 2)setEmployeeData= for storing data after fetching the data i.e re-rendering
    const [employeeData, setEmployeeData] = useState({ data: [] });
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const [id, setId] = useState();

    //creating a variable API...
    let API = "https://dummy.restapiexample.com/api/v1/employees";
    // console.log("Testing my id", id);
    //
    const getEmployeeInfo = async (url) => {    //async- function will always return promise
        //
        try {
            //
            const response = await fetch(url, {     //await-  makes JavaScript wait until promise settled and return its results.
                mode: 'cors',
            });
            // calling the function after fetching data...
            const responseData = await response.json(); //changing response in .json form
            setEmployeeData(responseData);
            // console.log(responseData);

        } catch (error) { //if the promise is rejected...
            console.log(error);
        }

    };

    //
    useEffect(() => {
        getEmployeeInfo(API);
    }, []);  //purpose of "[]"" is when we refresh the page at that time only it should run. if we do not use it than it can crash our system. 
    // console.log("helooooooo" , employeeData);

    //Function for deleting data

    const deleteUser = async (id) => {
        // setShow(true);
        setModal(true);
        setId(id);
    }

    const deleteItem = async (event) => {
        event.preventDefault();
        const result = await axios.delete(`https://dummy.restapiexample.com/api/v1/delete/${id}`);
        setModal(false);
        setShow(true);
    }

    //creating function for hiding the modal...
    const handleClose = () => {
        setModal(false);
    }

    //filtering the names and searching..

    //     const handleChange = (e) => {
    //         const filterItems = employeeData.data.filter(filtering => {
    //             employeeData.data.employee_name.includes(employeeData.data.employee_name.toLowerCase).map((filteredItem) => {
    //                 setEmployeeData(filterItem);
    //                 console.log("testing the employeeData", employeeData.data)
    //                 console.log("testing the employee_name", employee_name)
    //                 console.log("testing the employee_name_lower", employeeData.data.toLowerCase)
    //             }
    //             )
    //         })
    //     };

    // };

    // 1. Capture and console.log value entered by user in search box 
    // 2. Filter employee data using the value entered by user
    // 3. Update state with the filtered data so that the UI is updated

    const handleChange = (e) => {
        const filtering = () => {
            // setEmployeeData({data: e.target.value});
        } 
        console.log("testing filtering", employeeData.data)
    }
    

//onsole.log("testing value",employeeData )



    return (
        <>
            <div container w-75 mx-auto shadow p-5 >
                <div class="input-group">
                    <div class="form-outline">
                        <input
                            id="search-input"
                            type="search"
                            class="form-control"
                            placeholder="Search user..."
                            //value={}
                            onChange={handleChange}
                        />
                    </div></div>

                {show ? <div class="alert alert-danger" role="alert">Your user data has been successfully deleted....</div> : null}

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Employee Salary</th>
                            <th scope="col">Employee Age</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            employeeData.data.map((curElem) => {
                                return (
                                    <tr>
                                        <td>{curElem.id}</td>
                                        <td>{curElem.employee_name}</td>
                                        <td>{curElem.employee_salary}</td>
                                        <td>{curElem.employee_age}</td>
                                        <td>
                                            <Link className="btn btn-outline-primary" to={"/user/edit/" + curElem.id}>Edit</Link>
                                            <Link className="btn btn-danger" onClick={() => deleteUser(curElem.id)}>Delete</Link>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
                <ModalBox modal={modal} hide={handleClose} delete={deleteItem} />
            </div>
        </>
    )
};

export default Home;