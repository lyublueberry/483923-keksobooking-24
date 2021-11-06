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

const setStateFilterForm = (state) => {
  if (state) {
    formItems.forEach((formItem) => {
      formItem.disabled = false;
    });
    formFilter.classList.remove('ad-form--disabled');
  } else {
    formItems.forEach((formItem) => {
      formItem.disabled = true;
    });
    formFilter.classList.add('ad-form--disabled');
  }
};

const setStateFeaturesBtnsBigs = (state) => {
  if (state) {
    featureBtnBigItems.forEach((featureBtnBigItem) => {
      featureBtnBigItem.disabled = false;
    });
  } else {
    featureBtnBigItems.forEach((featureBtnBigItem) => {
      featureBtnBigItem.disabled = true;
    });
  }
};

const setStateFeaturesBtns = (state) => {
  if (state) {
    featureBtnItems.forEach((featureBtnItem) => {
      featureBtnItem.disabled = false;
    });
  } else {
    featureBtnItems.forEach((featureBtnItem) => {
      featureBtnItem.disabled = true;
    });
  }
};

const setStateForm = (state) => {
  if (state) {
    formAdItems.forEach((formAdItem) => {
      formAdItem.disabled = false;
    });
    formAd.classList.remove('ad-form--disabled');
  } else {
    formAdItems.forEach((formAdItem) => {
      formAdItem.disabled = true;
    });
    formAd.classList.add('ad-form--disabled');
  }
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
