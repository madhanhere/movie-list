import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private readonly http: HttpClient
  ) {}

  get(url: string, body?: any, options?: any): Observable<ApiResponse<any>> {
    let apiUrl = `${environment.baseurl}${url}`;

    if (apiUrl.includes('?')) {
      apiUrl += `&api_key=${environment.apiKey}`;
    } else {
      apiUrl += `?api_key=${environment.apiKey}`;
    }
    
    return this.http.get(apiUrl).pipe(map((data: any) => this.extractData(data)));
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body: any = res;
    return body || {};
  }
}
