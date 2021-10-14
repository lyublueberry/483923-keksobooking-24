import {createAdObjects} from './create-object.js';

console.log(createAdObjects);

const placeDisplay = document.querySelector('.map__canvas');

const similarTemplateAd = document.querySelector('#card').content.querySelector('.popup'); //здесь используется поиск по # т.к. нет класса

const photoItemConteiner = similarTemplateAd.querySelector('.popup__photos');

const similarAdObjects = createAdObjects;

const similarListFragment = document.createDocumentFragment();

similarAdObjects.forEach((item) => {
  const adElement = similarTemplateAd.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = item.offer.title;
  adElement.querySelector('.popup__text--address').textContent = item.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;

  switch (item.offer.type) {
    case 'flat':
      adElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      adElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;

    case 'house':
      adElement.querySelector('.popup__type').textContent = 'Дом';
      break;

    case 'palace':
      adElement.querySelector('.popup__type').textContent = 'Дворец';
      break;

    case 'hotel':
      adElement.querySelector('.popup__type').textContent = 'Отель';
      break;
  }

  adElement.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  adElement.querySelector('.popup__features').textContent = item.offer.features;
  adElement.querySelector('.popup__description').textContent = item.offer.description;


  for (let i = 0; i < item.offer.photos.length; i++) {
    const photoItem = photoItemConteiner.cloneNode(true);
    photoItem.querySelector('.popup__photo').src = item.offer.photos[i];

    adElement.appendChild(photoItem);
  }

  adElement.querySelector('.popup__avatar').src = item.author.avatar;

  similarListFragment.appendChild(adElement);
});

placeDisplay.appendChild(similarListFragment);

export {similarAdObjects};
