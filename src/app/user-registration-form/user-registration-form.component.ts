import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  showSignUpErrorPrompt1 = false;
  showSignUpErrorPrompt2 = false;
  updateErrorMessage: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    const selectedDate = d || new Date();
    return selectedDate <= today;
  };

  //***This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      //***Logic for a successful user registration goes here! (To be implemented)
      console.log(response)
      this.dialogRef.close(); //***This will close the modal on success.
      this.snackBar.open('User registered sucessfully!', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error(error);
      console.log(error.message);
      if (error.status === 422) {
        this.showSignUpErrorPrompt1 = true;
      } else if (error.status === 409) {
        this.showSignUpErrorPrompt2 = true;
        this.updateErrorMessage = error.message;
      }
    }
    );
  }

  closeSignUpErrorPrompt(): void {
    this.showSignUpErrorPrompt1 = false;
    this.showSignUpErrorPrompt2 = false;
  }


}