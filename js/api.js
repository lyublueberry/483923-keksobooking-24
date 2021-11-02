const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error('Ошибка в получении данных с сервера');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((fail) => {
      onFail(fail);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
