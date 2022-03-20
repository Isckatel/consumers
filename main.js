import { objToConsumers } from './functions.js';
import { getData } from './data.js';
import { getTab, EditConsumer, FilterType} from './components/table.js';
import { ShowModalNewConsumer } from './components/newConsumer.js';

let arrConsumers = objToConsumers(getData());

$("main").html(getTab(arrConsumers));

ShowModalNewConsumer(arrConsumers);

EditConsumer();

FilterType(arrConsumers);