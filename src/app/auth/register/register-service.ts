import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http:HttpClient){}
  private api = 'http://localhost:8000/api/';

  registerUser(data:any):Observable<any>{
    return this.http.post(this.api + 'register', data);
  }
  
}
