import {
  createCards
} from './generating-template-element.js';

import {
  getData
} from './api.js';

import {setActiveState} from './state-active-inactive.js';


const MAIN_MARKER = {
  lat: 35.6895,
  lng: 139.692 };

const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TYLE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

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
  iconAnchor: [20, 40] };

const map = L.map('map-canvas').setView(MAIN_MARKER, 10);

const mainPinIcon = L.icon(MAIN_MARKER_ICON);

const mainPinMarker = L.marker(
  MAIN_MARKER, {
    draggable: true,
    icon: mainPinIcon,
  });

mainPinMarker.addTo(map);

//двигаем по карте и получаем координаты
mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  inputAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

L.tileLayer(TYLE_LAYER, {
  attribution: ATTRIBUTION,
}).addTo(map);

const multipleMarker = L.layerGroup().addTo(map);

const createMultipleMarker = (cards) => {
  cards.forEach((item) => {
    const icon = L.icon(MULTIPLE_MARKER);
    const marker = L.marker({
      lat:item.offer.lat,
      lng:item.offer.lng,
    },
    {
      icon,
    });
    marker.addTo(multipleMarker).bindPopup(createCards(item));
  });
};

const addCardsInMarker = () => {
  setActiveState();
  inputAddress.value = `${MAIN_MARKER.lat}, ${MAIN_MARKER.lng}`;
  getData(
    (item) => createMultipleMarker(item.slice(0, 10)),
    () => console.log('Ошибка в получении данных с сервера!'),
  );
};

export {addCardsInMarker};
