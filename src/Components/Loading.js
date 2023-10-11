import React from 'react';
import { ImSpinner4 } from "react-icons/im";
import './Style.css';

const Loading = () => {
    return (
        <div className="loading">
            <ImSpinner4 className="spinner" />
        </div>
    );
};

export default Loading;