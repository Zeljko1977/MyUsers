import { UsersQuery } from '../state/query';
import { UsersStore } from '../state/store';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor(private usersStore: UsersStore, private usersQuery: UsersQuery) {}

  getUsers(): Observable<Array<User>> {
    console.log(this.usersQuery.getAll());
    return this.usersQuery.selectAll();
  }

  addUser(user: User): void {
    this.usersStore.add(user);
  }
  changeUserStatus(newStatus: boolean, userId: string): void {
    this.usersStore.update(
      ({ id }) => id === userId,
      (entity) => {
        return { ...entity, active: newStatus };
      }
    );
  }
  isButtonDisabled(): Observable<boolean> {
    let countOfUsers$ = this.usersQuery.selectCount();
    let countOfInactiveUsers$ = this.usersQuery.selectCount(
      (user) => user.active === false
    );
    return countOfUsers$.pipe(
      switchMap((numOfUsers) => {
        return countOfInactiveUsers$.pipe(
          map((numOfInactive) => ({ numOfUsers, numOfInactive }))
        );
      }),
      map((results) => {
        const { numOfInactive, numOfUsers } = results;
        if (numOfInactive !== 0 || numOfUsers > 4) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
