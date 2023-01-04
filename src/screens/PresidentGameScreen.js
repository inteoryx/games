import React from "react";
import { useState, useEffect } from "react";
import IconButton from "../components/IconButton";
import PresImage from "../components/PresImage";
import Overlay from "../components/Overlay";
import "./PresidentGameScreen.css";
import { testPapClient, papClient } from "../api/PickAPresidentClient";

const images = require.context("../images", true);

//const papClient = testPapClient;
const WhoPres = images("./WhosThatPresident.jpg");

const PresidentGameScreen = ({ setScreen }) => {
    const [ answerCount, setAnswerCount ] = useState(0);
    const [ correctAnswer, setCorrectAnswer ] = useState(0);
    const [ quiz, setQuiz ] = useState({quote: "", choices: []});
    const [ ready, setReady ] = useState(false);
    const [ showOverlay, setShowOverlay ] = useState(false);
    const [ overlayIcon, setOverlayIcon ] = useState(images("./incorrect.svg"));

    const getQuiz = () => {
        papClient.getQuiz(
            (response) => {
                console.log("Got quiz: ", response)
                setQuiz(response.quiz);
                setReady(true);
            },
            (error) => {
                console.log("Error getting quiz: ", error);
            }
        );
    };

    const updateOverlay = (icon, alt) => {
        setOverlayIcon(icon);
        setShowOverlay(true);
        setTimeout(() => {
            setShowOverlay(false);
        }, 1000);
    };

    const answer = (ans) => {
        setReady(false);
        papClient.submitGuess(
            quiz.id, ans,
            (response) => {
                setAnswerCount(answerCount + 1);
                if (response.correct) {
                    setCorrectAnswer(correctAnswer + 1);
                    updateOverlay(images("./correct.svg"), "Correct answer");
                }
                else {
                    updateOverlay(images("./incorrect.svg"), "Wrong");
                }
            },
            (error) => {
                console.log("Error submitting answer: ", error);
            }
        );
    };

    // On mount, get a quiz
    useEffect(() => {
        getQuiz();
    }, []);

    // Go to ScoreScreen if we've answered 10 questions
    useEffect(() => {
        if (!showOverlay && answerCount % 10 == 0 && answerCount > 0) {
            setScreen("ScoreScreen");
        }
    }, [ showOverlay ]);


    return (
        <div className="presidentGameScreen">
            <Overlay icon={ overlayIcon } alt={ overlayIcon } visible={ showOverlay } heading={answerCount + "/10"} />
            <div className="mysteryPresidentBox">
                <PresImage
                    src={WhoPres}
                    alt=""
                    style={{ height: "80%", width: "auto" }}
                />
            </div>
            <div className="quote" >
                <textarea className="quoteText" value={quiz.quote} readOnly rows={4} cols={50} />
            </div>
            <div className="answerButtons">
                {quiz.choices.map((choice) => (
                    <IconButton
                        key={choice.president_id}
                        iconSrc={images('./' + choice.image)}
                        text={choice.name}
                        enabled={ ready }
                        onClick={() => {
                            answer(
                                choice.name
                            );
                            getQuiz();
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PresidentGameScreen;