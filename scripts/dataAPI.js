const apiInfo = {
  href: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "d4313faf-a377-41ac-9148-9832d65f88be",
    "Content-Type": "application/json",
  },
};

function getDataAPI(method = "", href = "", send = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, href);

    Object.entries(apiInfo.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (error) {
          reject(new Error("Что-то не так с JSON.."));
        }
      } else {
        reject(new Error(`Запрос вернул ошибку ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Проблемы с сетью"));
    };
    xhr.send(send);
  });
}

export const getUserInfo = () => {
  return getDataAPI("GET", `${apiInfo.href}/users/me`);
};

export const changeAvatar = (avatarUrl) => {
  return getDataAPI(
    "PATCH",
    `${apiInfo.href}/users/me/avatar`,
    JSON.stringify({ avatar: avatarUrl })
  );
};

export const updateProfile = (name, about) => {
  return getDataAPI(
    "PATCH",
    `${apiInfo.href}/users/me`,
    JSON.stringify({ name, about })
  );
};

export const getCardsInfo = () => {
  return getDataAPI("GET", `${apiInfo.href}/cards`);
};

export const addCard = (name, link) => {
  return getDataAPI(
    "POST",
    `${apiInfo.href}/cards`,
    JSON.stringify({ name, link })
  );
};

export const deleteCard = (cardId) => {
  return getDataAPI("DELETE", `${apiInfo.href}/cards/${cardId}`);
};

export const likeCard = (cardId) => {
  return getDataAPI("PUT", `${apiInfo.href}/cards/likes/${cardId}`);
};

export const unlikeCard = (cardId) => {
  return getDataAPI("DELETE", `${apiInfo.href}/cards/likes/${cardId}`);
};
