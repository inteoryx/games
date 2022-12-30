import React from "react";
import "./IconButton.css";
import PresImage  from "./PresImage";

const IconButton = ({ text, iconSrc, onClick, style, enabled }) => {

    return (
        // If enabled is false, add the "disabled" class to the div
        <div 
            className={"IconButton" + (enabled ? "" : " disabled")}
            onClick={ () => { if (enabled) { onClick(); } } }
        >
            <PresImage 
                src={iconSrc} 
                alt={"An image of " + text}
            />
            <div 
                className="icon-button-text"
            >
                {text}
            </div>
        </div>
    );
}

export default IconButton;