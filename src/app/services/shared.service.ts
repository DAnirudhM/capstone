import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  lookUpOrgID(path: string): string {
    switch (path) {
      case '/f-1':
        return '1';
      case '/f-2':
        return '2';
      case '/f-3':
        return '3';
      case '/f-e':
        return '4';
      case '/motogp':
        return '5';
      default:
        return '/';
    }
  }

  getOrgNameByRouterURL(path: string): string {
    switch (path) {
      case '/f-1':
        return 'F-1';
      case '/f-2':
        return 'F-2';
      case '/f-3':
        return 'F-3';
      case '/f-e':
        return 'F-4';
      case '/motogp':
        return 'F-5';
      default:
        return '/';
    }
  }
}
