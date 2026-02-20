import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  getForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService
  ){}
  ngOnInit(){
    this.initForm();
  }
initForm():void{
  this.getForm = this.fb.group({
    userId:['',Validators.required]
  })
}
findUser():void{
  const formData =  this.getForm.value;
  this.authService.findUser(formData.userId).subscribe({
    next:(response)=>{
      alert('success');
    },
    error:(err)=>{
      alert('error occured!')
    }
  })

}
}
