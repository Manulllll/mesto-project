const editButton = document.querySelector(".personal-card__edit-button");
const closeButton = document.querySelector(".popup__close-icon");
const popupPersonalNameOpened = document.querySelector(".popup");
const formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector("form.popup__form input[name=name]");
let jobInput = document.querySelector(
  "form.popup__form input[name=description]"
);
const personName = document.querySelector(".personal-card__name");
const personJob = document.querySelector(".personal-card__description");

// Открытие и закрытие модального окна popup

function popupOpener(popupType, inputTitle, inputSubtitle, title, subtitle) {
  popupType.classList.add("popup_opened");
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
} // функция для открытия модального окна

function popupCloser(popupType, typeForm) {
  popupType.classList.remove("popup_opened");
  typeForm.reset();
} // функция для закрытия модального окна (при закрытии окна введенные значения удаляются)

editButton.addEventListener("click", () =>
  popupOpener(
    popupPersonalNameOpened,
    nameInput,
    jobInput,
    personName,
    personJob
  )
); //при нажатии на кнопку открывается модальное окно
closeButton.addEventListener("click", () =>
  popupCloser(popupPersonalNameOpened, formElement)
); // при нажатии на крестик окно закрывается

//Реализация редактирования информации пользователя

function formSubmitHandler(evt) {
  evt.preventDefault();

  personName.textContent = nameInput.value;
  personJob.textContent = jobInput.value;

  popupPersonalNameOpened.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);

//открытие и закрытие формы для добавления фото

const popupAddPhoto = document.querySelectorAll(".popup")[1];
const closeButtonCard = document.querySelectorAll(".popup__close-icon")[1];
const addPhotoOpenPopup = document.querySelector(".personal-card__add-button");
const formElementPhoto = document.querySelectorAll(".popup__form")[1];
let titleInput = document.querySelector(
  "form.popup__form input[name=card-name]"
);
let linkInput = document.querySelector(
  "form.popup__form input[name=card-link]"
);

function addPhotoPopupOpener(popupType) {
  popupType.classList.add("popup_opened");
}

addPhotoOpenPopup.addEventListener("click", () =>
  addPhotoPopupOpener(popupAddPhoto)
);

closeButtonCard.addEventListener("click", () =>
  popupCloser(popupAddPhoto, formElementPhoto)
);

//Автоматически подгружаемые элементы

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function renderCard(element) {
  const place = document.querySelector("#place").content;
  let copyPlace = document.importNode(place, true);
  copyPlace.querySelector(".place__name").textContent = element.name;
  copyPlace.querySelector(".place__image").src = element.link;
  copyPlace.querySelector(".place__image").alt = element.name;
  document.querySelector("#places").appendChild(copyPlace);
}

initialCards.forEach(renderCard);

// добавление карточки

function sendPhoto(evt) {
  evt.preventDefault();

  const place = document.querySelector("#place").content;
  let copyPlace = document.importNode(place, true);

  copyPlace.querySelector(".place__name").textContent = titleInput.value;
  copyPlace.querySelector(".place__image").src = linkInput.value;
  copyPlace.querySelector(".place__image").alt = titleInput.value;

  document.querySelector("#places").prepend(copyPlace);

  popupAddPhoto.classList.remove("popup_opened");

  tapLike();
  deleteCard();
  tapPhoto();
}

formElementPhoto.addEventListener("submit", sendPhoto);

function tapPhoto() {
  const photo = document.querySelector(".place__image");
  const photoPopup = document.querySelector(".opened-photo");
  const photoInPopup = document.querySelector(".opened-photo__image");
  const photoNameInPopup = document.querySelector(".opened-photo__image-name");

  photo.addEventListener("click", () => {
    photoPopup.classList.add("opened-photo_active");

    const cardName = document.querySelector(".place__name");
    const cardLink = document.querySelector(".place__image");

    photoNameInPopup.textContent = cardName.textContent;
    photoInPopup.src = cardLink.src;
  });
}

//реализация лайков

function tapLike() {
  const likeButton = document.querySelector(".place__like-button");

  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("place__like-button_active");
  });
}

const likeButton = document.querySelectorAll(".place__like-button");

likeButton.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.target.classList.toggle("place__like-button_active");
  });
});

// удаление карточки

function deleteCard() {
  const deleteButton = document.querySelector(".place__delete-button");
  deleteButton.addEventListener("click", (event) => {
    const deleteCard = event.target.closest(".place");
    deleteCard.remove();
  });
}

const deleteButton = document.querySelectorAll(".place__delete-button");

deleteButton.forEach((item) => {
  item.addEventListener("click", (event) => {
    const deleteCard = event.target.closest(".place");
    deleteCard.remove();
  });
});

const cardName = document.querySelectorAll(".place__name");
const cardLink = document.querySelectorAll(".place__image");
const photoPopup = document.querySelector(".opened-photo");
const photoInPopup = document.querySelector(".opened-photo__image");
const photoNameInPopup = document.querySelector(".opened-photo__image-name");
const closePhotoPopup = document.querySelector(".opened-photo__close-button");

cardLink.forEach((item) => {
  item.addEventListener("click", (event) => {
    photoPopup.classList.add("opened-photo_active");

    photoInPopup.src = event.target.src;
    photoNameInPopup.textContent = event.target.alt;

    closePhotoPopup.addEventListener("click", () => {
      photoPopup.classList.remove("opened-photo_active");
    });
  });
});
