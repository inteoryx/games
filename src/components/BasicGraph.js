import React from "react";
import { useState, useEffect } from "react";
import './BasicGraph.css';

const BasicGraph = ({ data, highlightPosition }) => {

    const drawGraph = (ctx) => {
        let rectWidth = ctx.canvas.width / data.length;
        let barStart = ctx.canvas.height;
        let scalingFactor = (ctx.canvas.height) / 100;

        // draw a bar for each data point
        for (let i = 0; i < data.length; i++) {
            ctx.fillStyle = "#2A9D8F";

            ctx.fillRect(i * rectWidth, barStart, rectWidth, -data[i] * scalingFactor);
        }

        // draw a label for every 10th data point
        for (let i = 0; i < data.length; i += 10) {
            ctx.fillStyle = "black";
            ctx.textAlign = "center";

            // label should be big bold text
            ctx.font = "bold 14px Arial";
            ctx.fillText(i * 10, i * rectWidth + rectWidth / 2 + 4, barStart);
        }

        // draw a red line connecting the top of each bar
        ctx.beginPath();
        ctx.strokeStyle = "#E76F51";
        ctx.lineWidth = 2;
        for(let i = 0; i < data.length; i++) {
            ctx.lineTo(i * rectWidth + rectWidth / 2, barStart - data[i] * scalingFactor);
        }
        ctx.stroke();

        
        if (highlightPosition) {
            console.log("highlightPosition: ", 0.05 * ctx.canvas.width);
            ctx.fillStyle = "red";
            // draw a red rectangle at the highlight position
            ctx.fillRect(
                (highlightPosition / 100) * ctx.canvas.width,
                0,
                5,
                ctx.canvas.height
            );
            
        }
        
    };
        
    // when the component has mounted and the canvas is ready get the context
    useEffect(() => {
        const canvas = document.querySelector(".basicGraphCanvas");
        const ctx = canvas.getContext("2d");
        drawGraph(ctx);
    }, []);

    return (
        <div className="basicGraph">
            <canvas className="basicGraphCanvas" />
        </div>
    );
}

export default BasicGraph;