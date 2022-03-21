

export default class Api {
    basURL="https://blooming-dawn-85383.herokuapp.com/";

    getData() {
        fetch(this.basURL)  
        .then(  
            function(response) {  
            if (response.status !== 200) {  
                console.log('Возникла проблема. Код состояния: ' +  
                response.status);  
                return;  
            }
              
            response.json().then(function(data) {  
                console.log(data);  
            });  
            }  
        )  
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    }

    newConsumer(data) {
        const request = new Request(this.basURL, { //+"todos"
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
        
        fetch(request)
        .then(function(response) {
            if (response.status !== 200) {  
                console.log('Возникла проблема. Код состояния: ' +  
                response.status);  
                return;  
            } else if (response.ok) {
                console.log('Успешно!');
            }
        })
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    }
    editConsumer(data) {
        const request = new Request(this.basURL, { //+"todos"
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
        
        fetch(request)
        .then(function(response) {
            if (response.status !== 200) {  
                console.log('Возникла проблема. Код состояния: ' +  
                response.status);  
                return;  
            } else if (response.ok) {
                console.log('Успешно!');
            }
        })
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    }
    deleteConsumer(id){
        fetch(this.basURL+id,{
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.status !== 200) {  
                console.log('Возникла проблема. Код состояния: ' +  
                response.status);  
                return;  
            } else if (response.ok) {
                console.log('Удалено!');
            }
        })
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    }    
}