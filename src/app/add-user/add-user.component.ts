import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStore } from '../state/store';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  user: User;
  isActive: boolean = false;

  constructor(
    private userStore: UserStore,
    private Ref: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      active: new FormControl(false),
      name: new FormControl(null, [Validators.required]),
    });
  }

  addTodo() {
    this.user = {
      id: uuidv4(),
      name: this.form.value.name,
      active: this.form.value.active,
    };
    this.userStore.update((state) => {
      return {
        users: [...state.users, this.user],
      };
    });
    this.Ref.close('Closing from function');
  }
}
