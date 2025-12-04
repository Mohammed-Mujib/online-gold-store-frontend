import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}

  logoutUSer(token: any): Observable<any> {
    return this.http.post(this.api + 'logout',{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
