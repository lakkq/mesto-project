const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
  inactiveButtonClass: "form__button_disabled",
};

export function addValidation(config = defaultConfig) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    setupFormValidation(form, config);
  });
}

function setupFormValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });

  toggleButtonState(inputs, button, config);
}

function validateInput(form, input, config) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  if (input.validity.valid) {
    hideInputError(input, errorElement, config);
  } else {
    showInputError(input, errorElement, config);
  }
}

function showInputError(input, errorContainer, config) {
  input.classList.add(config.inputErrorClass);
  console.log(errorContainer);

  if (errorContainer) {
    errorContainer.textContent = input.validationMessage;
    errorContainer.classList.add(config.errorClass);
    errorContainer.setAttribute("aria-live", "polite");
  }
}

function hideInputError(input, errorContainer, config) {
  input.classList.remove(config.inputErrorClass);

  if (errorContainer) {
    errorContainer.textContent = "";
    errorContainer.classList.remove(config.errorClass);
    errorContainer.removeAttribute("aria-live");
  }
}

export function clearValidation(form, config, resetValues = true) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.name}-error`);
    hideInputError(input, errorElement, config);
  });

  submitButton.disabled = true;
  submitButton.classList.add(config.inactiveButtonClass);

  if (resetValues) {
    form.reset();
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
