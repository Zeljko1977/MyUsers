import { UserQuery } from '../state/query';
import { UserStore } from '../state/store';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor(private userStore: UserStore, private userQuery: UserQuery) {}

  getUsers(): Observable<Array<User>> {
    return this.userQuery.getUsers();
  }

  addUser(user: User): void {
    this.userStore.update((state) => {
      return {
        users: [...state.users, user],
      };
    });
  }
  isButtonDisabled(): Observable<boolean> {
    return this.userQuery.isButtonDisabled();
  }
}
