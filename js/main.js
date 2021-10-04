function getRandomInteger(min, max) {
  if ((min < 0) || (max < 0) || (max <= min)) {
    throw new Error('Неверное значение');
  } else {
    const randInt = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(randInt);
  }
}

function getRandomFloating(min, max, numberDecimal) {
  if ((min < 0) || (max < 0) || (max <= min)) {
    throw new Error('Неверное значение');
  } else {
    const randFloat = (min + Math.random() * (max - min));
    return randFloat.toFixed(numberDecimal);
  }
}

getRandomFloating(5, 18, 4);
getRandomInteger(1, 115);


const NUMBER_GENERATED_OBJECTS = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const NUMBER_DECIMAL = 5;

const author = {
  avatar: 'img/avatars/user', // + numberGenerateForImg() + '.png'
};

const offer = {
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'], //строка — одно из пяти фиксированных значений
  checkin: ['12:00', '13:00', '14:00'], //строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  checkout: ['12:00', '13:00', '14:00'], // строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'], //массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
  photos: ['https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
};

const getType = () => offer.type[getRandomInteger(0, offer['type'].length-1)];

const getPhotos = () => offer.photos.slice(0, getRandomInteger(1, offer['photos'].length - 1));

const getFeatures = () => offer.features.slice(0, getRandomInteger(1, offer['features'].length-1));

const getCheckout = () => offer.checkout[getRandomInteger(0, offer['checkout'].length-1)];

const getCheckin = () => offer.checkin[getRandomInteger(0, offer['checkin'].length-1)];

const getNumberGenerateForImg = () => {
  const numberImg = (getRandomInteger(1, 10));
  return numberImg < 10 ? 0 + numberImg.toString() : numberImg;
};

const getNumberGenerateForLat = () =>
  (getRandomFloating(MIN_LAT, MAX_LAT, NUMBER_DECIMAL));

const getNumberGenerateForLng = () =>
  (getRandomFloating(MIN_LNG, MAX_LNG, NUMBER_DECIMAL));

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
      address: `${location.lat} , ${location.lng}`,
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

const similarAdObjects = Array.from({
  length: NUMBER_GENERATED_OBJECTS }, createAdObject);

console.log(similarAdObjects);

