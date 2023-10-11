import React, { useEffect, useState } from 'react'
import service from '../service'
import './Style.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';

const Neworder = () => {
    const [name, setName] = useState('')
    const [contact_number, setContactNumber] = useState('')
    const [delivery_address, setDeliveryAddress] = useState('')
    const [food_item, setFoodItem] = useState([])
    const [payment_method, setPaymentMethod] = useState('')
    const [total_amount, setTotalAmount] = useState(0)
    const [checkBoxes, setCheckBoxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
    })
    const [errors, setErrors] = useState({
        name: "",
        contact_number: "",
        delivery_address: "",
        food_item: "",
        payment_method: ""
    })
    const handleChange = event => {
        const { checked, value, name } = event.target;
        setCheckBoxes({
            ...checkBoxes,
            [name]: checked,
        });
        setFoodItem(
            prev => checked
                ? [...prev, value]
                : prev.filter(val => val !== value)
        );
    };
    const calculateAmount = () => {
        let total = 0;
        if (checkBoxes.checkbox1) {
            total += 200;
        }
        if (checkBoxes.checkbox2) {
            total += 100;
        }
        if (checkBoxes.checkbox3) {
            total += 150;
        }
        return total;
    };
    useEffect(() => {
        setTotalAmount(calculateAmount());
    }, [food_item]);
    const handleSubmit = async (event) => {
        event.preventDefault()
        const validationErrors = validate({ name, contact_number, delivery_address, food_item, payment_method });
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await service.newOrder(name, contact_number, delivery_address, food_item, payment_method, total_amount)
                console.log('Success', response);
                toast(<Button message={response.data} />, { position: toast.POSITION.TOP_CENTER, autoClose: false, closeButton: false })
            } catch (error) {
                console.log('Something went wrong', error)
            }
        }
    }
    const validate = ({ name, contact_number, delivery_address, food_item, payment_method }) => {
        let errors = {}
        if (!name.trim()) {
            errors.name = "Name is required"
        } else if (name.length < 4) {
            errors.name = "Name should be at least 4 characters"
        }
        if (!contact_number.trim()) {
            errors.contact_number = "Contact number is required"
        } else if (contact_number.length < 10) {
            errors.contact_number = "Contact number must be 10 digits"
        }
        if (!delivery_address.trim()) {
            errors.delivery_address = "Delivery address is required"
        }
        if (food_item.length === 0) {
            errors.food_item = "Select one food item"
        }
        if (payment_method.length === 0) {
            errors.payment_method = "Select one payment method"
        }
        return errors;
    }
    return (
        <div className='neworder-back'>
            <ToastContainer />
            <div className='neworder-form py-4'>
                <form className='px-3'>
                    <div className='text-center'>
                        <h1 className="m-0">Book Your Order</h1>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="name"
                            placeholder="Enter your name"
                            name="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}

                        />
                        {errors.name && <p style={{ color: "red", fontWeight: "bold" }}>{errors.name}</p>}
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="contact_number">Contact Number</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="contact_number"
                            placeholder="Enter your contact number"
                            name="contact_number"
                            value={contact_number}
                            onChange={(e) => { setContactNumber(e.target.value) }}
                        />
                        {errors.contact_number && <p style={{ color: "red", fontWeight: "bold" }}>{errors.contact_number}</p>}
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="delivery_address">Delivery Address</label>
                        <textarea
                            className="form-control mt-2"
                            rows="5"
                            id="delivery_address"
                            name="delivery_address"
                            placeholder="Enter your address"
                            value={delivery_address}
                            onChange={(e) => { setDeliveryAddress(e.target.value) }}
                        />
                        {errors.delivery_address && <p style={{ color: "red", fontWeight: "bold" }}>{errors.delivery_address}</p>}
                    </div>
                    <div className='form-group my-2'>
                        <label>Select your food items</label>
                        <div className="form-check">
                            <input type="checkbox"
                                className="form-check-input mt-2"
                                id="check1"
                                name="checkbox1"
                                value="Pizza"
                                checked={checkBoxes.checkbox1}
                                onChange={handleChange} />
                            <label className="form-check-label" htmlFor="check1">Pizza - Rs.200</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox"
                                className="form-check-input mt-2"
                                id="check2"
                                name="checkbox2"
                                value="Burger"
                                checked={checkBoxes.checkbox2}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="check2">Burger - Rs.100</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox"
                                className="form-check-input mt-2"
                                id="check3"
                                name="checkbox3"
                                value="Sandwich"
                                checked={checkBoxes.checkbox3}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="check3">Sandwich  - Rs.150</label>
                        </div>
                        {errors.food_item && <p style={{ color: "red", fontWeight: "bold" }}>{errors.food_item}</p>}
                    </div>
                    <div className='form-group my-2'>
                        <label>Payment Method</label>
                        <div>
                            <input type="radio"
                                name="select"
                                id="cash"
                                onChange={(e) => { setPaymentMethod(e.target.value) }}
                                value="Cash"
                                className='form-radio'
                            />
                            <label htmlFor="cash" className='ms-1'>Cash</label>
                            <input
                                type="radio"
                                name="select"
                                id="card"
                                onChange={(e) => { setPaymentMethod(e.target.value) }}
                                value="Card"
                                className='form-radio ms-2'
                            />
                            <label htmlFor="card" className='ms-1'>Card</label>
                            {errors.payment_method && <p style={{ color: "red", fontWeight: "bold" }}>{errors.payment_method}</p>}
                        </div>
                    </div>
                    <div className='my-2'>
                        <p>Total Amount: Rs.{total_amount}/-</p>
                    </div>
                    <div className='mt-4 text-center'>
                        <button type='submit' className='btn btn-success btn-block rounded-5 w-75' onClick={handleSubmit}>Order</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Neworder;