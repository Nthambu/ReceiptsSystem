import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
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
     // alert('error occured!')
    }
  })

}
}
