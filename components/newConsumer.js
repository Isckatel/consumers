import Consumer from "../models/consumer.js";
import { getTab } from "./table.js";
import Api from "../api/api.js";

const api = new Api();

export function newConsumer(arrConsum) {
    if (!$("#inputName").val() && !$("#inputNumber").val()) return;
    let name = $("#inputName").val();
    let number = Number($("#inputNumber").val());
    let type = Number($("#selectType").val());
    let body = {name, type, number};
    if (api.isEnabled()) {
        api.newConsumerAsync(body).then((data)=>{
            let tmpObj = new Consumer(data.id, data.name, data.type, data.number); 
            arrConsum.push(tmpObj);  
            $("main").html(getTab(arrConsum));
        });
    } else {
        let id = arrConsum.length + 1;
        let tmpObj = new Consumer(id, name, type, number); 
        arrConsum.push(tmpObj);
        $("main").html(getTab(arrConsum));
    }    
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
    });
}