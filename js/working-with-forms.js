const priceAdInput = document.querySelector('#price');
const titleAdInput = document.querySelector('#title');
const capacitySelect = document.querySelector('#capacity');
const capacityOption = capacitySelect.querySelectorAll('option');
const selectRoomNumber = document.querySelector('#room_number');
const selectTypeHousing = document.querySelector('#type');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

function checkFieldIsValidTitle() {
  titleAdInput.addEventListener('invalid', () => {
    if (titleAdInput.validityState.tooShort) {
      titleAdInput.setCustomValidity('Минимальная длина заголовка объявления 30 символов');
    } else if (titleAdInput.validityState.tooLong) {
      titleAdInput.setCustomValidity('Максимальная длина заголовка объявления 100 символов');
    } else if (titleAdInput.validityState.valueMissing) {
      titleAdInput.setCustomValidity('Обязательное текстовое поле');
    } else {
      titleAdInput.setCustomValidity('');
    }
  });
}

function checkFieldIsValidPrice() {
  priceAdInput.addEventListener('invalid', () => {
    if (priceAdInput.value >= 1000000) {
      priceAdInput.setCustomValidity('Максимальное значение — 1 000 000');
    } else {
      priceAdInput.setCustomValidity('');
    }
  });
}

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

function onChangeTimeIn() {
  selectTimeIn.addEventListener('change', () => {
    if (selectTimeIn.value === '13:00') {
      selectTimeOut.value = '13:00';
    } else if (selectTimeIn.value === '14:00'){
      selectTimeOut.value = '14:00';
    } else if (selectTimeIn.value === '12:00'){
      selectTimeOut.value = '12:00';
    }
  });
}

function onChangeTimeOut() {
  selectTimeOut.addEventListener('change', () => {
    if (selectTimeOut.value === '13:00') {
      selectTimeIn.value = '13:00';
    } else if (selectTimeOut.value === '14:00'){
      selectTimeIn.value = '14:00';
    } else if (selectTimeOut.value === '12:00'){
      selectTimeIn.value = '12:00';
    }
  });
}

export {checkFieldIsValidTitle};

export {checkFieldIsValidPrice};

export {onChangeCapacityAndRoomNumber};

export {onChangeTypeHousingAndPriceNight};

export {onChangeTimeOut};

export {onChangeTimeIn};
