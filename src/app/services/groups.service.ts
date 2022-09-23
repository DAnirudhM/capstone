import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { Groups } from '../models/groups.model';
import { Organizations } from '../models/organizations.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private groups: Subject<Groups[]> = new Subject<Groups[]>();

  constructor(private http: HttpClient) { }


  getGroupsByOrganization(id: string): Observable<Groups[]> {
    return this.http.get<Groups[]>(`http://127.0.0.1:8082/api/groups/byorganization/${id}`)
      .pipe(
        map((response: any) => {
          this.setGroups(response);
          return response;
        })
      );
  }

  getGroups$(): Observable<Groups[]> {
    return this.groups.asObservable();
  }

  setGroups(data: Groups[]): void {
    this.groups.next(data);
  }


}
