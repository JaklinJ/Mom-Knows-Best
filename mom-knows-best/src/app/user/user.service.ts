import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../types/User';
import { environment } from 'src/environments/environment';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();
  
    user: any | undefined;
    USER_KEY = '[user]';
  
    userSubscription: any; 
  
    get isLogged(): boolean {
      
      return !!this.user;
    }
  
    constructor(private http: HttpClient) {
     this.userSubscription =  this.user$.subscribe(user => {
        this.user= user;
      })
    }
  
    login(username: string, password: string) {
      return this.http
      .post<User>(`/api/login`, { username, password })
      .pipe(tap((user) => {
        this.user$$.next(user);
      }))
    }
  
    register(username: string,  password: string, rePassword: string) {
      return this.http.post<User>(`/api/register`, {username, password, rePassword})
      .pipe(tap((user) => this.user$$.next(user)));
    }
  
    logout() {
      return this.http.post<User>(`/api/logout`, {})
      .pipe(tap(() => this.user$$.next(undefined)));
    }
  
  getProfile() {
    return this.http.get<User>('/api/profile').pipe(tap((user) =>
      this.user$$.next(user)))
  }

  getUserProfile() {
    return this.http.get<any>('/api/profile').pipe(tap((user) => 
      this.user$$.next(user)))
    
  }
  
    ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
    }
  }
  