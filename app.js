document.addEventListener("DOMContentLoaded", function(){
    let number = document.querySelectorAll(".number");
    let  equal= document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");
    let operators = document.querySelectorAll(".operator");
    let clearbtn = document.querySelector(".clear-btn");

    let inputPrevious = document.querySelector(".previous");
    let inputCurrent = document.querySelector(".current");

    
    number.forEach((number) => {
        number.addEventListener("click", function(e){
            handleNumber(e.target.textContent)
            inputCurrent.textContent = currentValue;
        })
    })

    operators.forEach((op) => {
        op.addEventListener("click", function(e){
            handleOperator(e.target.textContent)
            inputPrevious.textContent = previousValue + " " + operator;
            inputCurrent.textContent = currentValue;
        })
    })

    clearbtn.addEventListener("click", function(){
        previousValue = "";
        currentValue = "";
        operator = "";
        inputPrevious.textContent = currentValue;
        inputCurrent.textContent = currentValue;
    })

    equal.addEventListener("click", function(){
        if(currentValue != "" && previousValue != ""){
                calculate()
            inputPrevious.textContent = "";
            if(previousValue.length <= 5){
                inputCurrent.textContent = previousValue;
            }else{
                inputCurrent.textContent = previousValue.slice(0,5) + "...";
            }
        }    
    })

    decimal.addEventListener("click", function(){
        addDecimal()
    })
});

let currentValue = "";
let previousValue = "";
let operator = "";

let handleNumber = (num) => {
     let error = document.querySelector(".error");
    if(currentValue.length <= 4){
         currentValue += num;
         error.style.display ="none";
    }else{
        error.style.display ="block";
    }
   
}

let handleOperator = (op) => {
    operator = op
    previousValue = currentValue
    currentValue = "";
}

let calculate = () => {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
        previousValue += currentValue;
    }else if(operator === "-"){
        previousValue -= currentValue;
    }else if(operator === "x"){
        previousValue *= currentValue;
    }else{
        previousValue /= currentValue
    }

    previousValue = roundNumber(previousValue)
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000
}

let addDecimal = () => {
    if(!currentValue.includes(".")){
        currentValue += ".";
    }
}