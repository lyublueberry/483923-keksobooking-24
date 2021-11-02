const offerTypes = {
  flat: 'Квартира',
  hotel: 'Отель',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'};

const similarTemplateAd = document.querySelector('#card').content.querySelector('.popup'); //здесь используется поиск по # т.к. нет класса


const createCards = (card) => {
  const adElement = similarTemplateAd.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = card.offer.title;
  adElement.querySelector('.popup__text--address').textContent = card.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = offerTypes[card.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  createPhotos(adElement, card);
  adElement.querySelector('.popup__description').textContent = card.offer.description;
  createFeatures(adElement, card);
  adElement.querySelector('.popup__avatar').src = card.author.avatar;
  return adElement;
};

function createPhotos(adElement, item) {
  const photoItemAd = adElement.querySelector('.popup__photo').cloneNode(true);
  const photoItemConteiner = adElement.querySelector('.popup__photos');
  photoItemConteiner.innerHTML = '';

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
