import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription, take } from 'rxjs';
import { mainRoute, welcomeRoute } from 'src/app/project.constants';
import { selectUsers } from 'src/app/redux/selectors/user.selector';
import { CreateUserDto } from 'src/app/shared/models/createUserDto.model';
import { ConfirmModalComponent } from 'src/app/shared/pages/confirm-modal/confirm-modal.component';
import { BoardService } from '../../services/board.service';
import { HeaderService } from '../../services/header.service';
import { UserService } from '../../services/user.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  isLangSlideToggled = false;

  userLogin!: string;

  usersData$ = this.store.select(selectUsers);

  private subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private boardService: BoardService,
    private tasksService: TasksService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.checkIsLoggedIn();
    this.userLogin = this.userService.getUserLogin();
    this.userService.userLogin$.subscribe((res) => {
      this.userLogin = res;
      // this.tasksService.userLogin = this.userLogin
      // console.log(this.userLogin);
    });
    this.subscriptions.add(
      this.userService.IsLoggedIn.subscribe((val) => {
        this.isLoggedIn = val;
        this.userLogin = this.userService.getUserLogin();
        // this.tasksService.userLogin = this.userService.getUserLogin();
        if (this.isLoggedIn) this.router.navigateByUrl(mainRoute);
        else this.router.navigateByUrl(welcomeRoute);
        this.ref.detectChanges();
      }),
    );
  }

  GetLangName(): string {
    let result = 'EN';
    if (this.isLangSlideToggled) {
      result = 'RU';
    }
    return result;
  }

  onLogout(): void {
    this.userService.logout();
  }

  onDeleteUser(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.userService.getCurrentUserState()
          .pipe(
            take(1),
            map((userState) => {
              if (userState) {
                this.userService.delete(userState.id);
                this.onLogout();
              }
            }),
          )
          .subscribe();
          }
      });
  }

  onEditProfile(): void {
    this.userService.getCurrentUserState()
      .pipe(
        take(1),
        map((userState) => {
          if (userState) {
            const dialogRef = this.dialog.open(EditProfileComponent, {
              minWidth: '300px',
              width: '50%',
              data: { login: userState.login, name: userState.name },
            });
            dialogRef.afterClosed().subscribe((data: CreateUserDto) => {
              if (data) {
                this.userService.updateUser(userState.id, data);
              }
            });
          }
        }),
      ).subscribe();
  }

  onMenuClick(): void {
    this.boardService.SideNavMenuClicked.next(true);
  }
}
