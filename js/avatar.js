const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form-header__input');
const fileChooserHousing = document.querySelector('.ad-form__input');
const previewAvatar = document.querySelector('.setup-user-pic');
const previewHousing = document.querySelector('.ad-form__photo');

const setAvatarPhoto = () => {
  fileChooserAvatar.addEventListener('change', () => {
    const file = fileChooserAvatar.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });
};

const setHousingPhoto = () =>{
  fileChooserHousing.addEventListener('change', () =>{
    const file = fileChooserHousing.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });
    if (matches) {
      const housingImg = document.createElement('img');
      previewHousing.appendChild(housingImg);
      housingImg.src = URL.createObjectURL(file);
      housingImg.alt='Фотография жилья';
      housingImg.style.width = '240px';
      housingImg.style.height = '240px';
    }
  });
};

export{setHousingPhoto, setAvatarPhoto, previewAvatar, previewHousing};
