import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../service";
import './Style.css';
import Loading from "./Loading";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();

    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            try {
                const response = await service.login(values);
                console.log('success', response)
                toast.success("Logged In Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                setTimeout(() => {
                    navigate("/home");
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
            errors.username = "Username is required";
        } else if (values.username.length < 4) {
            errors.username = "Username should be at least 4 characters";
        }
        if (!values.password.trim()) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must be 8 characters";
        }
        return errors;
    };

    return (
        <div className="login-back">
            {isLoading &&
                <div>
                    <Loading />
                    <ToastContainer />
                </div>
            }
            <div className={`login-form py-4 ${isLoading ? "hidden" : ""}`}>
                <div className="text-center pb-4">
                    <h1 className="m-0">Login</h1>
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
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control mt-2"
                                id="password"
                                placeholder="Enter password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        </div>
                        <div className="mt-3 text-center">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block rounded-5 w-75"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </div>
                        <div className="text-center my-2">
                            {result && <p style={{ color: "red" }}>{result}</p>}
                        </div>
                    </form>
                </div>
                <hr className="w-75 mx-auto my-3" />
                <div className="text-center">
                    <p>
                        Not a member? <Link to="/signup" style={{ textDecoration: "none" }}>Sign up now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
