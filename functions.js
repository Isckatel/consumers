import Consumer from './models/consumer.js';

export function arrToConsumers(arr) {
    let consumers = [];
    for(let i=0; i < arr.length; i++) {
       let tmpConsumer = new Consumer (...Object.values(arr[i]));
       if (tmpConsumer.isValid()) consumers.push(tmpConsumer);
    }
    return consumers;
}