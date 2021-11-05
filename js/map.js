import {
  createCards
} from './template-element.js';

import {
  getData
} from './api.js';

const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TYLE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 10;
const SIZE_MAIN_MARKER = 52;
const ANCHOR_MAIN_MARKER = 26;
const SIZE_MULTIPLE_MARKER = 40;
const ANCHOR_MULTIPLE_MARKER = 20;
const LAT = 35.6895;
const LNG = 139.692;
const URL_MAIN_MARKER = './img/main-pin.svg';
const URL_MULTIPLE_MARKER =  './img/pin.svg';

//главная красная метка
const MAIN_MARKER_ICON = {
  iconUrl: URL_MAIN_MARKER,
  iconSize: [SIZE_MAIN_MARKER, SIZE_MAIN_MARKER],
  iconAnchor: [ANCHOR_MAIN_MARKER, SIZE_MAIN_MARKER],
};

//синяя метка
const MULTIPLE_MARKER = {
  iconUrl: URL_MULTIPLE_MARKER,
  iconSize: [SIZE_MULTIPLE_MARKER, SIZE_MULTIPLE_MARKER],
  iconAnchor: [ANCHOR_MULTIPLE_MARKER, ANCHOR_MULTIPLE_MARKER]};

const MainMarker = {
  lat: LAT,
  lng: LNG};

const inputAddress = document.querySelector('#address');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-error');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const map = L.map('map-canvas').setView(MainMarker, ZOOM);

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
    lng} = evt.target.getLatLng();
  inputAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
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
    marker.addTo(multipleMarker).bindPopup(createCards(cardsItem));
  });
};

const addCardsInMarker = () => {
  //setActiveState();
  inputAddress.value = `${MainMarker.lat}, ${MainMarker.lng}`;
  getData(
    (cards) => createMultipleMarker(cards.slice(0, 10)),
    () => showAlert('Ошибка в получении данных с сервера!'),
  );
};

const backToCenter = () => {
  map.panTo([MainMarker.lat, MainMarker.lng]);
};

export {
  addCardsInMarker,
  backToCenter,
  MainMarker
};
