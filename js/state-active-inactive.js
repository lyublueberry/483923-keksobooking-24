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

const formAdItem = [
  loadingInputAvatar, btnPublish, btnReset, inputTitle, inputAddress, selectTypeHousing, inputPrice, selectTimein, selectTimeout,
  selectRoomNumber, selectCapacity, txtDescription, loadingInputImages];

function setInactiveState() {
  setBlockingFormAdd();
  setBlockingFilterForm();
}

function setBlockingFormAdd() {
  for (let i = 0; i < formAdItem.length; i++) {
    formAdItem[i].disabled = true;
  }
  setBlockingFeaturesBtnsBigs();
  setBlockingFeaturesBtns();

  formAd.classList.add('ad-form--disabled');
}

function setBlockingFilterForm() {
  const formFilter = document.querySelector('.map__filters');
  const formItem = formFilter.querySelectorAll('.map__filter');
  for (let i = 0; i < formItem.length; i++) {
    formItem[i].disabled = true;
  }
  formFilter.classList.add('ad-form--disabled');

}

function setBlockingFeaturesBtnsBigs() {
  const featureBtnBigItem = featuresBtnBig.querySelectorAll('.features__checkbox.visually-hidden');
  for (let i = 0; i < featureBtnBigItem.length; i++) {
    featureBtnBigItem[i].disabled = true;
  }
}

function setBlockingFeaturesBtns() {
  const featuresBtn = document.querySelector('.map__features');
  const featureBtnItem = featuresBtn.querySelectorAll('.map__checkbox.visually-hidden');
  for (let i = 0; i < featureBtnItem.length; i++) {
    featureBtnItem[i].disabled = true;
  }
}

function setActiveState() {
  removeBlockingFilterForm();
  removeBlockingFormAdd();
}

function removeBlockingFormAdd() {
  for (let i = 0; i < formAdItem.length; i++) {
    formAdItem[i].disabled = false;
  }
  removeBlockingFeaturesBtnsBigs();
  removeBlockingFeaturesBtns();
  formAd.classList.remove('ad-form--disabled');
}


function removeBlockingFilterForm() {
  const formFilter = document.querySelector('.map__filters');
  const formItem = formFilter.querySelectorAll('.map__filter');
  for (let i = 0; i < formItem.length; i++) {
    formItem[i].disabled = false;
  }
  formFilter.classList.remove('ad-form--disabled');
}

function removeBlockingFeaturesBtnsBigs() {
  const featureBtnBigItem = featuresBtnBig.querySelectorAll('.features__checkbox.visually-hidden');
  for (let i = 0; i < featureBtnBigItem.length; i++) {
    featureBtnBigItem[i].disabled = false;
  }
}

function removeBlockingFeaturesBtns() {
  const featuresBtn = document.querySelector('.map__features');
  const featureBtnItem = featuresBtn.querySelectorAll('.map__checkbox.visually-hidden');
  for (let i = 0; i < featureBtnItem.length; i++) {
    featureBtnItem[i].disabled = false;
  }
}

export {
  setInactiveState
};

export {
  setActiveState
};
