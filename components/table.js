import Api from "../api/api.js";

const api = new Api();

export function getTab(arrConsumers) {
    let consumerRow = "";
    arrConsumers.forEach(elem => {
        consumerRow = consumerRow 
        + `<div class="contentRow">
        <div class="nameColumn">${elem.name}</div>
        <div class="typeColunm" title="${elem.type == 1 ? 'Физическое лицо' : 'Юридическое лицо'}" >${elem.type == 1 ? "Ф" : "Ю"}</div>
        <div class="numberColumn">${elem.number}</div>
        <div class="delColumn" name="${elem.id}"><button class="delButt">X</buttnon></div>
    </div>`
    });
    return `
    <div class="consumerTab">
        <div class="title">
            <div class="nameTitle title">Имя</div>
            <div class="typeTitle title">Тип</div>
            <div class="numberTitle title">Номер потребителя</div>
            <div class="delTitle title"></div>        
        </div>
        ${consumerRow}    
    </div>
    <div class="modalDel">
        <p>Вы действительно хотите удалить потребителя?</p>
        <button type="button" class="buttCancelDel" style="background-color: silver; color:white;">Отмена</button>
        <button type="button" class="buttOKDel">ОК</button>   
    </div>`;
}


//Отображем поле ввода для редактирования элемента
function dblclickField(calssName, inputClassName) {
    return ($(document).on("dblclick", "."+calssName, (event)=>{
            let inputElement = '<input class="'+ inputClassName + '"/>'
            let inEdit = $(inputElement);
            let toEdit = $(event.target);
            toEdit.html( inEdit.val( toEdit.text() ) );
            inEdit.focus().select();
        })
    );
}

//Применение изменений после ввода
function focusoutInputSome(className) {
    return ($(document).on("focusout keypress", "."+className+" input", function(event) {
        if( event.which === 13 || event.type === 'focusout') {
            let val = $(this).val();
            $(this).closest("."+className).text( val );
        }
        })
    );
}

//Отображем выбор типа потребителя 
function dblclickSelect() {
    return ($(document).on("dblclick", ".typeColunm", (event)=>{
            let selectElement = `<select class="editSelectType">
                <option>Ф</option>
                <option>Ю</option>
            </select>`
            let inEdit = $(selectElement);
            let toEdit = $(event.target);
            toEdit.html( inEdit);
            $('.editSelectType option[value="'+toEdit.text()+'"]').prop('selected', true);
            inEdit.focus().select();
        })
    );
}
//Применение изменений после выбора типа
function focusoutSelect() {
    return ($(document).on("focusout keypress", ".typeColunm select", function(event) {
        if( event.which === 13 || event.type === 'focusout') {
            let val = $(this).val();
            $(this).closest("typeColunm").text( val );
        }
        })
    );
}

export const editConsumer = () => {
    dblclickField("numberColumn","inputNumber");
    dblclickField("nameColumn","inputName");
    focusoutInputSome("nameColumn");
    focusoutInputSome("numberColumn");
    dblclickSelect();
    focusoutSelect();
}

export const deleteConsumer = (arrConsumers) => {
    let id;
    $(".delButt").on("click", (e)=>{
        $(".modalDel").css("display","block");
        let el = $(e.target).closest(".delColumn");
        let strId = el.attr("name");
        id = Number(strId);
    });
    //Скрыть окно создания
    $(".buttCancelDel").on("click",()=>{
        $(".modalDel").css("display","none");
    });

    //Удаляем потребителя из массива
    $(".buttOKDel").on("click",()=>{
        $(".modalDel").css("display","none");
        
        if (api.isEnabled()) {
            api.deleteConsumerAsync(id).then((ok)=>{
                if (ok) {
                    let indexArr = arrConsumers.find(con => con.id == id).id;
                    arrConsumers.splice(indexArr,1);
                    $("main").html(getTab(arrConsumer));
                } else {
                    console.log("Сервер не подтвердил удаление потребителя");
                }
            });
        } else {
            let indexArr = arrConsumers.find(con => con.id == id).id;
            arrConsumers.splice(indexArr,1);
            $("main").html(getTab(arrConsumers));
        }
    });
}

export const filterType = (arrConsumers) => {
    $(".typeTitle").on("click", (event)=>{
        const filterConsumers = [...arrConsumers];
        let x = $(event.target);
        if ($(event.target).val()=="Тип" || $(this).val()=="Ю") {
            filterConsumers.filter(c => c.type === "Ф" );
            getTab(filterConsumers);
            $(event.target).html("Ф");
        } else {
            filterConsumers.filter(c => c.type === "Ю" );
            getTab(filterConsumers);
            $(event.target).html("Ю");  
        }
    })
}
// export const dblclickFieldNumber = () => {
//     return dblclickField("numberColumn","inputNumber");
// } 

// export const dblclickFieldName = () => {
//     return dblclickField("nameColumn","inputName");
// } 

// export const focusoutInputName = () => {
//     return focusoutInputSome("nameColumn");
// }

// export const focusoutInputNumber = () => {
//     return focusoutInputSome("numberColumn");
// }