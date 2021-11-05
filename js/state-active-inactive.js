const formAd = document.querySelector('.ad-form');
const featuresBtnBig = formAd.querySelector('.ad-form__element.ad-form__element--wide.features');
const loadingInputAvatar = formAd.querySelector('.ad-form-header__input.visually-hidden');
const btnPublish = formAd.querySelector('.ad-form__submit');
const btnReset = formAd.querySelector('.ad-form__reset');
const inputTitle = formAd.querySelector('#title');
const inputAddress = formAd.querySelector('#address');
const selectTypeHousing = formAd.querySelector('#type');
const inputPrice = formAd.querySelector('#price');
const selectTimein = formAd.querySelector('#timein');
const selectTimeout = formAd.querySelector('#timeout');
const selectRoomNumber = formAd.querySelector('#room_number');
const selectCapacity = formAd.querySelector('#capacity');
const txtDescription = formAd.querySelector('#description');
const loadingInputImages = formAd.querySelector('#images');
const featureBtnBigItems = featuresBtnBig.querySelectorAll('.features__checkbox.visually-hidden');
const featuresBtn = document.querySelector('.map__features');
const featureBtnItems = featuresBtn.querySelectorAll('.map__checkbox.visually-hidden');
const formFilter = document.querySelector('.map__filters');
const formItems = formFilter.querySelectorAll('.map__filter');

const formAdItems = [
  loadingInputAvatar, btnPublish, btnReset, inputTitle, inputAddress, selectTypeHousing, inputPrice, selectTimein, selectTimeout,
  selectRoomNumber, selectCapacity, txtDescription, loadingInputImages];

function setInactiveState() {
  setBlockingFormAdd();
  setBlockingFilterForm();
}

function setBlockingFormAdd() {
  formAdItems.forEach((formAdItem) => {
    formAdItem.disabled = true;
  });
  setBlockingFeaturesBtnsBigs();
  setBlockingFeaturesBtns();
  formAd.classList.add('ad-form--disabled');
}

function setBlockingFilterForm() {
  formItems.forEach((formItem) => {
    formItem.disabled = true;
  });
  formFilter.classList.add('ad-form--disabled');
}

function setBlockingFeaturesBtnsBigs() {
  featureBtnBigItems.forEach((featureBtnBigItem) => {
    featureBtnBigItem.disabled = true;
  });
}

function setBlockingFeaturesBtns() {
  featureBtnItems.forEach((featureBtnItem) => {
    featureBtnItem.disabled = true;
  });
}

function setActiveState() {
  removeBlockingFilterForm();
  removeBlockingFormAdd();
}

function removeBlockingFormAdd() {
  formAdItems.forEach((formAdItem) => {
    formAdItem.disabled = false;
  });
  removeBlockingFeaturesBtnsBigs();
  removeBlockingFeaturesBtns();
  formAd.classList.remove('ad-form--disabled');
}

function removeBlockingFilterForm() {
  formItems.forEach((formItem) => {
    formItem.disabled = false;
  });
  formFilter.classList.remove('ad-form--disabled');
}

function removeBlockingFeaturesBtnsBigs() {
  featureBtnBigItems.forEach((featureBtnBigItem) => {
    featureBtnBigItem.disabled = false;
  });
}

function removeBlockingFeaturesBtns() {
  featureBtnItems.forEach((featureBtnItem) => {
    featureBtnItem.disabled = false;
  });
}

export {
  setInactiveState,
  setActiveState
};
