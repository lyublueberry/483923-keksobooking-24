import {createAdObjects} from './create-object.js';

const offerTypes = {
  flat: 'Квартира',
  hotel: 'Отель',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'};

const similarTemplateAd = document.querySelector('#card').content.querySelector('.popup'); //здесь используется поиск по # т.к. нет класса
const photoItemConteiner = similarTemplateAd.querySelector('.popup__photos');
const photoItemAd = similarTemplateAd.querySelector('.popup__photo');
const similarAdObjects = createAdObjects;
const similarListFragment = document.createDocumentFragment();

function createCards() {
  similarAdObjects.forEach((item) => {
    createCard(item);
  });
}

function createCard(item) {
  const placeDisplay = document.querySelector('.map__canvas');
  const adElement = similarTemplateAd.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = item.offer.title;
  adElement.querySelector('.popup__text--address').textContent = item.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = offerTypes[item.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  createPhotos(adElement, item);
  adElement.querySelector('.popup__description').textContent = item.offer.description;
  createFeatures(adElement, item);
  adElement.querySelector('.popup__photo').remove();
  adElement.querySelector('.popup__avatar').src = item.author.avatar;
  similarListFragment.appendChild(adElement);
  placeDisplay.appendChild(similarListFragment);
}


function createPhotos(adElement, item) {
  adElement.querySelector('.popup__photos').remove();
  for (let i = 0; i < item.offer.photos.length; i++) {
    const photoItem = photoItemAd.cloneNode(true);
    photoItem.src = item.offer.photos[i];
    photoItemConteiner.appendChild(photoItem);
  }
  adElement.appendChild(photoItemConteiner);
}

function createFeatures(adElement, item) {
  const featuresContainer = adElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  const features = item.offer.features;
  features.forEach((feature) => {
    const featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add(`popup__feature--${feature}`);
    featuresContainer.appendChild(featuresListItem);
  });
}

export {createCards};