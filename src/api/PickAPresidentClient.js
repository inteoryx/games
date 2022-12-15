const playerId = '1234';
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

for(let i = 1; i < 100; i++) {
    testHistogram.push(Math.round(Math.random() * 100));
}

const papClient = {

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
    submitAnswer: (quizId, answerId, success, fail) => {
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