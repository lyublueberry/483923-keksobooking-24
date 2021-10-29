import {getType} from './get-functions-for-create-object.js';
import {getPhotos} from './get-functions-for-create-object.js';
import {getFeatures} from './get-functions-for-create-object.js';
import {getCheckin} from './get-functions-for-create-object.js';
import {getCheckout} from './get-functions-for-create-object.js';
import {getNumberGenerateForImg} from './get-functions-for-create-object.js';
import {getNumberGenerateForLat} from './get-functions-for-create-object.js';
import {getNumberGenerateForLng} from './get-functions-for-create-object.js';
import {getRandomInteger} from './get-random-integer.js';

const NUMBER_GENERATED_OBJECTS = 5;//временно выставила данное число, т.к. не умещаются все карточки

const author = {
  avatar: 'img/avatars/user', // + numberGenerateForImg() + '.png'
};

const createAdObject = (value, index) => {
  const location = {
    lat: getNumberGenerateForLat(),
    lng: getNumberGenerateForLng(),
  };

  return {
    author: {
      avatar: `${author.avatar}${getNumberGenerateForImg()}.png`,
    },
    offer: {
      address: `${location.lat}, ${location.lng}`,
      title: `Уютная квартирка ${index + 1}`,
      price: getRandomInteger(800, 5000),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: getCheckin(),
      checkout: getCheckout(),
      description: `Замечательное жилье ${index + 1}`,
      type: getType(),
      photos: getPhotos(),
      features: getFeatures(),
    },
    location: location,
  };
};

const createAdObjects = Array.from({length: NUMBER_GENERATED_OBJECTS}, createAdObject);

export {createAdObjects};
export {getNumberGenerateForLat};
export {getNumberGenerateForLng};

