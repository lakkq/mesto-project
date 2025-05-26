export function addValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    const button = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input, config);
        toggleButtonState(inputs, button, config);
      });
    });

    toggleButtonState(inputs, button, config);
  });
}

function checkInputValidity(form, input, config) {
  const errorElement = form.querySelector(`.${input.name}-error`);

  if (!input.validity.valid) {
    showInputError(input, errorElement, config);
  } else {
    hideInputError(input, errorElement, config);
  }
}

function showInputError(input, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
  }
}

function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
}

function toggleButtonState(inputs, button, config) {
  const isFormValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !isFormValid;

  if (button.disabled) {
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.classList.remove(config.inactiveButtonClass);
  }
}

export function clearValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.name}-error`);
    if (errorElement) {
      hideInputError(input, errorElement, config);
    }
  });

  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}
