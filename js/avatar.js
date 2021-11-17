const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatarElement = document.querySelector('.ad-form-header__input');
const fileChooserHousingElement = document.querySelector('.ad-form__input');
const previewAvatarElement = document.querySelector('.setup-user-pic');
const previewHousingElement = document.querySelector('.setup-housing-pic');

const setAvatarPhoto = () => {
  fileChooserAvatarElement.addEventListener('change', () => {
    const file = fileChooserAvatarElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      previewAvatarElement.src = URL.createObjectURL(file);
    }
  });
};

const setHousingPhoto = () => {
  fileChooserHousingElement.addEventListener('change', () => {
    const file = fileChooserHousingElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
    if (matches) {
      previewHousingElement.src = URL.createObjectURL(file);
    }
  });
};

export {
  setHousingPhoto,
  setAvatarPhoto
};
