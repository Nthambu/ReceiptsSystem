import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base_url = 'localhost/3000';
  constructor(private http:HttpClient){}
   register(payload:any):Observable<any>{
    const fullUrl = `${this.base_url}/auth/register`;
    return this.http.post(fullUrl,payload)
  }
}
