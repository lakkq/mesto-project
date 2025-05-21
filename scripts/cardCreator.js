export function createCard(
  name,
  link,
  likes,
  ownerId,
  cardId,
  handleImageClick,
  currentUserId,
  likeCard,
  unlikeCard,
  openDeletePopup
) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const title = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  image.src = link;
  image.alt = name;
  title.textContent = name;
  likeCount.textContent = likes.length;

  likeButton.addEventListener("click", async () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    const action = isLiked ? unlikeCard : likeCard;
    const actionName = isLiked ? "снятия" : "установки";

    try {
      const updatedCard = await action(cardId);
      likeCount.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    } catch (err) {
      console.error(`Ошибка ${actionName} лайка:`, err);
    }
  });

  likes.some((like) => like._id === currentUserId) &&
    likeButton.classList.add("card__like-button_is-active");

  deleteButton.style.display = ownerId !== currentUserId ? "none" : "block";

  if (ownerId === currentUserId) {
    deleteButton.addEventListener("click", () =>
      openDeletePopup(cardId, cardElement)
    );
  }

  image.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  return cardElement;
}
