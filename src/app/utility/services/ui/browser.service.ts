import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export  class  BrowserService {
  constructor() { }
  IsIE(): boolean {
    return ('ActiveXObject' in window);
   }
}
