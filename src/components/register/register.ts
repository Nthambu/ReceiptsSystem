import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../app/auth-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.initializeRegisterForm();
  }
  initializeRegisterForm(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }
  validateForm(): void {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.invalid){
      alert('please fill all the required data!');
      return;
    }
    this.submitForm();
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
        alert(response);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
