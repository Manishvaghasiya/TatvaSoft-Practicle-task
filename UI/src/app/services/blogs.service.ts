import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

export interface Blog {
  title?: String;
  status?: boolean;
  description?: String;
}

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private httpClient: HttpClientService) {}

  createBlog(blog: Blog) {
    return this.httpClient.post('blogs', blog);
  }

  updateBlog(id: string, blog: Blog) {
    return this.httpClient.patch(`blog/${id}`, blog);
  }

  getBlogs() {
    return this.httpClient.get('blogs');
  }

  getBlog(id: string) {
    return this.httpClient.get(`blog/${id}`);
  }

  myBlogs() {
    return this.httpClient.get('blogs/me');
  }

  deleteBlog(id: string) {
    return this.httpClient.delete(`blog/${id}`);
  }
}
