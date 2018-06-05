import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class ApiService {

  private api_url: string;
  private cors_url: string;
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.initConfigVariables();
  }

  initConfigVariables() {
    this.api_url = environment.api_url;
    this.cors_url = environment.cors_url;
    let auth_token = environment.auth_token;
    this.headers = this.headers.set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', auth_token);
  }

  call(path:string, method: string, params: any) {
    if (method == 'POST') {
      return this.http.post(this.cors_url + this.api_url + path, null ,{ headers: this.headers, params: params});
    }

    // Then we can add the other methods here below ....
  }
}
