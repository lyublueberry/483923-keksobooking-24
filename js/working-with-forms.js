function checkFieldIsValidTitle() {
  const titleAdInput = document.querySelector('#title');

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
  const priceAdInput = document.querySelector('#price');

  priceAdInput.addEventListener('invalid', () => {
    if (priceAdInput.value >= 1000000) {
      priceAdInput.setCustomValidity('Максимальное значение — 1 000 000');
    } else {
      priceAdInput.setCustomValidity('');
    }
  });
}

function checkFieldIsValidCapacityAndRoomNumber() {
  const capacitySelect = document.querySelector('#capacity');
  const capacityOption = capacitySelect.querySelectorAll('option');
  const selectRoomNumber = document.querySelector('#room_number');

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

export {
  checkFieldIsValidTitle
};

export {
  checkFieldIsValidPrice
};

export {
  checkFieldIsValidCapacityAndRoomNumber
};
