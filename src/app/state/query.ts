import { QueryEntity } from '@datorama/akita';
import { UsersState, UsersStore } from './store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersQuery extends QueryEntity<UsersState> {
  constructor(private usersStore: UsersStore) {
    super(usersStore);
  }
}
