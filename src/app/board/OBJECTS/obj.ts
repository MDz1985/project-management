import { IBoardState, IColumnState, ITaskState } from '../../redux/state-models';

export const task1: ITaskState = {
  id: '1728',
  title: 'task1',
  order: 1,
  description: 'string Some',
  userId: 'user',
  boardId: '1',
  columnId: '1',
};

export const task2: ITaskState = {
  id: '1286',
  title: 'task2',
  order: 1,
  description: 'string Some',
  userId: 'user',
  boardId: '1',
  columnId: '1',
};

export const task3: ITaskState = {
  id: '3345',
  title: 'task3',
  order: 1,
  description: 'string Some',
  userId: 'user',
  boardId: '1',
  columnId: '1',
};

export const task4: ITaskState = {
  id: '2334',
  title: 'task4',
  order: 2,
  description: 'string Some',
  userId: 'user',
  boardId: '1',
  columnId: '2',
};

export const column1: IColumnState = {
  id: '1',
  title: 'string',
  order: 1,
};

export const column2: IColumnState = {
  id: '2',
  title: 'string',
  order: 1,
};

export const board: IBoardState = {
  id: '1111111',
  title: 'board',
};
