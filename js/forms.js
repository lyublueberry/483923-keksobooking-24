import {
  sendData
} from './api.js';

import {
  MainMarker,
  resetMap
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
const errorSuccess = document.querySelector('#success').content;
const photoUser = document.querySelector('.setup-user-pic');
const photoHousing = document.querySelector('.setup-housing-pic');

const PriceHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000};

//валидация заголовка объявления
const checkFieldIsValidTitle = () => {
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
};

//валидация цены
const checkFieldIsValidPrice = () => {
  priceAdInput.addEventListener('invalid', () => {
    if (priceAdInput.value >= 1000000) {
      priceAdInput.setCustomValidity('Максимальное значение — 1 000 000');
    } else {
      priceAdInput.setCustomValidity('');
    }
  });
};

//соотношение кол-во комнат/мест
const onChangeCapacityAndRoomNumber = () => {
  capacitySelect.addEventListener('change', function () {
    const valueOptionCapacity = this.value;
    valueOptionCapacity > selectRoomNumber.value ? capacitySelect.setCustomValidity('Данное значение неверно') : capacitySelect.setCustomValidity('');
  });
};

//соотношение жилья/цена
const onChangeTypeHousingAndPriceNight = () => {
  selectTypeHousing.addEventListener('change', function () {
    const valueTypeHousing = this.value;
    priceAdInput.placeholder = PriceHousing[valueTypeHousing];
    priceAdInput.min = PriceHousing[valueTypeHousing];
  });
};

//кнопка сброса
const clickResetForm = () => {

  cardForm.addEventListener('reset', () => {
    setTimeout(() => {
      inputAddress.value = `${MainMarker.lat}, ${MainMarker.lng}`;
      resetMap();
      document.querySelector('.map__filters').reset();
      photoUser.setAttribute('src', './img/muffin-grey.svg');
      photoHousing.setAttribute('src', './img/muffin-grey.svg');
    }, 0);
  });
};

//сообщение об успехе/ошибке отправки

const errorMessageRemove = (evt) => {
  const successRemove = document.querySelector('.error');
  evt.preventDefault();
  if (evt.key === 'Escape') {
    successRemove.remove();
  }
  successRemove.remove();
};

const showErrorMessage = () => {
  const errorModal = errorMessage.cloneNode(true);
  const btnError = errorModal.querySelector('.error__button');
  document.body.appendChild(errorModal);
  document.addEventListener('keydown', errorMessageRemove);
  document.addEventListener('click', errorMessageRemove);
  btnError.addEventListener('click', errorMessageRemove);
};

const successMessageRemove = (evt) => {
  const successRemove = document.querySelector('.success');
  evt.preventDefault();
  if (evt.key === 'Escape') {
    successRemove.remove();
  } else {successRemove.remove();}
  inputAddress.value = `${MainMarker.lat}, ${MainMarker.lng}`;
  photoUser.setAttribute('src', './img/muffin-grey.svg');
  photoHousing.setAttribute('src', './img/muffin-grey.svg');
  resetMap();
  cardForm.reset();

};

const showSuccessMessage = () => {
  const successModal = errorSuccess.cloneNode(true);
  document.body.appendChild(successModal);
  document.addEventListener('keydown', successMessageRemove);
  document.addEventListener('click', successMessageRemove);

};

//отправка формы
const setUserFormSubmit = () => {
  cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => showSuccessMessage(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

selectTimeIn.addEventListener('click', function () {
  selectTimeOut.value = this.value;
});

selectTimeOut.addEventListener('click', function () {
  selectTimeIn.value = this.value;
});

export {
  checkFieldIsValidTitle,
  checkFieldIsValidPrice,
  onChangeCapacityAndRoomNumber,
  onChangeTypeHousingAndPriceNight,
  setUserFormSubmit,
  clickResetForm
};
