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

export const showModalNewConsumer = (arrConsumers) => {
    //Показать окно создания 
    $(".newConsumer").on("click", ()=>{
        $(".modal, .win").css("display","block");
    });
    //Скрыть окно создания
    $(".buttCancel").on("click",()=>{
        $(".modal, .win").css("display","none");
    });

    let successValid = false;
    
    $('#inputNumber').keyup(function () { 
        this.value = this.value.replace(/[^0-9\.]/g,'');
    });

    $("#modalForm").validate({
        rules: {
            inputName: {
                required: true,
                minlength: 1,
                maxlength: 255
            },
            inputNumber: {
                required: true,
                minlength: 13,
                maxlength: 13,
                number: true
            }
        },
        messages: {
            inputName: {
                required: "Пожалуйста, введите имя потребителя.",
                minlength: "Имя не должно быть короче 1 символа.",
                maxlength: "Имя не должно быть длиннее 255 символов."
            },
            inputNumber: {
                required: "Пожалуйста, введите номер потребителя.",
                minlength: "Имя не должно быть короче 13 символа.",
                maxlength: "Имя не должно быть длиннее 13 символов.",
                number: "Номер потребителя должен состоять только из цифр."
            } 
        },
        success: () => successValid = true
    });

    //Добавляем созданного потребителя в массив
    $(".buttOK").on("click",()=>{        
        if (!$("#inputName").val() && !$("#inputNumber").val()) return;
        if (successValid) {
            $(".modal, .win").css("display","none");
            newConsumer(arrConsumers);
        }
    });
}

export const validateModal = () => {
    
}