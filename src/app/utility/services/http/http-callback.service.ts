import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class HttpCallbackService {

  constructor(
    private _Toastr: ToastrService) {

  }

  public Success: (value: any) => void = (res) => {

    let result: string;
    result = _.isString(res) ? res : JSON.stringify(res);
    this._Toastr.success(result);
  }

  public Error: (value: any) => void =
    (res: HttpErrorResponse) => {
      {
        let result: string;
        if (res.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          result = `An error occurred ${res.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          result = `Backend returned error code ${res.status}, message was: ${res.message}`;
        }
        this._Toastr.error(result);
      }
    }
}
