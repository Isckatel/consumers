import { arrToConsumers } from './functions.js';
import { getData } from './data.js';
import { getTab, EditConsumer, FilterType} from './components/table.js';
import { ShowModalNewConsumer } from './components/newConsumer.js';
import  Api from "./api/api.js";

const api = new Api();
let arrConsumers = [];

if (api.isEnabled()) {
    api.getDataAsync().then((data)=>{
        arrConsumers = arrToConsumers(data);
        $("main").html(getTab(arrConsumers));
    });
} else {
    arrConsumers = arrToConsumers(getData());
    $("main").html(getTab(arrConsumers));
}

ShowModalNewConsumer(arrConsumers);

EditConsumer();

FilterType(arrConsumers);



// api.getData();

// let jbody = {
//     title: "Работа",
//     text: "Test s consumer"
//   }      

// api.newConsumer(jbody); 