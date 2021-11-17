const formAdElement = document.querySelector('.ad-form');
const featuresBtnBigElement = formAdElement.querySelector('.ad-form__element.ad-form__element--wide.features');
const loadingInputAvatarElement = formAdElement.querySelector('.ad-form-header__input.visually-hidden');
const btnPublishElement = formAdElement.querySelector('.ad-form__submit');
const btnResetElement = formAdElement.querySelector('.ad-form__reset');
const inputTitleElement = formAdElement.querySelector('#title');
const inputAddressElement = formAdElement.querySelector('#address');
const selectTypeHousingElement = formAdElement.querySelector('#type');
const inputPriceElement = formAdElement.querySelector('#price');
const selectTimeinElement = formAdElement.querySelector('#timein');
const selectTimeoutElement = formAdElement.querySelector('#timeout');
const selectRoomNumberElement = formAdElement.querySelector('#room_number');
const selectCapacityElement = formAdElement.querySelector('#capacity');
const txtDescriptionElement = formAdElement.querySelector('#description');
const loadingInputImagesElement = formAdElement.querySelector('#images');
const featureBtnBigItemsElement = featuresBtnBigElement.querySelectorAll('.features__checkbox.visually-hidden');
const featuresBtnElement = document.querySelector('.map__features');
const featureBtnItemsElement = featuresBtnElement.querySelectorAll('.map__checkbox.visually-hidden');
const formFilterElement = document.querySelector('.map__filters');
const formItemsElement = formFilterElement.querySelectorAll('.map__filter');

const formAdItems = [
  loadingInputAvatarElement, btnPublishElement, btnResetElement, inputTitleElement, inputAddressElement, selectTypeHousingElement, inputPriceElement, selectTimeinElement, selectTimeoutElement,
  selectRoomNumberElement, selectCapacityElement, txtDescriptionElement, loadingInputImagesElement];

const setStateFilterForm = (state) => {
  formItemsElement.forEach((formItem) => {
    formItem.disabled = !state;
  });
  formFilterElement.classList.toggle('ad-form--disabled', !state);
};

const setStateFeaturesBtnsBigs = (state) => {
  featureBtnBigItemsElement.forEach((featureBtnBigItem) => {
    featureBtnBigItem.disabled = !state;
  });
};

const setStateFeaturesBtns = (state) => {
  featureBtnItemsElement.forEach((featureBtnItem) => {
    featureBtnItem.disabled = !state;
  });
};

const setStateForm = (state) => {
  formAdItems.forEach((formAdItem) => {
    formAdItem.disabled = !state;
  });

  formAdElement.classList.toggle('ad-form--disabled', !state);
  setStateFeaturesBtnsBigs(state);
  setStateFeaturesBtns(state);
};

const togglePageState = (state) => {
  setStateFilterForm(state);
  setStateForm(state);
};

export {
  togglePageState
};
