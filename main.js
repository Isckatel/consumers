import { objToConsumers } from './functions.js';
import { getData } from './data.js';
import { getTab, dblclickInput, focusoutInput} from './components/table.js';
import {newConsumer} from './components/newConsumer.js';

let arrConsumers = objToConsumers(getData());

$("main").html(getTab(arrConsumers));
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

dblclickInput();//Отображем поле ввода для редактирования элемента в таблице
focusoutInput();//Применение изменений после ввода в таблице
