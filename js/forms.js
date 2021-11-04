import {
  sendData
} from './api.js';

import {refresh, MAIN_MARKER} from './map.js';

const priceAdInput = document.querySelector('#price');
const titleAdInput = document.querySelector('#title');
const capacitySelect = document.querySelector('#capacity');
const selectRoomNumber = document.querySelector('#room_number');
const selectTypeHousing = document.querySelector('#type');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');
const cardForm = document.querySelector('.ad-form');
const btnResetForm = document.querySelector('.ad-form__reset');

const priceHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000};

//валидация заголовка объявления
function checkFieldIsValidTitle() {
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
}

//валидация цены
function checkFieldIsValidPrice() {
  priceAdInput.addEventListener('invalid', () => {
    if (priceAdInput.value >= 1000000) {
      priceAdInput.setCustomValidity('Максимальное значение — 1 000 000');
    } else {
      priceAdInput.setCustomValidity('');
    }
  });
}

//соотношение кол-во комнат/мест
function onChangeCapacityAndRoomNumber() {
  capacitySelect.addEventListener('change', function () {
    const valueOptionCapacity = this.value;
    valueOptionCapacity > selectRoomNumber.value ? capacitySelect.setCustomValidity('Данное значение неверно') : capacitySelect.setCustomValidity('');
  });
}

//соотношение жилья/цена
function onChangeTypeHousingAndPriceNight() {
  selectTypeHousing.addEventListener('change', function () {
    const valueTypeHousing = this.value;
    priceAdInput.placeholder = priceHousing[valueTypeHousing];
    priceAdInput.min = priceHousing[valueTypeHousing];
  });
}

/*При успешной отправке формы или её очистке (нажатие на кнопку .ad-form__reset) страница, не перезагружаясь, переходит в состояние, когда:
все заполненные поля возвращаются в изначальное состояние;
фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;
метка адреса возвращается в исходное положение;
значение поля адреса корректируется соответственно исходному положению метки;
если на карте был показан балун, то он должен быть скрыт.*/

//кнопка сброса

/* const resetF = () => {
  cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    evt.target.reset();
  });
}; */

const clickResetForm = () => {
  btnResetForm.addEventListener('click', () => {
    refresh();
    const inputAddress = document.querySelector('#address');
    console.log(inputAddress);
    inputAddress.value = `${MAIN_MARKER.lat}, ${MAIN_MARKER.lng}`;
    console.log(inputAddress.value);
  });
};

//сообщение об успехе/ошибке отправки
const errorMessage = document.querySelector('#error').content;

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

const errorSuccess = document.querySelector('#success').content;

const successMessageRemove = (evt) => {
  const successRemove = document.querySelector('.success');
  evt.preventDefault();
  if (evt.key === 'Escape') {
    successRemove.remove();
  }
  successRemove.remove();
};

const showSuccessMessage = () => {
  const successModal = errorSuccess.cloneNode(true);
  document.body.appendChild(successModal);
  document.addEventListener('keydown', successMessageRemove);
  document.addEventListener('click', successMessageRemove);
  clickResetForm();
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

selectTimeIn.onclick = function () {
  selectTimeOut.value = this.value;
};
selectTimeOut.onclick = function () {
  selectTimeIn.value = this.value;
};


export {
  checkFieldIsValidTitle,
  checkFieldIsValidPrice,
  onChangeCapacityAndRoomNumber,
  onChangeTypeHousingAndPriceNight,
  setUserFormSubmit,
  clickResetForm
};
