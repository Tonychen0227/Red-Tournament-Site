import { Component } from '@angular/core';
import { RunnersService } from '../../services/runners.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  constructor(private runnersService: RunnersService) { }
  
  successMessage: string | null = null;
  errorMessage: string | null = null;

  discordUsername: string = '';
  displayName: string = '';
  role: 'runner' | 'commentator' = 'runner';
  isAdmin: boolean = false;
  pronouns: string | null = null

  addUser() {
    const newUser = {
      discordUsername: this.discordUsername,
      displayName: this.displayName,
      role: this.role,
      isAdmin: this.isAdmin,
      pronouns: this.pronouns
    };

    this.runnersService.addUser(newUser).subscribe(
      (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        this.clearForm();
      },
      (error: any) => {
        this.errorMessage = 'Error adding user. Please try again.';
        this.successMessage = null;
        console.error('Error adding user', error);
      }
    );
  }

  clearForm() {
    this.discordUsername = '';
    this.displayName = '';
    this.pronouns = null;
  }
}