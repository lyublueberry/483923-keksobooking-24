import {sendData} from './api.js';

const priceAdInput = document.querySelector('#price');
const titleAdInput = document.querySelector('#title');
const capacitySelect = document.querySelector('#capacity');
const capacityOption = capacitySelect.querySelectorAll('option');
const selectRoomNumber = document.querySelector('#room_number');
const selectTypeHousing = document.querySelector('#type');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

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
  selectRoomNumber.addEventListener('change', function () {
    const valueRoomNumber = this.value;
    if (valueRoomNumber === '1') {
      capacityOption[0].style.display = 'none';
      capacityOption[1].style.display = 'none';
      capacityOption[3].style.display = 'none';
      capacityOption[2].style.display = 'inline';
    } else if (valueRoomNumber === '2') {
      capacityOption[0].style.display = 'none';
      capacityOption[3].style.display = 'none';
      capacityOption[1].style.display = 'inline';
      capacityOption[2].style.display = 'inline';
    } else if (valueRoomNumber === '3') {
      capacityOption[3].style.display = 'none';
      capacityOption[0].style.display = 'inline';
      capacityOption[1].style.display = 'inline';
      capacityOption[2].style.display = 'inline';
    } else if (valueRoomNumber === '100') {
      capacityOption[0].style.display = 'none';
      capacityOption[1].style.display = 'none';
      capacityOption[2].style.display = 'none';
      capacityOption[3].style.display = 'inline';
    }
  });
}

//соотношение жилья/цена
function onChangeTypeHousingAndPriceNight() {
  selectTypeHousing.addEventListener('change', function () {
    const valueTypeHousing = this.value;
    if (valueTypeHousing === 'bungalow') {
      priceAdInput.placeholder = '0';
      priceAdInput.min = 0;
    } else if (valueTypeHousing === 'flat') {
      priceAdInput.placeholder = '1 000';
      priceAdInput.min = 1000;
    } else if (valueTypeHousing === 'hotel') {
      priceAdInput.placeholder = '3 000';
      priceAdInput.min = 3000;
    } else if (valueTypeHousing === 'house') {
      priceAdInput.placeholder = '5 000';
      priceAdInput.min = 5000;
    } else if (valueTypeHousing === 'palace') {
      priceAdInput.placeholder = '10 000';
      priceAdInput.min = 10000;
    }
  });
}

//соотноешние заед/выезд
function onChangeTimeIn() {
  selectTimeIn.addEventListener('change', () => {
    if (selectTimeIn.value === '13:00') {
      selectTimeOut.value = '13:00';
    } else if (selectTimeIn.value === '14:00') {
      selectTimeOut.value = '14:00';
    } else if (selectTimeIn.value === '12:00') {
      selectTimeOut.value = '12:00';
    }
  });
}

function onChangeTimeOut() {
  selectTimeOut.addEventListener('change', () => {
    if (selectTimeOut.value === '13:00') {
      selectTimeIn.value = '13:00';
    } else if (selectTimeOut.value === '14:00') {
      selectTimeIn.value = '14:00';
    } else if (selectTimeOut.value === '12:00') {
      selectTimeIn.value = '12:00';
    }
  });
}

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
};
const cardForm = document.querySelector('.ad-form');

/*При успешной отправке формы или её очистке (нажатие на кнопку .ad-form__reset) страница, не перезагружаясь, переходит в состояние, когда:
все заполненные поля возвращаются в изначальное состояние;
фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;
метка адреса возвращается в исходное положение;
значение поля адреса корректируется соответственно исходному положению метки;
если на карте был показан балун, то он должен быть скрыт.*/

//кнопка сброса

const resetF = () => {
  cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    evt.target.reset();
  });
};

const clickResetForm = () => {
  const btnReset = document.querySelector('.ad-form__reset');
  btnReset.addEventListener('click', resetF);
};

//отправка формы
const setUserFormSubmit = (cb) => {
  cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => showSuccessMessage(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
    cb();
  });
};

export {
  checkFieldIsValidTitle
};

export {
  checkFieldIsValidPrice
};

export {
  onChangeCapacityAndRoomNumber
};

export {
  onChangeTypeHousingAndPriceNight
};

export {
  onChangeTimeOut
};

export {
  onChangeTimeIn
};

export {setUserFormSubmit, clickResetForm};
