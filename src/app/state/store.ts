import { User } from '../models/user.model';
import { Store, StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export interface UsersState extends EntityState<User, number> {
  users: User[];
}

export const getInitialState = () => {
  return [
    { id: uuidv4(), name: 'Diego Maradona', active: true },
    { id: uuidv4(), name: 'Ruud Gullit', active: true },
  ];
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'users', idKey: 'id' })
export class UsersStore extends EntityStore<UsersState> {
  constructor() {
    super();
    this.add(getInitialState());
  }
}
