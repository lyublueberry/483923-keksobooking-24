import {
  setInactiveState,
  setActiveState
} from './state-active-inactive.js';
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
setInactiveState();
checkFieldIsValidTitle();
checkFieldIsValidPrice();
onChangeCapacityAndRoomNumber();
onChangeTypeHousingAndPriceNight();
setUserFormSubmit();
clickResetForm();
setActiveState();
setAvatarPhoto();
setHousingPhoto();
