import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getNumber(data:any){

    const request={
      "data": `[${data}]`
    }

    const headers={
      "Content-Type":"application/json"
    }
    return this.http.post<any>("https://6hqjhgjm55.execute-api.us-east-1.amazonaws.com/DL_API/DL_Consume",request).toPromise()
  }
}
