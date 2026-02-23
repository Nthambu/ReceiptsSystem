import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../auth-service';
import { MessagingService } from '../../services/message-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, MatSlideToggleModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm!: FormGroup;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private snackBar = inject(MatSnackBar)
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessagingService,
  
  ) { }
  ngOnInit() {
    this.initializeRegisterForm();
  }
  initializeRegisterForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    },
      {
        validators: this.passwordMatchValidator()
      });
  }
  validateForm(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    this.submitForm();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
  submitForm(): void {
    const formValues = this.registerForm.value;
    const payload = {
      email: formValues?.email,
      username: formValues.username,
      password: formValues.password,
    };
    this.authService.register(payload).subscribe({
      next: (response) => {
        // this.messageService.handleSuccess(response.msg)
        if (response?.token) {
          sessionStorage.setItem('token', response.token);
        }
        console.log(sessionStorage.getItem('token'));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.messageService.handleError(err);
      },
    });
  }
  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirm_password')?.value;
      if (!password || !confirmPassword) {
        return null;

      }
      return password === confirmPassword ? null : { passwordMismatch: true }
    };

  }
  navigateToLogin(): void {
    this.router.navigate(['onsignIn']);
  }
  getUserDetails() {

  }
}
