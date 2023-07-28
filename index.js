function isCreditCard(creditCardNumber) {
    return creditCardNumber.match(/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/)
}

function isCVV(cvvNumber) {
    return cvvNumber.match(/^[0-9]{3,4}$/)
}

const nameField = this.document.getElementById('name');
nameField.addEventListener('onkeyup', cardHolderName);

function cardHolderName() {
    if (nameField === '') {
        setError(nameField, "Can't be black")
    }
}

function setError(element, message) {
    const inputField = element.parentElement;
    const displayError = inputField.querySelector('.error');

    displayError.innerText = message;
    inputField.classList.add('has-error');
    inputField.classList.remove('not-error');
}

window.addEventListener('DOMContentLoaded', function() {
    const form = this.document.getElementById('form')

    form.addEventListener('submit', function(event) {
        event.preventDefault();
    })
})