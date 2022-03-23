## Работа API

Для работы с API сервера необходимо в файле класса api/api.js присвоить переменной соответствующий базовый URL. После этого программа будет работать через сервер. На конце URL-a должен стоять слеш.  

Если endpoint отличается от базового URL следует добавить дополнительный путь в параметрах запроса конкретной функции. К примеру:
```
    async newConsumerAsync(body) {
        const request = new Request(this.basURL+"todos", { 
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
```
____

## Справка по пользовательскому интерфейсу

- редактирование потребителя осуществляется двойным щелчком мыши по редактируемому полю;
- фильтрация по типу потребителя осуществляется щелчком мыши по заголовку колонки «Тип»;