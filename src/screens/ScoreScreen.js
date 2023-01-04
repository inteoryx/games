import React from "react";
import { useState, useEffect } from "react";

import IconButton from "../components/IconButton";
import BasicGraph from "../components/BasicGraph";
import { papClient } from "../api/PickAPresidentClient";

import "./ScoreScreen.css";

const whoPres = require("../images/WhosThatPresident.jpg");

const ScoreScreen = ({ setScreen }) => {

    const [ stats, setStats ] = useState({
        last_ten: 0,
        total_correct: 0,
        total: 0,
        rank: 0,
        histogram: [],
        loading: true,
    });

    useEffect(() => {
        papClient.getStats(
            (response) => {
                setStats({
                    last_ten: response.last_ten.correct,
                    total_correct: response.all_time.correct,
                    total: response.all_time.correct + response.all_time.incorrect,
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
                    { stats.loading ? "Loading..." : stats.last_ten + "/10" }
                </div>
            </div>
            {stats.total > 10 && (<div className="scoreDisplay">
                <div className="scoreDisplayText">
                    { stats.loading ? "Loading..." : "Ever: " + stats.total_correct + "/" + stats.total }
                </div>
            </div>)}
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