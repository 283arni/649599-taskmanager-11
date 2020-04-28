import BoardComponent from "./components/board";
import BoardController from "./controllers/board.js";
import SiteMenuComponent, {MenuItem} from "./components/menu.js";
import FilterController from "./controllers/filter.js";
import {generateTasks} from './mock/task';
import {render, RenderPosition} from "./utils/render.js";
import TasksModel from "./models/tasks.js";


const QUANTITY_TASKS = 22;


const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();

render(header, siteMenuComponent, RenderPosition.BEFOREEND);


const tasks = generateTasks(QUANTITY_TASKS);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

render(header, new SiteMenuComponent(), RenderPosition.BEFOREEND);
const filterController = new FilterController(main, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(main, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});
