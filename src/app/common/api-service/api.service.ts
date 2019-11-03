import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  // getAllWhatUrl = "https://hoctienganhphanxa.com/api/selectAllByWhat.php";
  // getAllWhatUrl = "http://thuexeotoquangngai.000webhostapp.com/api/selectAllByWhat.php"; 
  getAllWhatUrl = "http://localhost:8081/new/izicar/api/selectAllByWhat.php";

  constructor(private http: Http,
  ) {
  }

  /**
   * 
   * @param param 
   * @param what 
   */
  excuteAllByWhat(param: any, what: string): Observable<any[]> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    param.what = what;

    console.log('Param input', param);

    return this.http.post(this.getAllWhatUrl, param, options).pipe(map((response: Response) => response.json()));
  }

  /**
   * 
   * @param param 
   * @param what 
   */
  excuteAllByWhatWithUrl(url: string, param: any, what: string): Observable<any[]> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    param.what = what;

    console.log('Param input', param);

    return this.http.post(url, param, options).pipe(map((response: Response) => response.json()));
  }
}

