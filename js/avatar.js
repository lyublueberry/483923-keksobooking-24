const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form-header__input');
const fileChooserHousing = document.querySelector('.ad-form__input');
const previewAvatar = document.querySelector('.setup-user-pic');
const previewHousing = document.querySelector('.setup-housing-pic');

const setAvatarPhoto = () => {
  fileChooserAvatar.addEventListener('change', () => {
    const file = fileChooserAvatar.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });
};

const setHousingPhoto = () => {
  fileChooserHousing.addEventListener('change', () => {
    const file = fileChooserHousing.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
    if (matches) {
      previewHousing.src = URL.createObjectURL(file);
    }
  });
};

export {
  setHousingPhoto,
  setAvatarPhoto
};
