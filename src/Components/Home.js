import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service";
import './Style.css';
import { IoFastFoodOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import pizza from '../Images/pizza3.jpg';
import burger from "../Images/burger1.jpg";
import sandwich from '../Images/sandwich1.jpg';

function Home() {
    const navigate = useNavigate()
    const [tableData, setTableData] = useState([])
    const getAllOrders = () => {
        service.getOrder()
            .then(response => {
                setTableData(response.data)
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    }
    const handleOrder = () => {
        navigate('/neworder')
    }
    const handleLogout = () => {
        navigate('/')
    }
    const handleShowOrder = () => {
        if (tableData.length > 0) {
            navigate('/orders', { state: tableData })
        } else {
            toast.warning(
                <div>
                    <p className="m-0">No orders yet</p>
                    <p className="m-0">Book your orders now</p>
                </div>,
                { position: toast.POSITION.TOP_CENTER })
        }
    }
    useEffect(() => {
        getAllOrders()
    }, [])
    return (
        <div className="home-back">
            <ToastContainer />
            <nav className='navbar navbar-expand-sm fixed-top bg-white'>
                <div className='container'>
                    <IoFastFoodOutline style={{ fontSize: "50px", color: "red" }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mt-2" id="collapsibleNavbar">
                        <button type="button" className="btn btn-danger btn-sm" onClick={handleLogout}>Log Out</button>
                        <button type="button" className="btn btn-primary btn-sm ms-2" onClick={handleShowOrder}>Show Orders</button>
                    </div>
                </div>
            </nav>
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="text-center text-white fw-bold my-4">
                    <h1 style={{ fontFamily: "cursive" }}>OUR SPECIAL MENU</h1>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="text-center  bg-white p-3">
                            <img src={pizza} alt="error" className="img-fluid" />
                            <h3>Pizza</h3>
                            <p style={{ fontStyle: "italic" }}>Black olives,bacon, green pepper, onion, mushroom & tomato</p>
                            <p className="text-danger fw-bold mb-2">Rs.200/-</p>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3 mt-md-0">
                        <div className="text-center  bg-white p-3">
                            <img src={burger} alt="error" className="img-fluid" />
                            <h3>Burger</h3>
                            <p style={{ fontStyle: "italic" }}>Roasted turkey, bacon, tomato over creamy cheddar alfredo sauce</p>
                            <p className="text-danger fw-bold mb-2">Rs.100/-</p>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3 mt-md-0">
                        <div className="text-center  bg-white p-3">
                            <img src={sandwich} alt="error" className="img-fluid" />
                            <h3>Sandwich</h3>
                            <p style={{ fontStyle: "italic" }}>Alfredo sauce, grilled chicken, mushrooms & black olives</p>
                            <p className="text-danger fw-bold mb-2">Rs.150/-</p>
                        </div>
                    </div>
                </div>
                <div className="text-center my-5">
                    <button type="button" className="btn btn-success" onClick={handleOrder}>Book Your Orders</button>
                </div>
            </div>
        </div>
    )
}
export default Home;