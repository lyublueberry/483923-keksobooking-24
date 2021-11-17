import {
  debounce
} from './utils/debounce.js';

import {
  createMultipleMarker,
  MARKER_AMOUNT
} from './map.js';

const filtersFormElement = document.querySelector('.map__filters');
const housingGuestsElement = filtersFormElement.querySelector('#housing-guests');
const housingTypeElement = filtersFormElement.querySelector('#housing-type');
const housingRoomElement = filtersFormElement.querySelector('#housing-rooms');
const housingPriceElement = filtersFormElement.querySelector('#housing-price');
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;

//фильтруем
const checkFeatures = (card) => {
  const selectedFeatures = filtersFormElement.querySelectorAll('input[name=features]:checked');
  const selectedFeaturesValues = Array.from(selectedFeatures).map((cb) => cb.value).sort();
  return !selectedFeaturesValues.length || !!card.offer.features && selectedFeaturesValues.every((item) => card.offer.features.includes(item));
};

const checkType = (card) => {
  const selectedHousingTypeValue = housingTypeElement.value;
  return selectedHousingTypeValue === 'any' || card.offer.type === selectedHousingTypeValue || !card.offer.type;
};

const checkPrice = (card) => {
  const selectedHousingPriceValue = housingPriceElement.value;
  return ((selectedHousingPriceValue === 'middle' && (card.offer.price <= PRICE_HIGH ||
      (card.offer.price >= PRICE_LOW))) ||
    (selectedHousingPriceValue === 'low' && card.offer.price <= PRICE_LOW) ||
    (selectedHousingPriceValue === 'high' && card.offer.price >= PRICE_HIGH) ||
    selectedHousingPriceValue === 'any') || !card.offer.price;
};

const checkRoom = (card) => {
  const selectedHousingRoomValue = housingRoomElement.value;
  return selectedHousingRoomValue === 'any' || String(card.offer.rooms) === selectedHousingRoomValue || !card.offer.rooms;
};

const checkGuests = (card) => {
  const selectedHousingGuestsValue = housingGuestsElement.value;
  return selectedHousingGuestsValue === 'any' || String(card.offer.guests) === selectedHousingGuestsValue || !card.offer.guests;
};

/*фильтр массива, для каждого элемента вызываются функции, в каждую передается текущий элемент*/

const filtersMap = (cards) => {
  filtersFormElement.addEventListener('change', debounce(() => {
    createMultipleMarker(cards.filter((card) => checkFeatures(card) && checkType(card) && checkRoom(card) && checkGuests(card) && checkPrice(card)).slice(0, MARKER_AMOUNT));
  }));
};

export {
  filtersMap
};
