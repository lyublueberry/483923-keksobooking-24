import {
  sendData
} from './api.js';

import {
  //MainMarker,
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
const errorSuccess = document.querySelector('#success').content;
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

const setAddress = (lat, lng) => {
  inputAddress.value = `${lat}, ${lng}`;
};

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
    if (valueOptionCapacity > selectRoomNumber.value) {
      capacitySelect.setCustomValidity('Данное значение неверно');
    } else {
      capacitySelect.setCustomValidity('');
    }
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
const clickResetBtnFormHandler = (evt) => {
  evt.preventDefault();
  cardForm.reset();
  filtersForm.reset();
  resetMap();
  photoUser.src = './img/muffin-grey.svg';
  photoHousing.src = './img/muffin-grey.svg';
  setAddress(MainMarker.lat, MainMarker.lng);
  //inputAddress.value = `${MainMarker.lat}, ${MainMarker.lng}`;
};

const clickResetBtnForm = () => {
  btnResetForm.addEventListener('click', clickResetBtnFormHandler);
};

const startupForm = () => {
  const successRemove = document.querySelector('.success');
  successRemove.remove();
  setAddress(MainMarker.lat, MainMarker.lng); //inputAddress.value = `${MainMarker.lat}, ${MainMarker.lng}`;
  photoUser.src = './img/muffin-grey.svg';
  photoHousing.src = './img/muffin-grey.svg';
  resetMap();
  cardForm.reset();
};

const savedFormState = (evt) => {
  const successError = document.querySelector('.error');
  evt.preventDefault();
  successError.remove();
};

//сообщение об успехе/ошибке отправки
const popupErrorBtnClickHandler = (evt) => {
  if (evt.type === 'click') {
    savedFormState();
  }
  document.querySelector('.error__button').removeEventListener('click', popupErrorBtnClickHandler);
};

const popupErrorMouseClickHandler = (evt) => {
  if (evt.type === 'click') {
    savedFormState();
  }
  document.removeEventListener('click', popupErrorMouseClickHandler);
};

const popupErrorKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    savedFormState();
  }
  document.removeEventListener('keydown', popupErrorKeydownHandler);

};

const showErrorMessage = () => {
  const errorModal = errorMessage.cloneNode(true);
  const btnError = errorModal.querySelector('.error__button');
  document.body.appendChild(errorModal);
  document.addEventListener('click', popupErrorMouseClickHandler);
  btnError.addEventListener('click', popupErrorBtnClickHandler);

};

const popupSuccessKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    startupForm();
  }
  document.removeEventListener('keydown', popupSuccessKeydownHandler);
};

const popupSuccessClickHandler = (evt) => {
  if (evt.type === 'click') {
    startupForm();
  }
  document.removeEventListener('click', popupSuccessClickHandler);
};

const showSuccessMessage = () => {
  const successModal = errorSuccess.cloneNode(true);
  document.body.appendChild(successModal);
  document.addEventListener('keydown', popupSuccessKeydownHandler);
  document.addEventListener('click', popupSuccessClickHandler);
  document.addEventListener('keydown', popupErrorKeydownHandler);
};

/* document.querySelector('#housing-type').addEventListener('click', (evt) => {

}); */


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

checkFieldIsValidTitle();
checkFieldIsValidPrice();
onChangeCapacityAndRoomNumber();
onChangeTypeHousingAndPriceNight();


export {
  setUserFormSubmit,
  clickResetBtnForm,
  setAddress
};
