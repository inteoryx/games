// If playerId is in localStorage, use that. Otherwise, generate a new one.
const playerId = localStorage.getItem("playerId") || Math.round(Math.random() * 1000000000);


const testHistogram = [
    100,
];
const testPresidents = [
        {
            "name": "George Washington",
            "image": "01-washington.jpg",
            "presidentId": "1"
        },
        {
            "name": "Barack Obama",
            "image": "44-obama.jpg",
            "presidentId": "44",
        },
        {
            "name": "Donald Trump",
            "image": "45-donald-trump.png",
            "presidentId": "45",
        },
        {
            "name": "Abraham Lincoln",
            "image": "16-lincoln.jpg",
            "presidentId": "16",
        },
];

const url = "https://nowplayok.com/s";

const papClient = {
    getQuiz: (success, fail) => {
        fetch(url + "/getQuiz", {
            method: "POST",
            // request is CORS, so we need to specify the origin
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000",
            },
            mode: "cors",
            body: JSON.stringify({
                player_id: playerId,
            }),
        })
            .then((response) => response.json())
            .then((json) => success(json))
            .catch((error) => fail(error));
    },

    submitGuess: (quizId, answer, success, fail) => {
        fetch(url + "/submitGuess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
                quiz_id: quizId,
                answer: answer,
            }),
        })
            .then((response) => response.json())
            .then((json) => success(json))
            .catch((error) => fail(error));
    },

    getStats: (success, fail) => {
        fetch(url + "/getStats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
            }),
        })
            .then((response) => response.json())
            .then((json) => success(json))
            .catch((error) => fail(error));
    },


};

const testPapClient = {
    getQuiz: (success, fail) => {
        setTimeout(() => success({
            "quote": "This is a quote",
            // randomize the order of the choices
            "choices": testPresidents.sort(() => Math.random() - 0.5), 
            "quizId": 1,
        }), 1000);
    },
    submitGuess: (quizId, answerId, success, fail) => {
         success({
            "correct": answerId == 45,
        });
    },

    getStats: (success, fail) => {
        setTimeout(() => success({
            "total": 10,
            "correct": 7,
            "rank": 11,
            "histogram": testHistogram,
        }), 1000);
    }
};

export { papClient, testPapClient };
