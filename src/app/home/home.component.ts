import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserQuery } from '../state/query';
import { UserStore } from '../state/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  users: User[] = [];
  isButtonDisabled: Observable<boolean>;

  constructor(private userQuery: UserQuery, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.userQuery.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.isButtonDisabled = this.userQuery.isButtonDisabled();
  }
  openDialog(): void {
    this.matDialog.open(AddUserComponent);
  }
}
