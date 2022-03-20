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
            <div class="nameColumn title">Имя</div>
            <div class="typeColunm title">Тип</div>
            <div class="numberColumn title">Номер потребителя</div>        
        </div>
        ${consumerRow}    
    </div>`;
}

//Отображем поле ввода для редактирования элемента
export const dblclickInput = () => {
    return ($(document).on("dblclick", ".nameColumn", (event)=>{
            let inEdit = $('<input class="inputName"/>');
            let toEdit = $(event.target);
            toEdit.html( inEdit.val( toEdit.text() ) );
            inEdit.focus().select();
        })
    );
}
//Применение изменений после ввода
export const focusoutInput = () => {
    return ($(document).on('focusout keypress', '.nameColumn input', function(event) {
        if( event.which === 13 || event.type === 'focusout') {
            let val = $(this).val();
            $(this).closest('.nameColumn').text( val );
        }
        })
    );
}