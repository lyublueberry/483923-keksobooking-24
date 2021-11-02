import {
  setInactiveState
} from './state-active-inactive.js';
import {
  checkFieldIsValidTitle
} from './working-with-forms.js';
import {
  checkFieldIsValidPrice
} from './working-with-forms.js';
import {
  onChangeCapacityAndRoomNumber
} from './working-with-forms.js';
import {
  onChangeTypeHousingAndPriceNight
} from './working-with-forms.js';
import {
  onChangeTimeIn
} from './working-with-forms.js';
import {
  onChangeTimeOut
} from './working-with-forms.js';
import {
  addCardsInMarker
} from './work-with-map.js';
import {
  setUserFormSubmit,
  clickResetForm
} from './working-with-forms.js';

import {
  setActiveState
} from './state-active-inactive.js';

//import {setAvatarPhoto, setHousingPhoto} from './avatar.js';

addCardsInMarker();
setInactiveState();
checkFieldIsValidTitle();
checkFieldIsValidPrice();
onChangeCapacityAndRoomNumber();
onChangeTypeHousingAndPriceNight();
onChangeTimeIn();
onChangeTimeOut();
setUserFormSubmit();
clickResetForm();


setActiveState();


/* setAvatarPhoto();
setHousingPhoto(); */
