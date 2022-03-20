import Consumer from "../models/consumer.js";
import { getTab } from "./table.js";

export function newConsumer(arrConsum) {
    if (!$("#inputName").val() && !$("#inputNumber").val()) return;
    let name = $("#inputName").val();
    let number = Number($("#inputNumber").val());    
    let id = arrConsum.length + 1;
    let tmpObj = new Consumer(id, name, 1, number); 
    arrConsum.push(tmpObj);    
}

export const ShowModalNewConsumer = (arrConsumers) => {
    //Показать окно создания 
    $(".newConsumer").on("click", ()=>{
        $(".modal, .win").css("display","block");
    });
    //Скрыть окно создания
    $(".buttCancel, .buttOK").on("click",()=>{
        $(".modal, .win").css("display","none");
    });
    //Добавляем созданного потребителя в массив
    $(".buttOK").on("click",()=>{
        $(".modal, .win").css("display","none");
        if (!$("#inputName").val() && !$("#inputNumber").val()) return;
        newConsumer(arrConsumers);
        $("main").html(getTab(arrConsumers));
    });
}