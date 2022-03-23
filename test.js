import {arrToConsumers} from "./functions.js";
import Consumer from './models/consumer.js';
import Api from "./api/api.js"; 

const dataConsumers = 
    [
       {id:0, name:'Константин Константинович Константинопольский', type: 1, number: 1234567890123},
       {id:1, name:'Иван Константинович Константинопольский', type: 1, number: 1334567890123},
    ]

const dataConsumers2 = 
  [
    {id:0, name:'Константин Константинович Константинопольский', type: 1, number: 1234567890123},
    {id:1, name:'Иван Константинович Константинопольский', type: 1, number: 1334567890123},
    {id:-4, name:'Ошибочный объект', type: 3, number: 1634567890123} 
  ]


let arrConsumers = [];

let obj1 = new Consumer(0,'Константин Константинович Константинопольский', 1 , 1234567890123);
let obj2 = new Consumer(1, 'Иван Константинович Константинопольский', 1, 1334567890123 )
arrConsumers.push(obj1);
arrConsumers.push(obj2);

QUnit.module('A. Функция обработки массива arrToConsumers', function() {
  QUnit.test('Первый тест ', function(assert) {
    assert.deepEqual(arrToConsumers(dataConsumers), arrConsumers);
  });
  QUnit.test('Второй тест', function(assert) {
    assert.deepEqual(arrToConsumers(dataConsumers2), arrConsumers);
  });
});

const api = new Api();

function fetchSquare( x ) {
  return new Promise( function ( resolve ) {
    setTimeout( function () {
      resolve( x * x );
    }, 1000 );
  });
}

QUnit.module('B. Модуль асинхронных функций', function() {
  QUnit.test('Первый тест для примера', assert => {
    return fetchSquare( 3 ).then( result => {
      assert.equal( result, 9 );
    });
  });
  QUnit.test('Тест изменения потребителя', assert => {
    return api.editConsumerAsync(obj1).then( result => {
      assert.equal( result, 9 );
    });
  });
});
