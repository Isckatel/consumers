const dataConsumers = {
    consumers:[
       {id:0, name:'Константин Константинович Константинопольский', type: 1, number: 1234567890123},
       {id:1, name:'Иван Константинович Константинопольский', type: 1, number: 1334567890123},
       {id:2, name:'ООО "Константинопольск"', type: 2, number: 1434567890123},
       {id:3, name:'Сергей Константинович Константинопольский', type: 1, number: 1534567890123},
       {id:4, name:'ООО "Конструкция"', type: 2, number: 1634567890123},
       {id:-4, name:'Ошибочный объект', type: 3, number: 1634567890123}
 
    ]
};

export const getData = () => dataConsumers;