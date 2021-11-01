import {createCards} from './generating-template-element.js';
import {setInactiveState} from './state-active-inactive.js';
import {checkFieldIsValidTitle} from './working-with-forms.js';
import {checkFieldIsValidPrice} from './working-with-forms.js';
import {onChangeCapacityAndRoomNumber} from './working-with-forms.js';
import {onChangeTypeHousingAndPriceNight} from './working-with-forms.js';
import {onChangeTimeIn} from './working-with-forms.js';
import {onChangeTimeOut} from './working-with-forms.js';
//import {serverWork} from './work-with-server.js';
import {addCardsInMarker} from './work-with-map.js';
//import {publishAd} from './working-with-forms.js';

import {setUserFormSubmit, clickResetForm} from './working-with-forms.js';


addCardsInMarker();
createCards();
setInactiveState();
checkFieldIsValidTitle();
checkFieldIsValidPrice();
onChangeCapacityAndRoomNumber();
onChangeTypeHousingAndPriceNight();
onChangeTimeIn();
onChangeTimeOut();
setUserFormSubmit();
clickResetForm();
