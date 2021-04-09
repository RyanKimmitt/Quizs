//html
let containerEL = document.getElementById("container");

//vars
let quizArray = [["Girls", ["How many girls has the author of the program had? (lifetime)", "0"], ["which of the following is a reason for your prior answer, He cute, He awkward, He don't want one...", "He don't want one"], ["Will he get a girl in the near future? (Y/N)", "No"]], ["Filler quiz", ["What is the best Hockey team in the NHL", "Oilers"], ["Who is the best player on that team", "McDavid"]]];

window.addEventListener("load", () => {
    mainPrint(false)
});



function mainPrint(reload) {
    if (reload === true) {

        containerEL.innerHTML = "";

        
        

    }
    if (reload === false) {
        let reQuiz = localStorage.getItem("Quiz");

        let parseQuiz = JSON.parse(reQuiz);
        quizArray = parseQuiz;
    }



}

function updateStroage() {

    let quizStr = JSON.stringify(quizArray);
    localStorage.setItem("Quiz", quizStr);

}



document.getElementById("resetBox").addEventListener("click", () => {
    mainPrint(true);
})



var qBox = $('#box').click(function buttonAction() {
    $("#dialog-confirm").html("Do you want to make a quiz, or. Take a quiz?");
    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        title: "( ͡° ͜ʖ ͡°)",
        height: 250,
        width: 400,
        buttons: {
            "Take": function () {
                $(this).dialog('close');

                let displayArray = [];
                for (let p = 0; p < quizArray.length; p++) {
                    displayArray.push(`${quizArray[p][0]} `);
                }

                alert(`You can choose from these quizs: ${displayArray}`);
                take(prompt("What quiz do you want to take (type name of quiz)").toLowerCase());


            },
            "Make": function () {
                $(this).dialog('close');
                make();
            }
        }
    });
});


function take(quizIn) {

    for (let i = 0; i < quizArray.length; i++) {
        if (quizIn === quizArray[i][0].toLowerCase()) {
            printQuiz(quizArray[i]);
            break;
        }
    }

}

function make() {
    //need amount of questions , questions and answers, nr format with letters
    var newQuiz = [];
    var quizName = prompt("what will you title this quiz");
    newQuiz.push(quizName);
    var newQuizNumber = prompt("How many questions?")
    var localquiz = [];

    for (let y = 0; y < newQuizNumber; y++) {

        let questionArray = [];

        questionArray.push(prompt(`What is question #${y + 1}`), prompt(`What is the answer to question #${y + 1}`));

        newQuiz.push(questionArray);
    }

    for (let q = 1; q < newQuiz.length; q++) {
        localquiz.push(newQuiz[q]);
    }

    quizArray.push(newQuiz);
    updateStroage();
    printQuiz(newQuiz);
}

// let containerEL = document.getElementById("container");
function printQuiz(quiz) {
    containerEL.innerHTML = "";
    let title = document.createElement("p")
    title.innerHTML = `Quiz: ${quiz[0]}`
    containerEL.appendChild(title);
    for (let b = 1; b < quiz.length; b++) {
        let div = document.createElement("div");
        div.innerHTML = quiz[b][0];

        let inputEL = document.createElement("input");
        inputEL.type = "text"
        inputEL.id = `input ${b}`
        inputEL.classList.add("input");
        containerEL.appendChild(div);
        containerEL.appendChild(inputEL);

    }
    let p = document.createElement("p");
    let markBTN = document.createElement("button")
    markBTN.classList.add("mark");
    markBTN.innerHTML = "Mark";
    containerEL.appendChild(markBTN);
    markBTN.addEventListener("click", () => {
        markQuiz(quiz, p);
    });

}


function markQuiz(quiz, p) {
    let WA = "";
    let input = document.getElementsByClassName("input");

    let score = 0;
    for (let l = 1; l < quiz.length; l++) {
        if (input[l - 1].value.toLowerCase() === quiz[l][1].toLowerCase()) {
            score++;
        }
        if (input[l - 1].value.toLowerCase() != quiz[l][1].toLowerCase()) {
            WA += `Question: ${l}. Your answer: ${input[l - 1].value}, correct asnwer: ${quiz[l][1]}. `
        }
    }



    containerEL.appendChild(p);
    p.innerHTML = `You scored ${score}/${quiz.length - 1}. Wrong answers: ${WA}`;
}
