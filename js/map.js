import {
  createCards
} from './template-element.js';

import {
  getData
} from './api.js';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-error');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const MAIN_MARKER = {
  lat: 35.6895,
  lng: 139.692};

const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TYLE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 10;

const inputAddress = document.querySelector('#address');

//главная красная метка
const MAIN_MARKER_ICON = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

//синяя метка
const MULTIPLE_MARKER = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]};

const map = L.map('map-canvas').setView(MAIN_MARKER, ZOOM);

const mainPinIcon = L.icon(MAIN_MARKER_ICON);

const mainPinMarker = L.marker(
  MAIN_MARKER, {
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
  inputAddress.value = `${MAIN_MARKER.lat}, ${MAIN_MARKER.lng}`;
  getData(
    (cards) => createMultipleMarker(cards.slice(0, 10)),
    () => showAlert('Ошибка в получении данных с сервера!'),
  );
};

function backToCenter() {
  map.panTo([MAIN_MARKER.lat, MAIN_MARKER.lng]);
}

export {
  addCardsInMarker,
  backToCenter,
  MAIN_MARKER
};
