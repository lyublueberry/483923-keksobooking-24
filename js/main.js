import {setInactiveState} from './state-active-inactive.js';

import {serverWork} from './work-with-server.js';

import {checkFieldIsValidTitle} from './working-with-forms.js';

import {checkFieldIsValidPrice} from './working-with-forms.js';

import {onChangeCapacityAndRoomNumber} from './working-with-forms.js';

import {onChangeTypeHousingAndPriceNight} from './working-with-forms.js';

import {onChangeTimeOut} from './working-with-forms.js';

import {onChangeTimeIn} from './working-with-forms.js';

import {setMarkerSingleAndList} from './work-with-map.js';

serverWork(console.log, console.error);
onChangeCapacityAndRoomNumber();
onChangeTypeHousingAndPriceNight();
onChangeTimeOut();
onChangeTimeIn();
setInactiveState();
checkFieldIsValidTitle();
checkFieldIsValidPrice();

setMarkerSingleAndList();

