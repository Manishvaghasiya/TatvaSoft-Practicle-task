import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs = [];

  constructor(private blogService: BlogsService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      (response: any) => {
        this.blogs = response;
      },
      (error) => {
        // do something with error
      }
    );
  }

  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe(
      () => {
        this.getBlogs();
      },
      (error) => {
        // do domething
      }
    );
  }
}
