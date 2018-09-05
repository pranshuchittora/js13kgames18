let questionElm = document.getElementById('question');
let optionAElm = document.getElementById('option-A');
let optionBElm = document.getElementById('option-B');
let optionCElm = document.getElementById('option-C');
let optionDElm = document.getElementById('option-D');
//Event Elms
let scoreElm = document.getElementById('score');
let lifeElm = document.getElementById('life');
// Global Vars
let life = 3;
let score = 0;
let operandA, operandB;



const generateOperand = () => {
    operandA = Math.ceil(Math.random() * 20);
    operandB = Math.ceil(Math.random() * 20);
}

let ans = 0;

// Num Generate

const addFxn = (a, b) => {
    ans = a + b;
    updateQuestion(a, "+", b);
};

const subFxn = (a, b) => {
    ans = a - b;
    updateQuestion(a, "-", b);

};
const mulFxn = (a, b) => {
    ans = a * b;
    updateQuestion(a, "x", b);
};
const divFxn = (a, b) => {
    ans = a / b;
    updateQuestion(a, "/", b);
};

const updateQuestion = (a, operator, b) => {
    let questionString = a + " " + operator + " " + b;
    questionElm.innerHTML = questionString;
}


//Chage Question
const generate = () => {
    generateOperand();
    a = operandA;
    b= operandB;
    let mathFunctionNumber = Math.ceil(Math.random() * 4);
    if (mathFunctionNumber == 1)
        addFxn(a, b);
    else if (mathFunctionNumber == 2)
        subFxn(a, b);
    else if (mathFunctionNumber == 3)
        mulFxn(a, b);
    else if (mathFunctionNumber == 4)
        divFxn(a, b);
    //Generate Options   
    generateOption();

}
const generateOption = () => {

    optionAElm.innerHTML = Math.ceil(Math.random() * ans) * 2;
    optionBElm.innerHTML = Math.ceil(Math.random() * ans) * 2;
    optionCElm.innerHTML = Math.ceil(Math.random() * ans) * 2;
    optionDElm.innerHTML = Math.ceil(Math.random() * ans) * 2;

    let optionElmArr = [optionAElm, optionBElm, optionCElm, optionDElm];
    let randonAnsInsrt = Math.floor(Math.random() * 4);
    if (ans.toString().length > 3)
        ans = ans.toFixed(1);

    optionElmArr[randonAnsInsrt].innerHTML = ans;
}

generate();
//Check Ans
const checkOption = option => {
    if (option == ans) {
        incrementScore();
    } else {
        decrementLife();
        window.navigator.vibrate(100);
    }
    generate(operandA, operandB);

};

// Options
const optionA = () => {

    checkOption(parseInt(optionAElm.innerHTML));
};

const optionB = () => {
    checkOption(parseInt(optionBElm.innerHTML));
};

const optionC = () => {
    checkOption(parseInt(optionCElm.innerHTML));
};

const optionD = () => {
    checkOption(parseInt(optionDElm.innerHTML));
};
// Final Update
const update = () => {
    if (life != 0) {
    } else {
    }
};




//Events
const incrementScore = () => {
    score++;
    scoreElm.innerHTML = "Score : " + score;
}
const decrementLife = () => {

    life--;
    lifeElm.innerHTML = "❤ x" + life;
}