export function getTab(arrConsumers) {
    let consumerRow = "";
    arrConsumers.forEach(elem => {
        consumerRow = consumerRow 
        + `<div class="contentRow">
        <div class="nameColumn">${elem.name}</div>
        <div class="typeColunm" title="${elem.type == 1 ? 'Физическое лицо' : 'Юридическое лицо'}" >${elem.type == 1 ? "Ф" : "Ю"}</div>
        <div class="numberColumn">${elem.number}</div>
    </div>`
    });
    return `
    <div class="consumerTab">
        <div class="title">
            <div class="nameTitle title">Имя</div>
            <div class="typeTitle title">Тип</div>
            <div class="numberTitle title">Номер потребителя</div>        
        </div>
        ${consumerRow}    
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

export const EditConsumer = () => {
    dblclickField("numberColumn","inputNumber");
    dblclickField("nameColumn","inputName");
    focusoutInputSome("nameColumn");
    focusoutInputSome("numberColumn");
    dblclickSelect();
    focusoutSelect();
}

export const FilterType = (arrConsumers) => {
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