import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from './types/Post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts() {
    const { apiUrl } = environment;
    return this.http.get<Post>(`/api/mom-approved`);
  }

  getSinglePost(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Post>(`/api/mom-approved/${id}`);
  }

  createPost(
    title: string,
    type: string,
    location: string,
    imageUrl: string,
    rating: number,
    description: string
  ) {
    const { apiUrl } = environment;
    const payload = { title, type, location, imageUrl, rating, description };
    return this.http.post<Post>(`/api/mom-approved`, payload, {
      withCredentials: true,
    });
  }

  likePost(id: string) {
    const {apiUrl} = environment;
    return this.http.post<Post>(`/api/mom-approved/${id}/like`, {}, {withCredentials: true});
  }

  editPost(
    id: string|any,
    title: string| any,
    type: string|any,
    location: string|any,
    imageUrl: string|any,
    rating: string|any,
    description: string|any
  ) {
    return this.http.put<any>(`/api/mom-approved/${id}`, { title, type, location, imageUrl, rating, description });
  }

deletePost(id: string) {
  return this.http.delete<Post>(`/api/mom-approved/${id}`)
}

}
