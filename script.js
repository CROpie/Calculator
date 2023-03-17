const digits = ["0","1","2","3","4","5","6","7","8","9"];
const operands = ["+","-","*", "/", "="];

// Arrow functions cannot be used to send this.value in this way. 'this' won't refer to the right thing.
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener('click', function () {
        recursiveCalculate(this.value);
});
});


document.querySelector("#modify").addEventListener("click", modifyValue);
document.querySelector("#calculatemodify").addEventListener("click", calculateModify);
document.querySelector("#clear").addEventListener("click", clearAll);

// This is wrong and will cause the program to fail for some reason (?) 
// (the only difference is () in the function to be called)
/*
document.querySelector("#modify").addEventListener("click", modifyValue());
*/

// This is also ok, and is a way to send this.value to the function
/*
document.querySelector("#modify").addEventListener("click", function () {
    modifyValue();
});
*/

display = document.querySelector("#display");
tracker = document.querySelector("#tracker-display");

display.value = "";
num0 = "";
stored_num = null;
operand0 = "+";

function clearAll() {
    display.value = "";
    num0 = "";
    stored_num = null;
    operand0 = "+";
    tracker.value = "";
    display.style.backgroundColor = "white";
}

function modifyValue() {
    tracker.disabled = false;
    document.querySelector("#calculatemodify").removeAttribute("hidden");
    display.style.backgroundColor = "black";
}

// num 0 operand num 1 num0=result recursion or while
function calculateModify() {
    full_calculation = tracker.value += "=";
    console.log(full_calculation);
    tracker.value = "";
    num0 = "";
    stored_num = null;
    operand0 = "+";

    for (input of full_calculation) {
            recursiveCalculate(input)
    }
    alert(stored_num);
}


// input in operands doesn't work for some reason ???
// need to use operands.includes(input)
function recursiveCalculate(input){
    if (input in digits) {
        num0 += input;
        display.value = num0;
        tracker.value += input;

    } else if (operands.includes(input)) {


        if (!stored_num) {
            stored_num = num0;
            } else {
                doEquation(operand0);
                display.value = stored_num;
            }
        num0 = '';
        operand0 = input;
        tracker.value += ` ${operand0} `;
    } else if (input == ' ') {
            // do nothing
    }
}

function doEquation(input) {
    if (input == "+") {
        stored_num = parseInt(stored_num) + parseInt(num0);
    } else if (input == "-") {
        stored_num = parseInt(stored_num) - parseInt(num0);
    } else if (input == "*") {
        stored_num = parseInt(stored_num) * parseInt(num0);
    } else if (input == "/") {
        stored_num = parseInt(stored_num) / parseInt(num0);
    }
}
