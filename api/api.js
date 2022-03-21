

export default class Api {
    // basURL="https://blooming-dawn-85383.herokuapp.com/";
    basURL="";

    getData() {
        fetch(this.basURL)  
        .then(  
            function(response) {  
            if (response.status !== 200) {  
                console.log('Возникла проблема. Код состояния: ' +  
                response.status);  
                return {};  
            }              
            response.json().then(function(data) {  
                return data;  
            });  
            }  
        )  
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);
            return {};  
        });
    }

    async getDataAsync() {
        try {
            let response = await fetch(this.basURL);
            let data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }        
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
    async newConsumerAsync(body) {
        const request = new Request(this.basURL, { //+"todos"
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
        try {
            let response = await fetch(request);
            let data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
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
    isEnabled()  {
        if (this.basURL=="") {
            return false;
        } else {
            return true;
        }
    }  
}