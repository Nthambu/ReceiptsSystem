import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base_url = 'http://localhost:3001/auth';
  acessToken:any;
  constructor(private http:HttpClient){}
   register(payload:any):Observable<any>{
    const fullUrl = `${this.base_url}/register`;
    return this.http.post(fullUrl,payload)
  }
getAccessToken(){
this.acessToken =sessionStorage.getItem('token');
if(this.acessToken){
  return this.acessToken;
}
  }
}
