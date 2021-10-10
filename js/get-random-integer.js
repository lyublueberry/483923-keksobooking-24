function getRandomInteger(min, max) {
  if ((min < 0) || (max < 0) || (max <= min)) {
    throw new Error('Неверное значение');
  } else {
    const randInt = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(randInt);
  }
}


export {getRandomInteger};
