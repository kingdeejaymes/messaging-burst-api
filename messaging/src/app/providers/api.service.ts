import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { mergeMap } from 'rxjs/internal/operators';

@Injectable()
export class ApiService {
  private combined_cors_api_url: string;
  private bitly_shorten_api: string;
  private bitly_access_token: string;
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.initConfigVariables();
  }

  initConfigVariables() {
    const auth_token = environment.auth_token;
    const cors_url = environment.cors_url;
    const api_url = environment.api_url;
    this.combined_cors_api_url = cors_url + api_url; // we need this to bypass cors issue
    this.bitly_shorten_api = environment.bitly_shorten_api;
    this.bitly_access_token = environment.bitly_access_token;
    this.headers = this.headers.set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', auth_token);
  }

  call(path: string, method: string) {
    return this.shortenLink(path).pipe(mergeMap(response => {
      const shortenURL = response['data'].url;
      console.log('shortenURL ====> ', shortenURL);
      if (method === 'POST') {
        return this.http.post(shortenURL, null , { headers: this.headers});
      }
    }));
    // Then we can add the other methods here below ....
  }

  // using Bitly API
  shortenLink(path: string) {
    return this.http.get(this.bitly_shorten_api + '?access_token=' + this.bitly_access_token + '&longUrl='
        + encodeURIComponent(this.combined_cors_api_url + path));
  }
}
