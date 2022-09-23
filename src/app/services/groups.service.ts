import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Groups } from '../models/groups.model';
import { Organizations } from '../models/organizations.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService{

  organization!:Organizations;

  constructor(private http: HttpClient) { }


  getGroupsByOrganization(id:string):Observable<Groups[]>{
    return this.http.get<Groups[]>(`http://127.0.0.1:8082/api/groups/byorganization/${id}`);
  }
}
