import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/Post';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css'],
})
export class PlaceDetailsComponent implements OnInit {
  errorMessage: string | null = null;
  post: Post | undefined;
  
  isLiked: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}
  isOwner: boolean = false;

  @ViewChild('editFormDirective') editFormDirective!: FormGroupDirective; // ViewChild to access the form directive

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
          
        });
        if (this.post) {
          this.form.patchValue({
            title: this.post.title,
            type: this.post.type,
            location: this.post.location,
            imageUrl: this.post.imageUrl,
            rating: this.post.rating,
            description: this.post.description
          });
        }
       })
      });
    });
  }

  

  like():void {
   this.isLiked = true;
    
    this.activatedRoute.params.subscribe((data) => {
      const id = data['placeId'];

        this.apiService.likePost(id).subscribe((like) => {
        console.log(like);
      })
      
    })
  }

  onToggle: boolean = true;
  form = this.fb.group({
    title: ['', [Validators.required]],
    type: ['', Validators.required],
    location: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    rating: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  edit(): void {
    debugger
    // Populate the form controls with post data
    if (this.post) {
      this.form.patchValue({
        title: this.post.title,
        type: this.post.type,
        location: this.post.location,
        imageUrl: this.post.imageUrl,
        rating: this.post.rating,
        description: this.post.description
      });
    }
    
    // Toggle the view to the edit form
    this.onToggle = !this.onToggle;
  }

  saveEditedForm(formDirective: FormGroupDirective): void {
    const id = this.activatedRoute.snapshot.params['placeId'];
    if (this.form.valid) {
      const formData = this.form.value;
      this.apiService.editPost(id, formData.title, formData.type, formData.location, formData.imageUrl, formData.rating, formData.description)
        .subscribe(() => {
          // Reload the updated post
          this.apiService.getSinglePost(id).subscribe((updatedPost) => {
            // Patch the form with the updated post data
            console.log(updatedPost);
            this.post = updatedPost;
            
            this.form.patchValue({
              title: updatedPost.title,
              type: updatedPost.type,
              location: updatedPost.location,
              imageUrl: updatedPost.imageUrl,
              rating: updatedPost.rating,
              description: updatedPost.description
            });
          });
          debugger
          formDirective.resetForm();
          console.log(this.onToggle);
          
          this.onToggle = true; 
          console.log(this.onToggle);
          // Exit edit mode and toggle back to non-edit mode
        }, error => {
          // Handle error
          console.error('Error updating post:', error);
        });
    }
  }

  

  delete(): void {
    this.activatedRoute.params.subscribe((data) => {
      const id = data['placeId'];
       this.apiService.deletePost(id).subscribe((req) => {
        this.router.navigate(['/mom-approved'])
        
       })
    })
   
  }
}
