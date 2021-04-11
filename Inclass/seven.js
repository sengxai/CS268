const submitButton = document.getElementById('submit-button');
const numberInput = document.getElementById('number-input');

submitButton.disabled = true;

numberInput.addEventListener('input', () => {
  if (numberInput.value.match(/^\d{7}$/)) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});