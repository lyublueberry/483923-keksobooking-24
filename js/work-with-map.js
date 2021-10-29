import {setActiveState} from './state-active-inactive.js';

import {createCard} from './generating-template-element.js';

import {getNumberGenerateForLat} from './create-object.js';

import {getNumberGenerateForLng} from './create-object.js';

import {createAdObjects} from './create-object.js';

function setMarkerSingleAndList(){
  const inputAddress = document.querySelector('#address');

  const map = L.map('map-canvas').on('load', () => {
    setActiveState();
    inputAddress.value = '35.6895, 139.692';
  })
    .setView({
      lat: 35.6895,
      lng: 139.692,
    }, 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  //добавим свою иконку красную одиночная
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  //добавим метку
  const marker1 = L.marker({
    lat: 35.6895,
    lng: 139.692,
  }, {
    draggable: true, //можно передвинуть метку по карте
    icon: mainPinIcon,
  });

  //Добавляем метку на карту
  marker1.addTo(map);

  //событие, что пользователь закончил передвигать метку + получение объекта с новыми координатами
  marker1.on('moveend', (evt) => {
    const ppp = evt.target.getLatLng();
    const pppLat = ppp.lat.toFixed(5);
    const pppLng = ppp.lng.toFixed(5);
    inputAddress.value = `${pppLat}, ${pppLng}`;
  });


  //здесь добавляем многочисленные синие
  createAdObjects.forEach((item) => {
    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker({
      lat: getNumberGenerateForLat(),
      lng: getNumberGenerateForLng(),
    }, {
      icon,
    } );
    marker.addTo(map).bindPopup(createCard(item));
  });
}

export {setMarkerSingleAndList};
