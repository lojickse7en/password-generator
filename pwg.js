//DOM elements
const resultEl = document.getElementById('result'); //result box. resultEL = result element
const lengthEl = document.getElementById('length'); //password length element 
const uppercaseEl = document.getElementById('uppercase'); // uppercase checkbox element
const lowercaseEl = document.getElementById('lowercase'); //lowercase checkbox element
const numbersEl = document.getElementById('numbers'); // numbers checkbox element
const symbolsEl = document.getElementById('symbols'); // symbols checkbox element
const generateEl = document.getElementById('generate'); // generate button element
const clipboardEl = document.getElementById('clipboard'); // clipboard element

//Put the funtions declared below into a object called randomFunc. 
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//generate password click event that will run a function when clicked. The customer will get the value of all the different criteria (password lenght, include uppercase, etc. If cheked.) 
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value; //i bleveive the plus sign ensures a positve numerical value requirement. Othewise it would have been interpreted as a string. you can check when you console.log(typeof length);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    // instead of passing the resulting vales into a consol.log, we are passing it into a function called generatePassword() to handle the password generation.
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//copy password to clipboard https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
clipboardEl.addEventListener ('click', () => {
    //created the text area
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }
    textarea.value = password; //put the password value into textarea that was created
    document.body.appendChild(textarea); //put the text in the body
    textarea.select();
    document.execCommand('copy'); //copies to the clipboard
    textarea.remove();
    alert('Password copied to clipboard');
})

//generate password function from above click event
function generatePassword (lower, upper , number, symbol, length) {
// 1. Init pw var
// 2. Filter out unchecked types
// 3. Loop over length then call generator fuction for each type
// 4. Add final pw to the pw var and return it 

    let generatedPassword = '';

    //count thenumber of checked items
    const typesCount = lower + upper + number + symbol; 
    // console.log('TypesCount: ', typesCount);

    //create an array based on the above checked values
    //.filter is  high order array method. It will loop though each item and as it goes through each value it will filter the designated value. In this case, values that output false. 
    //added brackets so that we have an array of objects that have each value as keys insted of listing them simply as true, it'll be '1: lower: true''. 
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter (
        item => Object.values(item)[0]
        ); 
    // console.log('typesArr: ', typesArr);
    //sees if there is no boxes checked because if non are checked we do not want it to proceed and generate a password. 
    if(typesCount === 0) {
        return '';
    }
    //3.
    for(let i=0; i<length; i +=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log('funcName: ', funcName)

            generatedPassword += randomFunc[funcName]();///???
        });
    }


    const finalPassword = (generatedPassword.slice(0, length));//.slice method here will slice the last
    return finalPassword;
}



// Generator functions - http://www.net-comber.com/charset.html
// getRandomLower = get a random lowercase letter
// Math.random will generate a random decimal. We want the output to coreespond with one of the letters of the alphabet so we multiply by the limit you want to set which is 26, since there is 26 letters in the alphabet. Math.floor will round the number down so we do not have decimals. Add 97 to the random number that is generated between 1 and 26 so that it give a number corresponding number case letter to code chart (97-122) which are the lower case letter range. 

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);   
} 

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);   
} 

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//this does the same thing as getRandomNumber() fucntion declaration above.
// function getRandomNumbertwo() {
//     return Math.floor(Math.random() * 10); 
// } 


function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'; //
    return symbols[Math.floor(Math.random() * symbols.length)]; //get a character of a string in the form of an array. 
}


