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

const setBlockingFilterForm = () => {
  formItems.forEach((formItem) => {
    formItem.disabled = true;
  });
  formFilter.classList.add('ad-form--disabled');
};

const setBlockingFeaturesBtnsBigs = () => {
  featureBtnBigItems.forEach((featureBtnBigItem) => {
    featureBtnBigItem.disabled = true;
  });
};

const setBlockingFeaturesBtns = () => {
  featureBtnItems.forEach((featureBtnItem) => {
    featureBtnItem.disabled = true;
  });
};

const setBlockingFormAdd = () => {
  formAdItems.forEach((formAdItem) => {
    formAdItem.disabled = true;
  });
  setBlockingFeaturesBtnsBigs();
  setBlockingFeaturesBtns();
  formAd.classList.add('ad-form--disabled');
};


const removeBlockingFilterForm = () => {
  formItems.forEach((formItem) => {
    formItem.disabled = false;
  });
  formFilter.classList.remove('ad-form--disabled');
};

const removeBlockingFeaturesBtnsBigs = () => {
  featureBtnBigItems.forEach((featureBtnBigItem) => {
    featureBtnBigItem.disabled = false;
  });
};

const removeBlockingFeaturesBtns = () => {
  featureBtnItems.forEach((featureBtnItem) => {
    featureBtnItem.disabled = false;
  });
};

const removeBlockingFormAdd = ()  =>{
  formAdItems.forEach((formAdItem) => {
    formAdItem.disabled = false;
  });
  removeBlockingFeaturesBtnsBigs();
  removeBlockingFeaturesBtns();
  formAd.classList.remove('ad-form--disabled');
};

const setActiveState = () => {
  removeBlockingFilterForm();
  removeBlockingFormAdd();
};
const setInactiveState = () => {
  setBlockingFormAdd();
  setBlockingFilterForm();
};

export {
  setInactiveState,
  setActiveState
};
