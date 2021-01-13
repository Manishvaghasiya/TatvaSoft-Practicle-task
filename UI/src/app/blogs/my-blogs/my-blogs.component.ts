import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css'],
})
export class MyBlogsComponent implements OnInit {
  blogs = [];

  constructor(
    private blogService: BlogsService
  ) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.myBlogs().subscribe(
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
