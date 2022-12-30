import React from "react";
import { useState, useEffect } from "react";

import IconButton from "../components/IconButton";
import BasicGraph from "../components/BasicGraph";
import { papClient } from "../api/PickAPresidentClient";

import "./ScoreScreen.css";

const whoPres = require("../images/WhosThatPresident.jpg");

const ScoreScreen = ({ setScreen }) => {

    const [ stats, setStats ] = useState({
        total: 0,
        correct: 0,
        rank: 0,
        histogram: [],
        loading: true,
    });

    useEffect(() => {
        papClient.getStats(
            (response) => {
                setStats({
                    total: response.total,
                    correct: response.correct,
                    rank: response.rank,
                    histogram: response.histogram,
                    loading: false,
                })
            },
            (error) => {
                console.log("Error getting score details: ", error);
            }
        );
    }, []);

    return (
        <div className="scoreScreen">
            <div className="scoreDisplay">
                <div className="scoreDisplayText">
                    { stats.loading ? "Loading..." : stats.correct + "/" + stats.total}
                </div>
            </div>
            <div className="scoreDisplay">
                <div className="scoreDisplayText">
                    { stats.loading ? "Loading..." : Math.round(stats.correct / stats.total * 100) + "%"}
                </div>
            </div>
            <div className="scoreGraphDisplay">
                { stats.loading ? "Loading..." :    <BasicGraph 
                    data={stats.histogram}
                    highlightPosition={stats.correct / stats.total * 100}
                />
                }
            </div>
            <div className="scoreButtonArea">
                <IconButton
                    iconSrc={whoPres}
                    alt="Play again"
                    onClick={() => setScreen("PresidentGameScreen")}
                    text="Play again"
                    style={{ width: "80%", maxWidth: "400px" }}
                    enabled={true}
                />
            </div>
        </div>
    );

}

export default ScoreScreen;