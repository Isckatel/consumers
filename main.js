import { objToConsumers } from './functions.js';
import { getData } from './data.js';
import { getTab} from './components/table.js';

let arrConsumers = objToConsumers(getData());

$("main").html(getTab(arrConsumers));

$(".newConsumer").on("click", ()=>{
    $(".modal, .win").css("display","block");
});

$(".buttCancel, .buttOK").on("click",()=>{
    $(".modal, .win").css("display","none");
});