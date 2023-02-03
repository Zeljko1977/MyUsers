import { User } from '../models/user.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export interface UserState {
  users: User[];
}

export const getInitialState = () => {
  return {
    users: [
      { id: uuidv4(), name: 'Marko Markovic', active: true },
      { id: uuidv4(), name: 'Petar Petrovic', active: true },
    ],
  };
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'users' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(getInitialState());
  }
}
