import { Query } from '@datorama/akita';
import { UserState, UserStore } from './store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserQuery extends Query<UserState> {
  constructor(private userStore: UserStore) {
    super(userStore);
  }

  getUsers(): Observable<User[]> {
    return this.select((state) => state.users);
  }
  isButtonDisabled(): Observable<boolean> {
    return this.select((state) => {
      const areAllUsersActive = !state.users.some(
        (item) => item.active === false
      );
      if (!areAllUsersActive || state.users.length > 4) {
        return true;
      } else {
        return false;
      }
    });
  }
}
