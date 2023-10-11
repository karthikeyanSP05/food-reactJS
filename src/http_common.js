import axios from "axios";
export default axios.create({
    // baseURL: "http://localhost:5000/user",
    baseURL: "https://food-nodejs.onrender.com/user",
    headers: {
        "Content-type": "application/json"
    }
});
//https://food-nodejs.onrender.com 