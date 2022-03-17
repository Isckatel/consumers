import { objToConsumers } from './functions.js';
import { getData } from './data.js';

let cons2 = objToConsumers(getData());

console.log(cons2);
