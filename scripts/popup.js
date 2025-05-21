const SELECTORS = {
  openedModal: '.popup_opened',
};

const KEY_CODES = {
  ESCAPE: 'Escape',
};

function handleEscClose(evt) {
  if (evt.key === KEY_CODES.ESCAPE) {
    closeModal();
  }
}

export function closeModal() {
  const openedModal = document.querySelector(SELECTORS.openedModal);
  if (!openedModal) return;
  
  openedModal.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

export function openModal(modal, onCloseCallback = null) {
  closeModal();
  
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}