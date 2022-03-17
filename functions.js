import Consumer from './models/consumer.js';

export function objToConsumers(Obj) {
    let consumersObj = [];
    for(let i=0; i < Obj?.consumers.length; i++) {
       let tmpConsumer = new Consumer (...Object.values(Obj?.consumers[i]));
       if (tmpConsumer.isValid()) consumersObj.push(tmpConsumer);
    }
    return consumersObj;
}
 