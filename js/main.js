import {
  checkFieldIsValidTitle,
  checkFieldIsValidPrice,
  onChangeCapacityAndRoomNumber,
  onChangeTypeHousingAndPriceNight,
  setUserFormSubmit,
  clickResetBtnForm
} from './forms.js';

import {
  setAvatarPhoto,
  setHousingPhoto
} from './avatar.js';

import {
  addCardsInMarker
} from './map.js';

addCardsInMarker();
checkFieldIsValidTitle();
checkFieldIsValidPrice();
onChangeCapacityAndRoomNumber();
onChangeTypeHousingAndPriceNight();
setUserFormSubmit();
setAvatarPhoto();
setHousingPhoto();
clickResetBtnForm();
