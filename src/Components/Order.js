import React, { useState, useEffect } from 'react';
import service from "../service";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Style.css';

const Order = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state
    const [tableData, setTableData] = useState(data)
    const getAllOrders = () => {
        service.getOrder()
            .then(response => {
                setTableData(response.data)
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    }
    useEffect(() => {
        getAllOrders()
    }, [])
    const handleUpdate = (data) => {
        navigate('/updateorder', { state: data })
    }
    const handleDetete = (_id) => {
        service.deleteOrder(_id)
            .then(response => {
                getAllOrders()
                toast.success(response.data, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            })
            .catch(error => {
                console.log("something went wrong", error)
            })
    }
    const handleOrder = () => {
        navigate('/neworder')
    }
    return (
        <div className='order-back'>
            <ToastContainer />
            <div className='container'>
                {tableData.length > 0 ?
                    <div>
                        <div className='d-flex justify-content-between my-2'>
                            <div></div>
                            <div>
                                <h1>Your Orders</h1>
                            </div>
                            <div className='d-flex align-items-center'>
                                <button type="button" className="btn btn-warning btn-sm fw-bold" onClick={handleOrder}>New Order</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Contact Number</th>
                                        <th>Delivery Address</th>
                                        <th>Food Item</th>
                                        <th>Payment Method</th>
                                        <th>Total Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map(data => (
                                        <tr key={data._id}>
                                            <td>{data.name}</td>
                                            <td>{data.contact_number}</td>
                                            <td>{data.delivery_address}</td>
                                            <td>{data.food_item.join()}</td>
                                            <td>{data.payment_method}</td>
                                            <td>Rs.{data.total_amount}/-</td>
                                            <td>
                                                <div className="d-flex justify-content-evenly">
                                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => { handleUpdate(data) }}>Update</button>
                                                    <button type="button" className="btn btn-danger btn-sm ms-1" onClick={() => { handleDetete(data._id) }}>Cancel</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div className="text-center">
                        <h1>No Orders Yet</h1>
                        <p>Book your orders now</p>
                        <button type="button" className="btn btn-warning btn-sm fw-bold" onClick={handleOrder}>New Order</button>
                    </div>}
            </div>
        </div>
    )
}

export default Order;