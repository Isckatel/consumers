import Consumer from "../models/consumer.js";

export function newConsumer(arrConsum) {
    if (!$("#inputName").val() && !$("#inputNumber").val()) return;
    let name = $("#inputName").val();
    let number = Number($("#inputNumber").val());    
    let id = arrConsum.length + 1;
    let tmpObj = new Consumer(id, name, 1, number); 
    arrConsum.push(tmpObj);    
}