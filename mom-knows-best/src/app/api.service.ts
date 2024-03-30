import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPosts() {
    const { apiUrl } = environment;
//change the type when i create them
    return this.http.get<any>(`${apiUrl}/mom-approved`)
  }

getPost(id: string) {
  const {apiUrl} = environment;
  //change the type
  return this.http.get<any>(`${apiUrl}/mom-approved/${id}`)

}



// createTheme(themeName: string, postText: string) {
//   const {apiUrl} = environment;
//   const payload = {themeName, postText};
  
//  return this.http.post<any>(`${apiUrl}/mom-approved`, payload)
// }

  
}
