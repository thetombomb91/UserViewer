import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  searchInProgress = false;
  searchForm: FormGroup;
  public userList$: Observable<User[]>;

  constructor(public userService: UserService, private fb: FormBuilder) { 
    this.initializeForm();
  }

  ngOnInit() {
    this.userList$ = this.userService.getAllUsers();
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      searchTerms: new FormControl('', Validators.required),
    });
  }

  handleFormSubmit(): void {
    // TODO: Do some form validation
    this.userList$ = null;
    this.searchInProgress = true;
    setTimeout(function(){ 
      this.userList$ = this.userService.getUsersBySearch(this.searchForm.controls.searchTerms.value);
      this.searchInProgress = false;
    }.bind(this), 2000);
  }

  handleClearForm(): void {
    this.searchForm.controls.searchTerms.setValue('');
    this.userList$ = this.userService.getAllUsers();
  }
}
