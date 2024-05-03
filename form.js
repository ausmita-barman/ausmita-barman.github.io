// JavaScript logic
let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const prevBtn = document.querySelector(".previous-question");
const nextBtn = document.querySelector(".next-question");
const submitBtn = document.querySelector(".submit");
const radioBtn = document.querySelectorAll('input[type="radio"]');
const quizContainer = document.querySelector(".quiz-container");
const statusContainer = document.querySelector("#status");
const questionLeft = document.querySelector(".question-left");
const questionTotal = document.querySelector(".question-total");

questionTotal.textContent = questions.length;

//form API
const formAPI = "https://sheetdb.io/api/v1/cl99pmrs2lyms";
const form = document.forms["quizForm"];
const tabName = "test_v2";
const url = `${formAPI}?sheet=${tabName}`;


function showQuestion(index) {
    questions.forEach((question, i) => {
        question.style.display = i === index ? 'block' : 'none';
    });
    prevBtn.disabled = currentQuestion == 0 ? true : false;
    currentQuestion == (questions.length - 1) ? nextBtn.disabled = true : nextBtn.disabled = false;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}


// Add event listeners to radio buttons
// radioBtn.forEach(btn => {
//     btn.addEventListener('change', () => {
//         setTimeout(() => {
//             nextQuestion(); 
//         }, 200); 
//     });
// });


quizContainer.addEventListener("click", submitDisabled);

function submitDisabled() {
    const radioSelected = Array.from(radioBtn).filter(btn => btn.checked);
    // if (radioSelected.length == questions.length) {
    //     submitBtn.disabled = false;
    // } else {
    //     submitBtn.disabled = true;
    // }

    const qLength = questions.length;

    questionLeft.textContent = radioSelected.length;

    const progress = ((radioSelected.length) / qLength) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";

    submitBtn.disabled = radioSelected.length == qLength ? false : true;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    var alertBox = document.getElementById("alertBox");
    // const spinBox = document.querySelector(".spinner");

    try {
        const response = await fetch(url, {
            method: "POST",
            body: new FormData(form)
        });
        if (response.ok) {
            alertBox.textContent = "Submitting..";
            alertBox.style.display = "block";

            // spinBox.style.display = "block";

            setTimeout(function () {
                // spinBox.style.display = "none";
                document.getElementById("quizForm").reset();
                alertBox.textContent = "Thank you for completing the survey! Your responses have been received.";
                alertBox.style.display = "block";

                // Automatically close the alert after 4 seconds
                setTimeout(function () {
                    alertBox.style.display = "none";
                    window.location.href = 'index.html';
                }, 4000);
            }, 1000);
        } else {
            throw new Error("Failed to submit form. Please try again later.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
})

showQuestion(currentQuestion); // Show the first question initially

function startSurvey() {
    window.location.href = 'survey.html';
}
