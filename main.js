import { arrToConsumers } from './functions.js';
import { getData } from './data.js';
import { getTab, editConsumer, filterType, deleteConsumer} from './components/table.js';
import { showModalNewConsumer } from './components/newConsumer.js';
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

showModalNewConsumer(arrConsumers);

deleteConsumer(arrConsumers);

editConsumer(arrConsumers);

filterType(arrConsumers);