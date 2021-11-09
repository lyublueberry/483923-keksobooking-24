import {
  sendData
} from './api.js';

import {
  resetMap,
  MainMarker
} from './map.js';

const priceAdInput = document.querySelector('#price');
const titleAdInput = document.querySelector('#title');
const capacitySelect = document.querySelector('#capacity');
const selectRoomNumber = document.querySelector('#room_number');
const selectTypeHousing = document.querySelector('#type');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');
const cardForm = document.querySelector('.ad-form');
const inputAddress = document.querySelector('#address');
const errorMessage = document.querySelector('#error').content;
const successMessage = document.querySelector('#success').content;
const photoUser = document.querySelector('.setup-user-pic');
const photoHousing = document.querySelector('.setup-housing-pic');
const btnResetForm = document.querySelector('.ad-form__reset');
const filtersForm = document.querySelector('.map__filters');

const PriceHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000};

//первоначальный адрес
const setAddress = (lat, lng) => {
  inputAddress.value = `${lat}, ${lng}`;
};

//устанавливаем начальные значения
const startupForm = () => {
  resetMap();
  filtersForm.reset();
  cardForm.reset();
  photoUser.src = './img/muffin-grey.svg';
  photoHousing.src = './img/muffin-grey.svg';
  setAddress(MainMarker.lat, MainMarker.lng);
};

//убираем окно и сохраняем заполненность формы
const savedFormState = (evt) => {
  const successError = document.querySelector('.error');
  evt.preventDefault();
  successError.remove();
};

//кликнули на кнопку ОШИБКА
const popupErrorBtnClickHandler = (evt) => {
  if (evt.type === 'click') {
    savedFormState();
  }
  document.querySelector('.error__button').removeEventListener('click', popupErrorBtnClickHandler);
};

//кликнули в произвол обл ОШИБКА
const popupErrorMouseClickHandler = (evt) => {
  if (evt.type === 'click') {
    document.querySelector('.success').remove();
    savedFormState();
  }
  document.removeEventListener('click', popupErrorMouseClickHandler);
};

//нажали кнопу esc ОШИБКА
const popupErrorKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('.success').remove();
    savedFormState();
  }
  document.removeEventListener('keydown', popupErrorKeydownHandler);
};

//нажали клавишу esc УСПЕХ
const popupSuccessKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('.success').remove();
    startupForm();
  }
  document.removeEventListener('keydown', popupSuccessKeydownHandler);
};

//кликнули в произвол обл мышью УСПЕХ
const popupSuccessClickHandler = (evt) => {
  document.querySelector('.success').remove();
  if (evt.type === 'click') {
    startupForm();
  }
  document.removeEventListener('click', popupSuccessClickHandler);
};

//показали сообщение об успехе
const showSuccessMessage = () => {
  const successModal = successMessage.cloneNode(true);
  document.body.appendChild(successModal);
  document.addEventListener('keydown', popupSuccessKeydownHandler); //esc
  document.addEventListener('click', popupSuccessClickHandler); //произвол обл
};

//показали сообщение об ошибке
const showErrorMessage = () => {
  const errorModal = errorMessage.cloneNode(true);
  const btnError = errorModal.querySelector('.error__button');
  document.body.appendChild(errorModal);
  document.addEventListener('click', popupErrorMouseClickHandler); //произвол обл
  btnError.addEventListener('click', popupErrorBtnClickHandler); //по кнопке
  document.addEventListener('keydown', popupErrorKeydownHandler); //esc
};

/* document.querySelector('#housing-type').addEventListener('click', (evt) => {

}); */

//валидация заголовка объявления
titleAdInput.addEventListener('invalid', () => {
  if (titleAdInput.validity.tooShort) {
    titleAdInput.setCustomValidity('Минимальная длина заголовка объявления 30 символов');
  } else if (titleAdInput.validity.tooLong) {
    titleAdInput.setCustomValidity('Максимальная длина заголовка объявления 100 символов');
  } else if (titleAdInput.validity.valueMissing) {
    titleAdInput.setCustomValidity('Обязательное текстовое поле');
  } else {
    titleAdInput.setCustomValidity('');
  }
});

//валидация цены
priceAdInput.addEventListener('invalid', () => {
  if (priceAdInput.value >= 1000000) {
    priceAdInput.setCustomValidity('Максимальное значение — 1 000 000');
  } else {
    priceAdInput.setCustomValidity('');
  }
});

//соотношение кол-во комнат/мест
capacitySelect.addEventListener('change', function () {
  const valueOptionCapacity = this.value;
  if (valueOptionCapacity > selectRoomNumber.value) {
    capacitySelect.setCustomValidity('Данное значение неверно');
  } else {
    capacitySelect.setCustomValidity('');
  }
});

//соотношение жилья/цена
selectTypeHousing.addEventListener('change', function () {
  const valueTypeHousing = this.value;
  priceAdInput.placeholder = PriceHousing[valueTypeHousing];
  priceAdInput.min = PriceHousing[valueTypeHousing];
});

//отправка формы
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => showSuccessMessage(),
    () => showErrorMessage(),
    new FormData(evt.target),
  );
});

//кнопка сброса
btnResetForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  startupForm();
});

selectTimeIn.addEventListener('click', function () {
  selectTimeOut.value = this.value;
});

selectTimeOut.addEventListener('click', function () {
  selectTimeIn.value = this.value;
});

export {
  setAddress
};
