import React from "react";
import './Toggle.css';

const Toggle = ({ onToggle }) => {
    const handleToggle = (e) => {
        onToggle(e.target.checked);
    };

    return (
        <label className="toggle">
            <input type="checkbox" className="rounded-full" onChange={handleToggle} />
            <span className="slider rounded-full"></span>
        </label>
    );
};

export default Toggle;
