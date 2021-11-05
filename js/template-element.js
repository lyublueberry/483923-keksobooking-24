const OfferTypes = {
  FLAT: 'Квартира',
  HOTEL: 'Отель',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец'};

const similarTemplateAd = document.querySelector('#card').content.querySelector('.popup'); //здесь используется поиск по # т.к. нет класса

const createCards = (card) => {
  const adElement = similarTemplateAd.cloneNode(true);
  const title = adElement.querySelector('.popup__title');
  const address = adElement.querySelector('.popup__text--address');
  const price = adElement.querySelector('.popup__text--price');
  const type = adElement.querySelector('.popup__type');
  const capacity = adElement.querySelector('.popup__text--capacity');
  const time = adElement.querySelector('.popup__text--time');
  const avatar = adElement.querySelector('.popup__avatar');
  const description = adElement.querySelector('.popup__description');
  const featureList = adElement.querySelector('.popup__features');
  const photos = adElement.querySelector('.popup__photos');

  card.offer.title ? title.textContent = card.offer.title : title.classList.add('hidden');
  card.offer.address ? address.textContent = card.offer.address : address.classList.add('hidden');
  card.offer.price ? price.textContent = `${card.offer.price} ₽/ночь` : price.classList.add('hidden');
  card.offer.type ? type.textContent = OfferTypes[card.offer.type] : type.classList.add('hidden');
  card.offer.description ? description.textContent = card.offer.description : description.classList.add('hidden');
  (card.offer.rooms && card.offer.guests) ? capacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`: capacity.classList.add('hidden');
  (card.offer.checkin && card.offer.checkout) ? time.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`: time.classList.add('hidden');
  card.author.avatar ? avatar.src = card.author.avatar : avatar.classList.add('hidden');

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
    photos.classList.add('hidden');
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
    featureList.classList.add('hidden');
  }
  return adElement;
};

export {
  createCards
};
