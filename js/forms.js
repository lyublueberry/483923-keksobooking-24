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
const btnResetForm = document.querySelector('.ad-form__reset');
const filtersForm = document.querySelector('.map__filters');

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
  inputAddress.value = `${MainMarker.lat}, ${MainMarker.lng}`;
};

const clickResetBtnForm = () => {
  btnResetForm.addEventListener('click', clickResetBtnFormHandler);
};

const startupForm = () => {
  const successRemove = document.querySelector('.success');
  successRemove.remove();
  inputAddress.value = `${MainMarker.lat}, ${MainMarker.lng}`;
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
const errorButtonClickHandler = (evt) => {
  if (evt.type === 'click') {
    savedFormState();
  }
};

const errorButtonKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    savedFormState();
  }
};

const errorMouseClickHandler = (evt) => {
  if (evt.type === 'click') {
    savedFormState();
  }
};

const showErrorMessage = () => {
  const errorModal = errorMessage.cloneNode(true);
  const btnError = errorModal.querySelector('.error__button');
  document.body.appendChild(errorModal);
  document.addEventListener('keydown', errorButtonKeydownHandler);
  document.addEventListener('click', errorMouseClickHandler);
  btnError.addEventListener('click', errorButtonClickHandler);
  btnError.removeEventListener('click', errorButtonClickHandler);
};

const successButtonKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    startupForm();
  }
};

const successButtonClickHandler = (evt) => {
  if (evt.type === 'click') {
    startupForm();
  }
};

const showSuccessMessage = () => {
  const successModal = errorSuccess.cloneNode(true);
  document.body.appendChild(successModal);
  document.addEventListener('keydown', successButtonKeydownHandler);
  document.addEventListener('click', successButtonClickHandler);
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

document.removeEventListener('keydown', successButtonKeydownHandler);
document.removeEventListener('click', successButtonClickHandler);
document.removeEventListener('keydown', errorButtonKeydownHandler);
document.removeEventListener('click', errorMouseClickHandler);

export {
  checkFieldIsValidTitle,
  checkFieldIsValidPrice,
  onChangeCapacityAndRoomNumber,
  onChangeTypeHousingAndPriceNight,
  setUserFormSubmit,
  clickResetBtnForm
};
