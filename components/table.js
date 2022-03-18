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
