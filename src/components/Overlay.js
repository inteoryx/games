import React from "react";
import "./Overlay.css";
import { useEffect, useState } from "react";

const Overlay = ({ visible, icon, alt, heading }) => {

    return (
        <div className={"Overlay" + (visible ? "" : " hidden")}>
            <h1 className="overlayText">{ heading }</h1>
            <img className="overlayIcon" src={ icon } alt={alt} />
        </div>
    );
}

export default Overlay;