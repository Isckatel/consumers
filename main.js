import { objToConsumers } from './functions.js';
import { getData } from './data.js';
import { getTab} from './components/table.js';
import {newConsumer} from './components/newConsumer.js';

let arrConsumers = objToConsumers(getData());

$("main").html(getTab(arrConsumers));

$(".newConsumer").on("click", ()=>{
    $(".modal, .win").css("display","block");
});

$(".buttCancel, .buttOK").on("click",()=>{
    $(".modal, .win").css("display","none");
});

$(".buttOK").on("click",()=>{
    $(".modal, .win").css("display","none");
    if (!$("#inputName").val() && !$("#inputNumber").val()) return;
    newConsumer(arrConsumers);
    $("main").html(getTab(arrConsumers));
});

