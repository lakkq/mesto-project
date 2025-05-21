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
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);
  const errorContainers = new Map();

  inputs.forEach((input) => {
    errorContainers.set(input, form.querySelector(`.${input.id}-error`));
  });
  const checkFormValidity = () => inputs.every((input) => input.validity.valid);

  const updateSubmitButton = () => {
    const isValid = checkFormValidity();
    submitButton.disabled = !isValid;
    submitButton.classList.toggle(config.inactiveButtonClass, !isValid);
  };

  const handleInput = (event) => {
    const input = event.target;
    validateInput(input, errorContainers.get(input), config);
    updateSubmitButton();
  };

  const handleBlur = (event) => {
    const input = event.target;
    validateInput(input, errorContainers.get(input), config);
  };

  inputs.forEach((input) => {
    input.addEventListener("input", handleInput);
    input.addEventListener("blur", handleBlur);
  });

  updateSubmitButton();
}

function validateInput(input, errorContainer, config) {
  if (input.validity.valid) {
    hideInputError(input, errorContainer, config);
  } else {
    showInputError(input, errorContainer, config);
  }
}

function showInputError(input, errorContainer, config) {
  input.classList.add(config.inputErrorClass);

  if (errorContainer) {
    errorContainer.textContent = getErrorMessage(input);
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

function getErrorMessage(input) {
  if (input.validity.valueMissing) {
    return "Это поле обязательно для заполнения";
  }

  if (input.validity.typeMismatch) {
    if (input.type === "email") return "Введите корректный email";
    if (input.type === "url") return "Введите корректный URL";
  }

  if (input.validity.tooShort) {
    return `Минимальная длина: ${input.minLength} симв.`;
  }

  if (input.validity.tooLong) {
    return `Максимальная длина: ${input.maxLength} симв.`;
  }

  if (input.validity.patternMismatch) {
    return "Неверный формат данных";
  }

  return input.validationMessage;
}

export function clearValidation(form, config, resetValues = true) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  const errorContainers = form.querySelectorAll('[class$="-error"]');

  inputs.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });

  errorContainers.forEach((container) => {
    container.textContent = "";
    container.classList.remove(config.errorClass);
    container.removeAttribute("aria-live");
  });

  submitButton.disabled = true;
  submitButton.classList.add(config.inactiveButtonClass);

  if (resetValues) {
    form.reset();
  }
}
