import {createCards} from './generating-template-element.js';
import {setInactiveState} from './state-active-inactive.js';
import {setActiveState} from './state-active-inactive.js';
import {checkFieldIsValidTitle} from './working-with-forms.js';
import {checkFieldIsValidPrice} from './working-with-forms.js';
import {onChangeCapacityAndRoomNumber} from './working-with-forms.js';
import {onChangeTypeHousingAndPriceNight} from './working-with-forms.js';
import {onChangeTimeIn} from './working-with-forms.js';
import {onChangeTimeOut} from './working-with-forms.js';

createCards();
setInactiveState();
setActiveState();
checkFieldIsValidTitle();
checkFieldIsValidPrice();
onChangeCapacityAndRoomNumber();
onChangeTypeHousingAndPriceNight();
onChangeTimeIn();
onChangeTimeOut();
