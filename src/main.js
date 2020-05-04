import API from "./api.js";
import BoardComponent from "./components/board";
import BoardController from "./controllers/board.js";
import SiteMenuComponent, {MenuItem} from "./components/menu.js";
import StatisticsComponent from "./components/statistics.js";
import FilterController from "./controllers/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import TasksModel from "./models/tasks.js";
const AUTHORIZATION = `Basic dXNlck45wYXNzd29yZAo=`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;


const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);
const api = new API(END_POINT, AUTHORIZATION);

const siteMenuComponent = new SiteMenuComponent();
const tasksModel = new TasksModel();
const filterController = new FilterController(main, tasksModel);
const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, api);

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

render(header, siteMenuComponent, RenderPosition.BEFOREEND);
filterController.render();

render(main, boardComponent, RenderPosition.BEFOREEND);

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

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });
