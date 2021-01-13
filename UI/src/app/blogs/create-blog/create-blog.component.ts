import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  createBlogForm: FormGroup;
  updateFlag = false;
  blogId: string;

  constructor(
    private blogService: BlogsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.updateFlag = true;
        this.blogId = params.id;
        this.getBlog(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.createBlogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      description: new FormControl('', [Validators.required]),
    });
  }

  getBlog(id: string) {
    this.blogService.getBlog(id).subscribe(
      (response: any) => {
        this.setDataInForm(response);
      },
      (error) => {
        // error
      }
    );
  }

  createBlog() {
    if (this.createBlogForm.invalid) {
      this.createBlogForm.markAllAsTouched();
      return;
    }

    const blogModel = {
      title: this.createBlogForm.value.title,
      status: this.createBlogForm.value.status || false,
      description: this.createBlogForm.value.description,
    };

    this.blogService.createBlog(blogModel).subscribe(
      () => {
        this.createBlogForm.reset();
        this.router.navigate(['/blogs']);
      },
      (error) => {
        // do something
      }
    );
  }

  setDataInForm(data) {
    this.createBlogForm.controls.title.setValue(data.title);
    this.createBlogForm.controls.description.setValue(data.description);
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

    this.blogService
      .updateBlog(this.blogId, blogModel)
      .subscribe(() => {
        this.createBlogForm.reset();
        this.router.navigate(['/blogs']);
      });
  }
}
