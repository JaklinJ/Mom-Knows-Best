import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { catchError, map, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username: string = '';
  likedPosts: any[] = [];
  id: string[] = []
  
  post: any[] = [];
  
  constructor(private userService: UserService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUserProfile();
   
  }

  fetchUserProfile(): void {
    debugger
    this.userService.getUserProfile()
      .pipe(
        map((profileData: any) => {
          
          this.username = profileData.username;
          this.likedPosts = profileData.likedPosts;
          this.id.push(profileData.likedPosts)
          
          this.likedPosts.forEach(data => {
            
            this.apiService.getSinglePost(data).subscribe((item) => {
              this.post.push(item);
              console.log(this.post);
              
            })
          })
        }),
        catchError(error => {
          console.error('Error fetching user profile:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }
 
  
}




