import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import service from '../service';
import './Style.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

const Signup = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [result, setResult] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => {
            return {
                ...prevValues,
                [name]: value,
            }
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            try {
                const response = await service.signup(values);
                console.log('success', response)
                toast.success("Signup Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/");
                }, 2000);
            } catch (error) {
                setResult(error.response.data);
                setIsLoading(false);
                console.error('Something went wrong', error);
            }
        }
    };

    const validate = (values) => {
        let errors = {};

        if (!values.username.trim()) {
            errors.username = "Username required";
        } else if (values.username.length < 4) {
            errors.username = "Username should be at least 4 characters"
        }
        if (!values.email.trim()) {
            errors.email = "Email required";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
            errors.email = "Email address is invalid";
        }

        if (!values.password.trim()) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must be 8 characters";
        }

        if (!values.confirmPassword.trim()) {
            errors.confirmPassword = "Password is required";
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Password do not match"
        }
        return errors;
    };

    return (
        <div className='signup-back'>
            {isLoading &&
                <div>
                    <Loading />
                    <ToastContainer />
                </div>
            }
            <div className={`signup-form py-4 ${isLoading ? "hidden" : ""}`}>
                <div className="text-center pb-4">
                    <h1 className="m-0">Signup</h1>
                </div>
                <hr className="m-0" />
                <div className="px-3 pt-2">
                    <form>
                        <div className="form-group my-3">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control mt-2"
                                id="username"
                                placeholder="Enter your username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control mt-2"
                                id="email"
                                placeholder="Enter your email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="form-control mt-2"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Enter your confirm password"
                                className="form-control mt-2"
                                value={values.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
                        </div>
                        <div className="mt-3 text-center">
                            <button type="submit" className="btn btn-primary btn-block rounded-5 w-75" onClick={handleSubmit}>
                                Create Account
                            </button>
                        </div>
                        <div className="text-center my-2">
                            {result && <p style={{ color: "red" }}>{result}</p>}
                        </div>
                    </form>
                </div>
                <hr className="w-75 mx-auto my-3" />
                <div className="text-center">
                    <p>Already a member?<Link to="/" style={{ textDecoration: "none" }}> Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;