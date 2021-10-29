function serverWork(onSuccess, onError) {
  return fetch('https://24.javascript.pages.academy/keksobooking/data', {
    method: 'GET',
    credentials: 'same-origin',
    // body: new FormData(),
  },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess('result', data);
    })
    .catch((err) => {
      onError(err);
    });
}
export {serverWork};
