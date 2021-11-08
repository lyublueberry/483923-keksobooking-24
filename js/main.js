import {
  checkFieldIsValidTitle,
  checkFieldIsValidPrice,
  onChangeCapacityAndRoomNumber,
  onChangeTypeHousingAndPriceNight,
  setUserFormSubmit,
  clickResetForm
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
clickResetForm();
