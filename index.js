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
    const creditCardValue = creditCard.value.trim().replace(/\s/g, '');

    let newCreditCard = '';

    for (let i = 0; i < creditCardValue.length; i++) {
        // adding space if modulus 4 is 0
        if (i % 4 === 0 && i > 0) {
            newCreditCard = newCreditCard.concat(' ');
        }
        newCreditCard = newCreditCard.concat(creditCardValue[i]);
    }
    
    creditCard.value = newCreditCard;
    creditCardDet.innerText = newCreditCard;

    if (creditCard.value === '') {
        setError(creditCard, 'Card Number cannot be blank')
        return false;
    } else if (!isCreditCard(creditCardValue)) {
        setError(creditCard, 'Wrong format, numbers only')
        return false;
    } else {
        setNoError(creditCard)
        return true;
    }
}

function validateCVV() {
    const cvv = document.getElementById('cvv');
    const cvvOutput = document.getElementById('card-cvv');
    const cvvValue = cvv.value.trim();

    cvvOutput.innerText = cvvValue;
    
    if (cvv.value === '') {
        setError(cvv, "Can't be blank")
        return false;
    } else if(!isCVV(cvvValue)) {
        setError(cvv, 'Wrong format')
        return false;
    } else {
        setNoError(cvv)
        return true;
    }
}

function validateMonth() {
    const month = document.getElementById('expiry-date-month');
    const monthOutput = document.getElementById('month-output');

    const monthValue = month.value.trim();
    monthOutput.innerText = monthValue

    if (monthValue === '') {
        setError(month, 'Can\'t be blank');
        return false;
    } else if (monthValue <= 0 || monthValue > 12) {
        setError(month, "Invalid month");
        return false;
    } else {
        setNoError(month);
        return true;
    }
}

function validateYear() {
    const year = document.getElementById('expiry-date');
    const yearOutput = document.getElementById('year-output');
    const currentYear = new Date().getFullYear().toString().slice(2,4);

    const yearValue = year.value.trim();
    yearOutput.innerText = yearValue;

    if (yearValue === '') {
        setError(year, "Can't be blank")
        return false;
    } else if (parseInt(yearValue) <= 0) {
        setError(year, 'Invalid year')
        return false;
    } else if (parseInt(yearValue) < parseInt(currentYear)) {
        setError(year, "Card has expired")
        return false;
    } else {
        setNoError(year);
        return true;
    }
}

function cardHolderName() {
    const nameField = document.getElementById('name');
    const nameFieldValue = nameField.value.trim();
    const nameOnCard = document.getElementById('card-holder-name');
    if (nameFieldValue === '') {
        setError(nameField, "Can't be blank")
        return false;
    } else {
        setNoError(nameField);
        nameOnCard.innerText = nameFieldValue;
        return true;
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
    const inputs = this.document.getElementById('inputs');
    const success = this.document.getElementById('success')

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // validate each field 
        
        const isNameValid = cardHolderName();
        const isCreditCardValid = validateCreditCard();
        const isCVVValid = validateCVV();
        const isMonthFieldValid = validateMonth();
        const isYearValid = validateYear();
        
        if (isNameValid && isCreditCardValid && isCVVValid && isMonthFieldValid && isYearValid) {
            inputs.classList.add('hidden');
            success.classList.add('visible');
            // form.submit();
        }
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