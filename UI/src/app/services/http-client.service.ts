import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface IHttpOptions {
  observe?: string;
  reportProgress?: boolean;
  responseType?: string;
  withCredentials?: boolean;
}

export interface IRequestOptions extends IHttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  get(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    const mdUrl = this.modifyUrl(url);
    return this.httpClient.get(
      mdUrl,
      this.getRequestParams(headers, params, options) as any
    );
  }

  post(
    url: string,
    body?: any,
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ) {
    const mdUrl = this.modifyUrl(url);
    return this.httpClient.post(
      mdUrl,
      body,
      this.getRequestParams(headers, params, options) as any
    );
  }

  patch(
    url: string,
    body: any,
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ) {
    const mdUrl = this.modifyUrl(url);
    return this.httpClient.patch(
      mdUrl,
      body,
      this.getRequestParams(headers, params, options) as any
    );
  }

  delete(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    const mdUrl = this.modifyUrl(url);
    return this.httpClient.delete(
      mdUrl,
      this.getRequestParams(headers, params, options) as any
    );
  }

  modifyUrl(url: string): string {
    return environment.origin + url;
  }

  getRequestParams(
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ): IRequestOptions {
    headers = headers || {};
    params = params || {};
    options = options || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const customHeaders = new HttpHeaders(headers);

    let customParams = new HttpParams();
    for (const key of Object.keys(params)) {
      customParams = customParams.append(key, params[key]);
    }

    const reqOptions = Object.assign({}, options);
    reqOptions['headers'] = customHeaders;
    reqOptions['params'] = customParams;

    return reqOptions;
  }
}
