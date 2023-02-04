import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';

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
    private userService: UserService,
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
    this.userService.addUser(this.user);

    this.Ref.close('Closing modal');
  }
}
