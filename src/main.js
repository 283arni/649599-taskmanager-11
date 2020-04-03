import {createMenuTemplate} from './commponents/menu';
import {createFilterTemplate} from './commponents/filter';
import {createBoardTemplate} from './commponents/board';
import {createTaskEditTemplate} from './commponents/task-edit';
import {createTaskTemplate} from './commponents/task';
import {createMoreTaskButtonTemplate} from './commponents/button-more';


const QUANTITY_TASKS = 3;

const main = document.querySelector(`.main`);
const header = main.querySelector(`.main__control`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createMenuTemplate(), `beforeend`);
render(main, createFilterTemplate(), `beforeend`);
render(main, createBoardTemplate(), `beforeend`);

const board = main.querySelector(`.board`);
const taskList = main.querySelector(`.board__tasks`);

render(taskList, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < QUANTITY_TASKS; i++) {
  render(taskList, createTaskTemplate(), `beforeend`);
}

render(board, createMoreTaskButtonTemplate(), `beforeend`);
