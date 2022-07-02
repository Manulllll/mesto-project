//массив для подгрузки карт

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

// попапы
const profilePopup = document.querySelector(".profile-popup");
const cardPopup = document.querySelector(".card-popup");
const placePopup = document.querySelector(".place-popup");

// кнопки для открытия попапов

const editButton = document.querySelector(".personal-card__edit-button");
const addButton = document.querySelector(".personal-card__add-button");

// кнопка закрытия попапов

const closeButtons = document.querySelectorAll(".popup__close-icon");

//кнопка для закрытия попапа для добавления карты

const closePlacePopup = cardPopup.querySelector('.popup__close-icon');

// поля ввода для личной информации

const nameInput = document.querySelector("form.popup__form input[name=name]");
const jobInput = document.querySelector(
  "form.popup__form input[name=description]"
);

//зоны отображения личной информации на странице

const personalName = document.querySelector(".personal-card__name");
const personalJob = document.querySelector(".personal-card__description");

//кнопки submit

const submitPersonalInformation = profilePopup.querySelector(".popup__button");
const submitNewCard = cardPopup.querySelector(".popup__button");

//формы ввода данных для создания новых карт

const addNewCardForm = cardPopup.querySelector('.popup__form');
const inputPlaceName = document.querySelector(
  "form.popup__form input[name=card-name]"
);
const inputPlaceLink = document.querySelector(
  "form.popup__form input[name=card-link]"
);

// шаблон и контейнер для карт

const placesContainer = document.querySelector("#places"); //куда вставлять
const placeTemplate = document.querySelector("#place").content; //содержимое шаблона

//попап полноэкранного режима просмотра фото
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');

// Отображение заполненной информации для попапа с личной информацией

function showPersonalDataInInput() {
  nameInput.value = personalName.textContent;
  jobInput.value = personalJob.textContent;
}

//Функция для открытия попапа

function openPopup(popupType) {
  popupType.classList.add("popup_opened");
}

//Функция для закрытия попапа

function closePopup(popupType) {
  popupType.classList.remove("popup_opened");
}

//Закрытие попапов по клику

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
      });
});

// Открытие попапов по клику

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
  showPersonalDataInInput();
});

addButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

// Редактирование информации пользователя

function formSubmitPersonalInformation(evt) {
  evt.preventDefault();

  personalName.textContent = nameInput.value;
  personalJob.textContent = jobInput.value;

  profilePopup.classList.remove("popup_opened");
}

submitPersonalInformation.addEventListener(
  "click",
  formSubmitPersonalInformation
);

// Функция для создания карточек из массива или из формы

function createNewCard(nameCard, linkCard) {
  const cardElement = placeTemplate.querySelector(".place").cloneNode(true); //копируем div с классом place
  const cardImage = cardElement.querySelector(".place__image"); //достаем ссылку из блока div
  const cardName = cardElement.querySelector(".place__name"); // достаем name из блока div

  cardName.textContent = nameCard; //меняем имя карточки
  cardImage.alt = nameCard; //меняем alt фото
  cardImage.src = linkCard; //меняем ссылку фото

  //реализация лайков
  const likeButton = cardElement.querySelector(".place__like-button");
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("place__like-button_active");
  });

  //реализация удаления

  const deleteButton = cardElement.querySelector(".place__delete-button");
  deleteButton.addEventListener("click", (event) => {
    const deleteCard = event.target.closest(".place");
    deleteCard.remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(placePopup);

    popupImageName.textContent = nameCard;
    popupImage.src = linkCard;
    popupImage.alt = nameCard;
  })

  return cardElement; //возвращаем результат функции
}

//функция для отображения новых карт на странице
function showNewCard(nameCard, linkCard) {
  const item = createNewCard(nameCard, linkCard); //кладем результат функции в переменную
  placesContainer.prepend(item); //вставляем готовую карту вперед массива
}

//функция для отображения карты из формы

function addNewCard() {
  showNewCard(inputPlaceName.value, inputPlaceLink.value); //выполняем функцию рендера карты для элемента из формы

  cardPopup.classList.remove("popup_opened");
}

//рендер карт из массива

initialCards.forEach(function (card) {
  showNewCard(card.name, card.link); //выполняем функцию рендера карт для каждого элемента массива
});

//рендер карт из формы

submitNewCard.addEventListener("click", (event) => {
  event.preventDefault();
  addNewCard();
  resetPlacePopup();
});

//сброс данных при закрытии формы добавления карты

closePlacePopup.addEventListener('click', () => {
  resetPlacePopup();
})

function resetPlacePopup () {
  addNewCardForm.reset();
}
