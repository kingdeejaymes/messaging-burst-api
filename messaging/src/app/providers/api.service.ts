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

  call(path: string, method: string, params: any) {
    return this.shortenLink(path).pipe(mergeMap(response => {
      const shortenURL = response['data'].url;
      console.log('shortenURL ====> ', shortenURL);
      console.log('bitly response ==> ', response);

      if (method === 'POST') {
        // this produces a 301 Error (the requested resource has been permanently moved to a new URL) due to the
        // nature of bitly specifically for redirections of urls
        // return this.http.post(shortenURL, null , { headers: this.headers});
        return this.http.post(this.combined_cors_api_url + path, null , { headers: this.headers, params: params });
      } else if (method === 'GET') {
        // using the bitly api shortenURL
        console.log('Headers ====> ', this.headers);
        return this.http.get(this.combined_cors_api_url + path, { headers: this.headers });
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
