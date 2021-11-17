import {
  sendData
} from './api.js';

import {
  resetMap,
  MainMarker
} from './map.js';

const priceAdInputElement = document.querySelector('#price');
const titleAdInputElement = document.querySelector('#title');
const capacitySelectElement = document.querySelector('#capacity');
const selectRoomNumberElement = document.querySelector('#room_number');
const selectTypeHousingElement = document.querySelector('#type');
const selectTimeInElement = document.querySelector('#timein');
const selectTimeOutElement = document.querySelector('#timeout');
const cardFormElement = document.querySelector('.ad-form');
const inputAddressElement = document.querySelector('#address');
const errorMessage = document.querySelector('#error').content;
const successMessage = document.querySelector('#success').content;
const photoUserElement = document.querySelector('.setup-user-pic');
const photoHousingElement = document.querySelector('.setup-housing-pic');
const btnResetFormElement = document.querySelector('.ad-form__reset');
const filtersFormElement = document.querySelector('.map__filters');
const MAX_PRICE = 1000000;
const NAME_KEY = 'Escape';


const PriceHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000};

//первоначальный адрес
const setAddress = (lat, lng) => {
  inputAddressElement.value = `${lat}, ${lng}`;
};

//устанавливаем начальные значения
const clearForm = () => {
  resetMap();
  filtersFormElement.reset();
  cardFormElement.reset();
  photoUserElement.src = './img/muffin-grey.svg';
  photoHousingElement.src = './img/muffin-grey.svg';
  setAddress(MainMarker.lat, MainMarker.lng);
};

//убираем окно и сохраняем заполненность формы
const saveFormState = (evt) => {
  const successErrorElement = document.querySelector('.error');
  evt.preventDefault();
  successErrorElement.remove();
};

//кликнули на кнопку ОШИБКА
const clickPopupErrorBtnHandler = (evt) => {
  if (evt.type === 'click') {
    saveFormState();
  }
  document.querySelector('.error__button').removeEventListener('click', clickPopupErrorBtnHandler);
};

//кликнули в произвол обл ОШИБКА
const clickPopupErrorMouseHandler = (evt) => {
  if (evt.type === 'click') {
    document.querySelector('.success').remove();
    saveFormState();
  }
  document.removeEventListener('click', clickPopupErrorMouseHandler);
};

//нажали кнопу esc ОШИБКА
const clickPopupErrorKeydownHandler = (evt) => {
  if (evt.key === NAME_KEY) {
    document.querySelector('.success').remove();
    saveFormState();
  }
  document.removeEventListener('keydown', clickPopupErrorKeydownHandler);
};

//нажали клавишу esc УСПЕХ
const clickPopupSuccessKeydownHandler = (evt) => {
  if (evt.key === NAME_KEY) {
    document.querySelector('.success').remove();
    clearForm();
  }
  document.removeEventListener('keydown', clickPopupSuccessKeydownHandler);
};

//кликнули в произвол обл мышью УСПЕХ
const clickPopupSuccessHandler = (evt) => {
  document.querySelector('.success').remove();
  if (evt.type === 'click') {
    clearForm();
  }
  document.removeEventListener('click', clickPopupSuccessHandler);
};

//показали сообщение об успехе
const showSuccessMessage = () => {
  const successModal = successMessage.cloneNode(true);
  document.body.appendChild(successModal);
  document.addEventListener('keydown', clickPopupSuccessKeydownHandler); //esc
  document.addEventListener('click', clickPopupSuccessHandler); //произвол обл
};

//показали сообщение об ошибке
const showErrorMessage = () => {
  const errorModal = errorMessage.cloneNode(true);
  const btnError = errorModal.querySelector('.error__button');
  document.body.appendChild(errorModal);
  document.addEventListener('click', clickPopupErrorMouseHandler); //произвол обл
  btnError.addEventListener('click', clickPopupErrorBtnHandler); //по кнопке
  document.addEventListener('keydown', clickPopupErrorKeydownHandler); //esc
};

//валидация заголовка объявления
titleAdInputElement.addEventListener('invalid', () => {
  if (titleAdInputElement.validity.tooShort) {
    titleAdInputElement.setCustomValidity('Минимальная длина заголовка объявления 30 символов');
  } else if (titleAdInputElement.validity.tooLong) {
    titleAdInputElement.setCustomValidity('Максимальная длина заголовка объявления 100 символов');
  } else if (titleAdInputElement.validity.valueMissing) {
    titleAdInputElement.setCustomValidity('Обязательное текстовое поле');
  } else {
    titleAdInputElement.setCustomValidity('');
  }
});

//валидация цены
priceAdInputElement.addEventListener('invalid', () => {
  if (priceAdInputElement.value >= MAX_PRICE) {
    priceAdInputElement.setCustomValidity('Максимальное значение — 1 000 000');
  } else {
    priceAdInputElement.setCustomValidity('');
  }
});

//соотношение кол-во комнат/мест
capacitySelectElement.addEventListener('change', function () {
  const valueOptionCapacity = this.value;
  if (valueOptionCapacity > selectRoomNumberElement.value) {
    capacitySelectElement.setCustomValidity('Данное значение неверно');
  } else {
    capacitySelectElement.setCustomValidity('');
  }
});

//соотношение жилья/цена
selectTypeHousingElement.addEventListener('change', function () {
  const valueTypeHousing = this.value;
  priceAdInputElement.placeholder = PriceHousing[valueTypeHousing];
  priceAdInputElement.min = PriceHousing[valueTypeHousing];
});

//отправка формы
cardFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => showSuccessMessage(),
    () => showErrorMessage(),
    new FormData(evt.target),
  );
});

//кнопка сброса
btnResetFormElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

selectTimeInElement.addEventListener('click', function () {
  selectTimeOutElement.value = this.value;
});

selectTimeOutElement.addEventListener('click', function () {
  selectTimeInElement.value = this.value;
});

export {
  setAddress
};
