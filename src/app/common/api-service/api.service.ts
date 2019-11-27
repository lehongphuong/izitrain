import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {

  // getAllWhatUrl = "https://hoctienganhphanxa.com/api/selectAllByWhat.php";
  // getAllWhatUrl = "http://thuexeotoquangngai.000webhostapp.com/api/selectAllByWhat.php"; 
  getAllWhatUrl = "http://localhost:8081/new/izicar/api/selectAllByWhat.php";

  constructor(private http: Http,
    private router: Router
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

  /**
   * 
   */
  navigate(url: any) {
    this.router.navigate([url]);
    // this.router.navigateByUrl(url);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }


}

