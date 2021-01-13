import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs = [];

  constructor(private blogService: BlogsService) {}

  createBlogForm: FormGroup;

  ngOnInit(): void {
    this.getBlogs();
    this.createBlogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
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

  deleteBlog() {
    this.blogService.deleteBlog().subscribe(() => {
      this.getBlogs();
    }, error => {
      // do domething
    })
  }

  createBlog() {
    if (this.createBlogForm.invalid) {
      this.createBlogForm.markAllAsTouched();
      return;
    }

    const blogModel = {
      title: this.createBlogForm.value.title,
      description: this.createBlogForm.value.description,
    };

    this.blogService.createBlog(blogModel).subscribe((response) => {
      this.createBlogForm.reset();
      this.getBlogs();
    });
  }

  setDataInForm(data) {
    this.createBlogForm.controls.title.setValue(data.title);
    this.createBlogForm.controls.descriptio.setValue(datna.descriptio);
  }

   updateBlog() {
    if (this.createBlogForm.invalid) {
      this.createBlogForm.markAllAsTouched();
      return;
    }

    const blogModel = {
      title: this.createBlogForm.value.title,
      description: this.createBlogForm.value.description,
    };

    this.blogService.updateBlog(blogModel).subscribe((response) => {
      this.createBlogForm.reset();
      this.getBlogs();
    });
  }
}
