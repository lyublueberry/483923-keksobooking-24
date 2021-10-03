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

/****************************************** */

const NUMBER_GENERATED_OBJECTS = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const NUMBER_DECIMAL = 5;

const author = {
  avatar: 'img/avatars/user', // + numberGenerateForImg() + '.png'
};

const locationN = {
  lat: 0.0, //от 35.65000 до 35.70000.
  lng: 0.0, //от 139.70000 до 139.80000;
};

const offer = {
  title: '',
  address: [locationN.lat, locationN.lng],
  price: 0, //число — стоимость. Случайное целое положительное число.
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'], //строка — одно из пяти фиксированных значений
  rooms: 0, //число — количество комнат. Случайное целое положительное число.
  guests: 0, // число — количество гостей, которое можно разместить. Случайное целое положительное число.
  checkin: ['12:00', '13:00', '14:00'], //строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  checkout: ['12:00', '13:00', '14:00'], // строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'], //массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
  description: '', //строка — описание помещения. Придумайте самостоятельно.
  photos: ['https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg' ],
};

const getType = () => {
  let type;
  for (const key in offer) {
    if (key === 'type') {
      return type = (offer[key][getRandomInteger(0, 4)]);
    }
  }
};

const getPhotos = () => {
  let photos;
  for (const key in offer) {
    if (key === 'photos') {
      return photos = (offer[key][getRandomInteger(0, 2)]);
    }
  }
};

const getFeatures = () => {
  let features;
  for (const key in offer) {
    if (key === 'features') {
      return features = (offer[key][getRandomInteger(0, 5)]);
    }
  }
};

const getCheckout = () => {
  let checkout;
  for (const key in offer) {
    if (key === 'checkout') {
      return checkout = (offer[key][getRandomInteger(0, 2)]);
    }
  }
};

const getCheckin = () => {
  let checkin;
  for (const key in offer) {
    if (key === 'checkin') {
      return checkin = (offer[key][getRandomInteger(0, 2)]);
    }
  }
};

const getNumberGenerateForImg = () => {
  let numberImg = (getRandomInteger(1, 10)).toString();
  if (numberImg < 10) {
    return numberImg = 0 + numberImg;
  }
  return numberImg;
};

const getNumberGenerateForLat = () => {
  return locationN.lat = (getRandomFloating(MIN_LAT, MAX_LAT, NUMBER_DECIMAL));
};

const getNumberGenerateForLng = () => {
  return locationN.lng = (getRandomFloating(MIN_LNG, MAX_LNG, NUMBER_DECIMAL));
};

const createAdObject = () => {
  return {
    address: getNumberGenerateForLat() + ', ' + getNumberGenerateForLng(),
    title: 'Уютная квартирка',
    avatar: author.avatar + getNumberGenerateForImg() + '.png',
    price: getRandomInteger(800, 5000),
    rooms: getRandomInteger(1, 5),
    guests: getRandomInteger(1, 10),
    checkin: getCheckin(),
    checkout: getCheckout(),
    description: 'Замечательное жилье',
    type: getType(),
    photos: getPhotos(),
    features: getFeatures(),
  };

};


const similarAdObjects = Array.from({
  length: NUMBER_GENERATED_OBJECTS}, createAdObject);

console.log(similarAdObjects);
