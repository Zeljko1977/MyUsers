import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  users$: Observable<User[]>;
  isButtonDisabled$: Observable<boolean>;

  constructor(private matDialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.isButtonDisabled$ = this.userService.isButtonDisabled();
  }
  openDialog(): void {
    this.matDialog.open(AddUserComponent);
  }
  onChangeStatus(event: any, userId: string): void {
    this.userService.changeUserStatus(event.target.checked, userId);
  }
}
