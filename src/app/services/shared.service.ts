import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Groups } from '../models/groups.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private group!: Groups;
  viewSearchList$!: Subject<Groups>;

  constructor() { 
    //this.viewSearchList$ =  new Subject<Groups>();
    this.viewSearchList$ =  new BehaviorSubject<Groups>(this.group);
  }

  routeSearch(group:Groups){
    this.viewSearchList$.next(group);
  }

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
        return 'F-E';
      case '/motogp':
        return 'Moto GP';
      default:
        return '/';
    }
  }

  getRouterURLByOrgName(orgName: string): string {
    switch (orgName) {
      case 'F-1':
        return 'f-1';
      case 'F-2':
        return 'f-2';
      case 'F-3':
        return 'f-3';
      case 'F-E':
        return 'f-e';
      case 'Moto GP':
        return 'motogp';
      default:
        return '/';
    }
  }

}
