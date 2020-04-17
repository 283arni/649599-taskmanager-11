import BoardComponent from "./components/board";
import BoardController from "./controllers/board.js";
import FilterComponent from "./components/filter";
import SiteMenuComponent from "./components/menu";
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {render, RenderPosition} from "./utils/render.js";


const QUANTITY_TASKS = 22;


const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(QUANTITY_TASKS);

render(header, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(main, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(main, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);
