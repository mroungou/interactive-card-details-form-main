function isCreditCard(creditCardNumber) {
    const creditCardString = creditCardNumber.toString();

    return creditCardString.match(/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/)
}

function isCVV(cvvNumber) {
    const cvvString = cvvNumber.toString();

    return cvvString.match(/^[0-9]{3,4}$/)
}

function validateCreditCard() {
    const creditCard = document.getElementById('card-number')
    const creditCardDet = document.getElementById('card-number-output');
    const creditCardValue = creditCard.value.trim();
    
    creditCardDet.innerText = creditCardValue;

    if (creditCard.value === '') {
        setError(creditCard, 'Card Number cannot be blank')
    } else if (!isCreditCard(creditCardValue)) {
        setError(creditCard, 'Wrong format, numbers only')
    } else {
        setNoError(creditCard)
    }
}

function validateCVV() {
    const cvv = document.getElementById('cvv');
    const cvvOutput = document.getElementById('card-cvv');
    const cvvValue = cvv.value.trim();

    cvvOutput.innerText = cvvValue;
    
    if (cvv.value === '') {
        setError(cvv, "Can't be blank")
    } else if(!isCVV(cvvValue)) {
        setError(cvv, 'Wrong format')
    } else {
        setNoError(cvv)
    }
}

function validateMonth() {
    const month = document.getElementById('expiry-date-month');
    const monthOutput = document.getElementById('month-output');

    const monthValue = month.value.trim();
    monthOutput.innerText = monthValue

    if (monthValue === '') {
        setError(month, 'Can\'t be blank');
    } else if (monthValue <= 0 || monthValue > 12) {
        setError(month, "Enter a valid month");
    } else {
        setNoError(month);
    }
}

function validateYear() {
    const year = document.getElementById('expiry-date');
    const yearOutput = document.getElementById('year-output');
    const currentYear = new Date().getFullYear;

    const yearValue = year.value.trim();
    yearOutput.innerText = yearValue;

    if (yearValue === '') {
        setError(year, "Can't be blank")
    } else if (yearValue <= 0) {
        setError(year, 'Invalid year')
    } else if (yearValue < currentYear) {
        setError(year, "Card has expired")
    } else {
        setNoError(year);
    }
}

function cardHolderName() {
    const nameField = document.getElementById('name');
    const nameFieldValue = nameField.value.trim();
    const nameOnCard = document.getElementById('card-holder-name');
    if (nameFieldValue === '') {
        setError(nameField, "Can't be black")
    } else {
        setNoError(nameField);
        nameOnCard.innerText = nameFieldValue;
    }
}

function setError(element, message) {
    const inputField = element.parentElement;
    const displayError = inputField.querySelector('.error');

    displayError.innerText = message;
    inputField.classList.add('has-error');
    inputField.classList.remove('not-error');
}

function setNoError(element) {
    const inputField = element.parentElement;
    const displayError = inputField.querySelector('.error');

    displayError.innerText = '';
    inputField.classList.add('not-error');
    inputField.classList.remove('has-error');
}

window.addEventListener('DOMContentLoaded', function() {
    const form = this.document.getElementById('form')

    form.addEventListener('submit', function(event) {
        event.preventDefault();
    })

    const nameField = document.getElementById('name');
    nameField.addEventListener('keyup', cardHolderName);

    const creditCardField = document.getElementById('card-number');
    creditCardField.addEventListener('keyup', validateCreditCard);

    const cvvField = document.getElementById('cvv');
    cvvField.addEventListener('keyup', validateCVV);

    const monthField = document.getElementById('expiry-date-month');
    monthField.addEventListener('keyup', validateMonth);

    const yearField = document.getElementById('expiry-date');
    yearField.addEventListener('keyup', validateYear);
})