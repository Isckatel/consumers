import Api from "../api/api.js";
const api = new Api();

export function getTab(arrConsumers) {
    let consumerRow = "";
    arrConsumers.forEach(elem => {
        consumerRow = consumerRow 
        + `<div class="contentRow" name="${elem.id}">
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
            <div class="typeTitle title" name="all">Тип</div>
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
            let inputElement;
            switch (calssName) {
                case "numberColumn":
                    inputElement='<input class="'+ inputClassName + '" type="number" maxlength="13"/>'
                    break;
                case "nameColumn":
                    inputElement='<input class="'+ inputClassName + '" maxlength="255"/>'
                    break;
            }
            let inEdit = $(inputElement);
            let toEdit = $(event.target);
            toEdit.html( inEdit.val( toEdit.text() ) );
            inEdit.focus().select();
        })
    );
}

//Применение изменений после ввода
function focusoutInputSome(className, propertyName, arrConsumers) {
    return ($(document).on("focusout keypress", "."+className+" input", function(event) {          
        if( event.which === 13 || event.type === 'focusout') {
            let val = $(this).val();
            let id = Number($(this).closest(".contentRow").attr("name"));
            let obj = arrConsumers.find(con => con.id === id);
            if (val == "") {
                $(this).closest("."+className).text(obj[propertyName]);  
                return;
            }
            if (className == "numberColumn" && val.length<13) {
                $(this).closest("."+className).text(obj[propertyName]);  
                return;
            }    
            obj[propertyName] =  isNaN(val) ? val : Number(val);
            if (api.isEnabled()) {
                api.editConsumerAsync(obj).then((ok)=>{
                    if (ok) {
                        let indexArr = arrConsumers.findIndex(con => con.id === id);
                        arrConsumers[indexArr] = obj;
                        $(this).closest("."+className).text( val );
                    } else {
                        console.log("Сервер не подтвердил изменения");
                        $(this).closest("."+className).text( arrConsumers[indexArr][propertyName]);
                    }
                });
            } else {
                let indexArr = arrConsumers.findIndex(con => con.id === id);
                arrConsumers[indexArr] = obj;
                $(this).closest("."+className).text( val );
            }  
        }
    }));
}

//Отображем выбор типа потребителя 
function dblclickSelect() {
    return ($(document).on("dblclick", ".typeColunm", (event)=>{
            let selectElement = `<select class="editSelectType">
                <option value="1">Ф</option>
                <option value="2">Ю</option>
            </select>`
            let inEdit = $(selectElement);
            let toEdit = $(event.target);
            let txt = toEdit.text();
            toEdit.html( inEdit);                     
            $('.editSelectType option:contains("'+txt+'")').prop('selected', true);
            inEdit.focus().select();
        })
    );
}
//Применение изменений после выбора типа
function focusoutSelect(arrConsumers) {
    return ($(document).on("focusout keypress", ".typeColunm select", function(event) {
        if( event.which === 13 || event.type === 'focusout') {
            let val = $(this).val();
            let id = Number($(this).closest(".contentRow").attr("name"));
            let obj = arrConsumers.find(con => con.id === id);
            obj.type = Number(val);
            if (api.isEnabled()) {
                api.editConsumerAsync(obj).then((ok)=>{
                    if (ok) {
                        let indexArr = arrConsumers.findIndex(con => con.id === id)
                        arrConsumers[indexArr] = obj;
                        $(this).closest(".typeColunm").html(val==1? "Ф": "Ю");
                        $(this).closest(".typeColunm").attr("title", obj.type == 1 ? 'Физическое лицо' : 'Юридическое лицо');
                    } else {
                        $(this).closest(".typeColunm").html(arrConsumers[indexArr].type);
                        console.log("Сервер не подтвердил изменения");
                    }
                });
            } else {
                let indexArr = arrConsumers.findIndex(con => con.id === id);
                arrConsumers[indexArr] = obj;
                $(this).closest(".typeColunm").html(val==1? "Ф": "Ю");
                $(this).closest(".typeColunm").attr("title", obj.type == 1 ? 'Физическое лицо' : 'Юридическое лицо');
            }
        }
    }));
}

export const editConsumer = (arrConsumers) => {
    dblclickField("numberColumn", "inputNumber");
    dblclickField("nameColumn", "inputName");
    focusoutInputSome("nameColumn", "name", arrConsumers);
    focusoutInputSome("numberColumn", "number", arrConsumers);
    dblclickSelect();
    focusoutSelect(arrConsumers);
    //---Валидация---
    $(".consumerTab").on('input','.inputNumber' ,function(){
        if (this.value.length > this.maxLength){
            this.value = this.value.slice(0, this.maxLength);
        }
    });
    $(".consumerTab").on('input','.inputName' ,function(){
        if (this.value.length > this.maxLength){
            this.value = this.value.slice(0, this.maxLength);
        }
    });
}

export const deleteConsumer = (arrConsumers) => {
    let id;
    $(document).on("click", ".delButt", (e)=>{
        $(".modalDel").css("display","block");
        let el = $(e.target).closest(".delColumn");
        let strId = el.attr("name");
        id = Number(strId);
    });
    //Скрыть окно создания
    $(document).on("click", ".buttCancelDel" ,()=>{
        $(".modalDel").css("display","none");
    });

    //Удаляем потребителя из массива
    $(document).on("click",".buttOKDel",()=>{
        $(".modalDel").css("display","none");
        
        if (api.isEnabled()) {
            api.deleteConsumerAsync(id).then((ok)=>{
                if (ok) {
                    let indexArr = arrConsumers.findIndex(con => con.id === id);
                    arrConsumers.splice(indexArr,1);
                    $("main").html(getTab(arrConsumer));
                } else {
                    console.log("Сервер не подтвердил удаление потребителя");
                }
            });
        } else {
            let indexArr = arrConsumers.findIndex(con => con.id === id);
            arrConsumers.splice(indexArr,1);
            $("main").html(getTab(arrConsumers));
        }
    });
}

export const filterType = (arrConsumers) => {
    $(document).on("click",".typeTitle", (event)=>{
        let filterConsumers = [...arrConsumers];
        let typeCon = $(event.target).attr("name");
        if (typeCon=="all" ) {
            filterConsumers = filterConsumers.filter(c => c.type === 1);
            $("main").html(getTab(filterConsumers));
            $(".typeTitle").attr("name","1");
        } else if (typeCon=="1") {
            filterConsumers = filterConsumers.filter(c => c.type === 2);
            $("main").html(getTab(filterConsumers));
            $(".typeTitle").attr("name","2");  
        } else if (typeCon=="2") {
            $("main").html(getTab(arrConsumers));
            $(".typeTitle").attr("name","all");
        }
    })
}
