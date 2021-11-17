const OfferTypes = {
  FLAT: 'Квартира',
  HOTEL: 'Отель',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец'};

const similarTemplateAdElement = document.querySelector('#card').content.querySelector('.popup'); //здесь используется поиск по # т.к. нет класса

const createCard = (card) => {
  const adElement = similarTemplateAdElement.cloneNode(true);
  const titleElement = adElement.querySelector('.popup__title');
  const addressElement = adElement.querySelector('.popup__text--address');
  const priceElement = adElement.querySelector('.popup__text--price');
  const typeElement = adElement.querySelector('.popup__type');
  const capacityElement = adElement.querySelector('.popup__text--capacity');
  const timeElement = adElement.querySelector('.popup__text--time');
  const avatarElement = adElement.querySelector('.popup__avatar');
  const descriptionElement = adElement.querySelector('.popup__description');
  const featureListElement = adElement.querySelector('.popup__features');
  const photosElement = adElement.querySelector('.popup__photos');

  card.offer.title ? titleElement.textContent = card.offer.title : titleElement.classList.add('hidden');
  card.offer.address ? addressElement.textContent = card.offer.address : addressElement.classList.add('hidden');
  card.offer.price ? priceElement.textContent = `${card.offer.price} ₽/ночь` : priceElement.classList.add('hidden');
  card.offer.type ? typeElement.textContent = OfferTypes[card.offer.type] : typeElement.classList.add('hidden');
  card.offer.description ? descriptionElement.textContent = card.offer.description : descriptionElement.classList.add('hidden');
  (card.offer.rooms && card.offer.guests) ? capacityElement.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`: capacityElement.classList.add('hidden');
  (card.offer.checkin && card.offer.checkout) ? timeElement.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`: timeElement.classList.add('hidden');
  card.author.avatar ? avatarElement.src = card.author.avatar : avatarElement.classList.add('hidden');

  if (card.offer.photos) {
    const photoItemAd = adElement.querySelector('.popup__photo').cloneNode(true);
    const photoItemConteiner = adElement.querySelector('.popup__photos');
    photoItemConteiner.innerHTML = '';
    card.offer.photos.forEach((item) => {
      const photoItem = photoItemAd.cloneNode(true);
      photoItem.src = item;
      photoItemConteiner.appendChild(photoItem);
    });
    adElement.appendChild(photoItemConteiner);
  } else {
    photosElement.classList.add('hidden');
  }

  if (card.offer.features) {
    const featuresContainer = adElement.querySelector('.popup__features');
    featuresContainer.innerHTML = '';
    const features = card.offer.features;
    features.forEach((feature) => {
      const featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature');
      featuresListItem.classList.add(`popup__feature--${feature}`);
      featuresContainer.appendChild(featuresListItem);
    });
  } else {
    featureListElement.classList.add('hidden');
  }
  return adElement;
};

export {
  createCard
};
