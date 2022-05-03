import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { IColumnState, ITaskState } from '../../../redux/state-models';
import { selectColumns } from '../../../redux/selectors/column.selector';
import { Store } from '@ngrx/store';
import { board, column1, task1, task2, task3 } from '../../OBJECTS/obj';
import { addBoardAction } from '../../../redux/actions/add-board.action';
import { addColumnAction } from '../../../redux/actions/add-column.action';
import { addTaskAction } from '../../../redux/actions/add-task.action';
import { state } from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {
  }

  private columns?: IColumnState[];

  public columns$?: Observable<IColumnState[]>;

  private columnsSubscription = this.columns$?.subscribe((columns)=> this.columns = columns)

  public dropColumn(event: CdkDragDrop<string[]>) {
    if (this.columns) {
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }
  }

  onClick() {
    let column: IColumnState;
    let task: ITaskState;
    this.store.dispatch(addBoardAction({ board }));
    column = column1;
    this.store.dispatch(addColumnAction({ column }));
    task = task1;
    this.store.dispatch((addTaskAction({task})))
    task = task2;
    this.store.dispatch((addTaskAction({task})))
    task = task3;
    this.store.dispatch((addTaskAction({task})))
    console.log(this.store)
  }

  ngOnInit(): void {
    this.columns$ = this.store.select(selectColumns);
  }

  ngOnDestroy() {
    this.columnsSubscription?.unsubscribe()
  }
}
