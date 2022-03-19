import { objToConsumers } from './functions.js';
import { getData } from './data.js';
import { getTab} from './components/table.js';
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
//Отображем поле ввода для редактирования элемента
$(document).on("dblclick", ".nameColumn", (event)=>{
    let inEdit = $('<input/>');
    let toEdit = $(event.target);
    toEdit.html( inEdit.val( toEdit.text() ) );
    inEdit.focus().select();
});
//Применение изменений
$(document).on('focusout keypress', '.nameColumn input', function(event) {
    if( event.which === 13 || event.type === 'focusout') {
        let val = $(this).val();
        $(this).closest('.nameColumn').text( val );
    }
});
