import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-all-places',
  templateUrl: './all-places.component.html',
  styleUrls: ['./all-places.component.css']
})
export class AllPlacesComponent implements OnInit{

  constructor(private http: HttpClient, private apiService: ApiService) {}

  posts: any = [];

ngOnInit(): void {
  this.apiService.getPosts().subscribe((posts) => {
   this.posts = posts;
  
  })
}
}
