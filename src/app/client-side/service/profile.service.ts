import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUpdateUserUrl: string = '/users';
  baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

updateUser(user: any): Observable<any> {
    console.log(user);
    return this.httpClient.put<any>(
      this.baseUrl.concat(this.apiUpdateUserUrl),
      user
    );
  }
  addUSer(user: any): Observable<any> {
    console.log(user);
    return this.httpClient.post<any>(
      this.baseUrl.concat(this.apiUpdateUserUrl),
      user
    );
  }
}