import {createMenuTemplate} from './commponents/menu';
import {createFilterTemplate} from './commponents/filter';
import {createBoardTemplate} from './commponents/board';
import {createTaskEditTemplate} from './commponents/task-edit';
import {createTaskTemplate} from './commponents/task';
import {createMoreTaskButtonTemplate} from './commponents/button-more';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';


const QUANTITY_TASKS = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(QUANTITY_TASKS);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createMenuTemplate(), `beforeend`);
render(main, createFilterTemplate(filters), `beforeend`);
render(main, createBoardTemplate(), `beforeend`);

const board = main.querySelector(`.board`);
const taskList = main.querySelector(`.board__tasks`);

render(taskList, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
  .forEach((task) => render(taskList, createTaskTemplate(task), `beforeend`));

render(board, createMoreTaskButtonTemplate(), `beforeend`);

const loadMoreButton = board.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskList, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
