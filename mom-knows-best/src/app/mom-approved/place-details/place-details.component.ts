import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css'],
})
export class PlaceDetailsComponent implements OnInit {
  errorMessage: string | null = null;
  post: any = {};
  
  isLiked: boolean = false;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}
  isOwner: boolean = false;


  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe((data) => {
      const id = data['placeId'];
      this.apiService.getSinglePost(id).subscribe((post) => {
        this.post = post;
       this.userService.getProfile().subscribe((user) => {
     
        console.log(user.username, post.author.username);
        if(user.username === post.author.username) {
          this.isOwner = !this.isOwner;
        }

        const likedPosts = user.likedPosts;
        likedPosts.forEach((postId) => {
          if (postId === id) {
            this.isLiked = !this.isLiked
          }
          
        })
       })
      });
    });
  }

  

  like():void {
   
    
    this.activatedRoute.params.subscribe((data) => {
      const id = data['placeId'];

        this.apiService.likePost(id).subscribe((like) => {
        console.log(like);
      })
      
    })
  }

  edit(): void {}

  delete(): void {}
}
