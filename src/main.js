import BoardComponent from "./components/board";
import BoardController from "./controllers/board.js";
import SiteMenuComponent, {MenuItem} from "./components/menu.js";
import StatisticsComponent from "./components/statistics.js";
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

const filterController = new FilterController(main, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(main, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
render(main, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      statisticsComponent.hide();
      boardController.show();
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      boardController.setActiveSort();
      boardController._onSortTypeChange(`default`);
      break;
  }
});
