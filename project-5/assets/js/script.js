const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "None of these"
        ],
        answer: 0
    },

    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        answer: 0
    },

    {
        question: "Which language is used for web page interactivity?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },

    {
        question: "Which company developed JavaScript?",
        options: [
            "Microsoft",
            "Netscape",
            "Google",
            "Apple"
        ],
        answer: 1
    },

    {
        question: "Which property is used in CSS to change text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "text-style"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        options: [
            "<h1>",
            "<h6>",
            "<head>",
            "<heading>"
        ],
        answer: 0
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "//",
            "<!-- -->",
            "##",
            "**"
        ],
        answer: 0
    },

    {
        question: "Which HTML tag is used to insert an image?",
        options: [
            "<image>",
            "<img>",
            "<pic>",
            "<src>"
        ],
        answer: 1
    },

    {
        question: "Which CSS property controls the text size?",
        options: [
            "text-size",
            "font-style",
            "font-size",
            "text-style"
        ],
        answer: 2
    }
];

document.getElementById("quizBox").style.display = "none";

let player = "";
let currentQuestion = 0;
let score = 0;
let answered = false;
let time = 15;
let timer;

function startQuiz() {
    player = document.getElementById("playerName").value;
    if (player === "") {
        alert("Please Enter Your Name")
        return;
    }
    document.getElementById("welcome").style.display = "none";

    startCountdown();
}

function startCountdown() {
    let count = 3;
    document.getElementById("countdown").innerText = count;

    let interval = setInterval(() => {
        count--;
        document.getElementById("countdown").innerText = count;

        if (count === 0) {
            clearInterval(interval);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("quizBox").style.display = "block";
            loadQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    answered = false;
    document.getElementById("questionNumber").innerText = "Question " + (currentQuestion + 1) + " of " + questions.length;

    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    let options = document.querySelectorAll(".option");

    options.forEach((btn, i) => {
        btn.innerText = q.options[i];

        btn.disabled = false;

        btn.classList.remove("btn-success", "btn-danger");

        btn.classList.add("btn-outline-primary");
    });

    startTimer()
}

function startTimer() {
    clearInterval(timer);
    time = 15;
    document.getElementById("timer").style.color = "white";
    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = time;

        if (time <= 5) {
            document.getElementById("timer").style.color = "red";
        } else {
            document.getElementById("timer").style.color = "white";
        }

        if (time === 0) {
            clearInterval(timer);
            let messages = [
                "⏰ Too slow!",
                "⏰ Time ran out!",
                "⏰ Clock wins this round!"
            ];
            alert(messages[Math.floor(Math.random() * messages.length)]);

            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion()
    } else {
        showResult()
    }
}

function checkAnswer(index) {

    clearInterval(timer);

    answered = true;

    let options = document.querySelectorAll(".option");

    let correctAnswer = questions[currentQuestion].answer;

    if (index === correctAnswer) {
        score++;
        let correctSound = document.getElementById("correctSound");
        correctSound.currentTime = 0;
        correctSound.play();
    } else {
        let wrongSound = document.getElementById("wrongSound");
        wrongSound.currentTime = 0;
        wrongSound.play();
    }

    options.forEach((btn, i) => {

        btn.disabled = true;

        if (i === correctAnswer) {
            btn.classList.remove("btn-outline-primary");
            btn.classList.add("btn-success");
        } else if (i === index) {
            btn.classList.remove("btn-outline-primary");
            btn.classList.add("btn-danger");
        }

    });
}

function nextbtn() {
    if (!answered) {
        alert("Please select an answer first!");
        return;
    }
    nextQuestion()
}

function showResult() {
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("result").style.display = "block";

    document.getElementById("finalName").innerText = "player Name : " + player;

    let message = "";

    if (score >= 7) {
        message = "🏆 Great job! You're a quiz master.";
        confetti();
    }
    else if (score >= 4) {
        message = "📚 Good try! Learning never stops.🙂";
    }
    else {
        message = "💪 Don't give up! Practice makes perfect.";
    }

    document.getElementById("finalScore").innerHTML =
        `Your Score: ${score}/10 <br><br> ${message}`;

}

function RestartQuiz() {
    currentQuestion = 0;
    score = 0;
    time = 15;

    document.getElementById("result").style.display = "none";
    document.getElementById("welcome").style.display = "block";
}