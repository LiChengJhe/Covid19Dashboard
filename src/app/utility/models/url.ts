import { DefaultUrlSerializer, UrlTree } from '@angular/router';


export enum Protocol {
  http = 'http',
  https = 'https',
  ws = 'ws'
}

export class UrlResource {

  private _Domain: string;
  private _Prefix: string;

  constructor(resource: { Domain: string, Prefix: string }) {
    this._Domain = resource.Domain;
    this._Prefix = resource.Prefix;
  }


  GetOrigin(protocol: Protocol = Protocol.https): string {
    return `${protocol}://${this._Domain}`;
  }

  GetURL(apiPath: string= null,  protocol: Protocol = Protocol.https): string {
    let url = `${protocol}://${this._Domain}`;
    if (this._Prefix) {
      url += `/${this._Prefix}`;
    }
    if (apiPath) {
    url += `/${apiPath}`;
    }
    return url;
  }
}


export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    if (url.includes('?')) {
      const index: number = url.indexOf('?');
      const params: string = url.substring(index);
      return super.parse(url.substring(0, index).toLowerCase() + params);
    }
    return super.parse(url.toLowerCase());
  }
}

export class UrlHelper {
  static ToQueryString(data: any): string {
    let paramsUrl = '';
    for (const key in data) {
      if (data[key] || data[key]===false) {
        if (Array.isArray(data[key])) {
          data[key].forEach((element, index) => {
            paramsUrl += `&${key}[${index}]=${element}`;
          });
        } else {
          paramsUrl += `&${key}=${data[key]}`;
        }
      }
    }
    return paramsUrl.substring(1);
  }
}
