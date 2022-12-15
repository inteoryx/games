import React from "react";
import "./Overlay.css";
import { useEffect, useState } from "react";

const Overlay = ({ visible, icon, alt }) => {

    return (
        <div className={"Overlay" + (visible ? "" : " hidden")}>
            <img className="overlayIcon" src={ icon } alt={alt} />
        </div>
    );
}

export default Overlay;