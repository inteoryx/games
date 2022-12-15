import React from "react";
import "./PresImage.css";

const PresImage = ({ src, alt, style }) => {
    return (
        <div className="PresImage" style={style}>
            <img className="pres-image" src={src} alt={alt} />
        </div>
    );
};

export default PresImage;