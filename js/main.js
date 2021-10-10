import {createAdObject} from './create-object.js';

const NUMBER_GENERATED_OBJECTS = 10;

const similarAdObjects = Array.from({
  length: NUMBER_GENERATED_OBJECTS }, createAdObject);

console.log(similarAdObjects);
