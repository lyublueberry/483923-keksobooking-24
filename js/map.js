import {
  createCard
} from './template-element.js';

import {
  getData
} from './api.js';

import {
  togglePageState
} from './state-form.js';

import {
  setAddress
} from './forms.js';

const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TYLE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 10;
const SIZE_MAIN_MARKER = 52;
const SIZE_MULTIPLE_MARKER = 40;
const LAT = 35.6895;
const LNG = 139.692;
const URL_MAIN_MARKER = './img/main-pin.svg';
const URL_MULTIPLE_MARKER = './img/pin.svg';
const FIX_NUMBER = 5;
const MARKER_AMOUNT = 10;
const SHOW_ALERT_TIME = 5000;
const inputAddress = document.querySelector('#address');
const filtersForm = document.querySelector('.map__filters');


//главная красная метка
const MAIN_MARKER_ICON = {
  iconUrl: URL_MAIN_MARKER,
  iconSize: [SIZE_MAIN_MARKER, SIZE_MAIN_MARKER],
  iconAnchor: [SIZE_MAIN_MARKER / 2, SIZE_MAIN_MARKER],
};

//синяя метка
const MULTIPLE_MARKER = {
  iconUrl: URL_MULTIPLE_MARKER,
  iconSize: [SIZE_MULTIPLE_MARKER, SIZE_MULTIPLE_MARKER],
  iconAnchor: [SIZE_MULTIPLE_MARKER / 2, SIZE_MULTIPLE_MARKER / 2]
};

const MainMarker = {
  lat: LAT,
  lng: LNG
};

const map = L.map('map-canvas').on('load', () => {
  togglePageState(true);
}).setView(MainMarker, ZOOM);

const mainPinIcon = L.icon(MAIN_MARKER_ICON);

const mainPinMarker = L.marker(
  MainMarker, {
    draggable: true,
    icon: mainPinIcon,
  });

mainPinMarker.addTo(map);

//двигаем по карте и получаем координаты
mainPinMarker.on('moveend', (evt) => {
  const {
    lat,
    lng
  } = evt.target.getLatLng();
  inputAddress.value = `${lat.toFixed(FIX_NUMBER)}, ${lng.toFixed(FIX_NUMBER)}`;
});

L.tileLayer(TYLE_LAYER, {
  attribution: ATTRIBUTION,
}).addTo(map);

const multipleMarker = L.layerGroup().addTo(map);

const createMultipleMarker = (cards) => {
  cards.forEach((cardsItem) => {
    const icon = L.icon(MULTIPLE_MARKER);
    const marker = L.marker({
      lat: cardsItem.location.lat,
      lng: cardsItem.location.lng,
    }, {
      icon,
    });
    marker.addTo(multipleMarker).bindPopup(createCard(cardsItem));
  });
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-error');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_ALERT_TIME);
};

//фильтруем
const checkFeatures = (card) => {
  const selectedFeatures = filtersForm.querySelectorAll('.map__filters input[name=features]:checked');
  const selectedFeaturesValues = Array.from(selectedFeatures).map((cb) => cb.value);
  return card.offer.features && card.offer.features.length === selectedFeaturesValues.length && card.offer.features.every((item, index) => item === selectedFeaturesValues[index]);
};

const checkType = (card) => {
  const selectedHousingTypeValue = document.querySelector('#housing-type').value;
  console.log(selectedHousingTypeValue);
  return selectedHousingTypeValue === 'any' || card.offer.type === selectedHousingTypeValue || !card.offer.type;
};

const checkPrice = (card) => {
  const selectedHousingPriceValue = filtersForm.querySelector('#housing-price').value;
  return ((selectedHousingPriceValue === 'middle' && (card.offer.price <= 50000 ||
      (card.offer.price >= 10000))) ||
    (selectedHousingPriceValue === 'low' && card.offer.price <= 10000) ||
    (selectedHousingPriceValue === 'high' && card.offer.price >= 50000) ||
    selectedHousingPriceValue === 'any') || !card.offer.price;
};

const checkRoom = (card) => {
  const selectedHousingRoomValue = document.querySelector('#housing-rooms').value;
  return selectedHousingRoomValue === 'any' || card.offer.rooms === selectedHousingRoomValue || !card.offer.rooms;
};

const checkGuests = (card) => {
  const selectedHousingGuestsValue = document.querySelector('#housing-guests').value;
  return selectedHousingGuestsValue === 'any' || card.offer.guests === selectedHousingGuestsValue || !card.offer.guests;
};

/*фильтр массива, для каждого элемента вызываются функции, в каждую передается текущий элемент*/

const filtersMap = (cards) => {
  filtersForm.addEventListener('change', () => {
    createMultipleMarker(cards.filter((card) => {
      checkFeatures(card) && checkType(card) && checkRoom(card)
      && checkGuests(card) && checkGuests(card) && checkPrice(card);
    }).slice(0, MARKER_AMOUNT));
  });
};

const addCardsInMarker = () => {
  setAddress(MainMarker.lat, MainMarker.lng);
  getData(
    (cards) => {
      createMultipleMarker(cards.slice(0, MARKER_AMOUNT));
      filtersMap(cards);
    },
    () => showAlert('Ошибка в получении данных с сервера!'),
  );
};

const resetMap = () => {
  mainPinMarker.setLatLng([LAT, LNG]).update();
  map.closePopup();
};

export {
  addCardsInMarker,
  resetMap,
  MainMarker
};
