import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Groups } from '../models/groups.model';
import { Organizations } from '../models/organizations.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private group!: Groups[];
  private groups: BehaviorSubject<Groups[]> = new BehaviorSubject<Groups[]>(this.group);

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

  getAllGroups():Observable<Groups[]>{
    return this.http.get<Groups[]>(`http://127.0.0.1:8082/api/groups`)
    .pipe(
      map((response: any) => {
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

  refreshGroups(orgId:string): void {
    this.getGroupsByOrganization(orgId)
    .subscribe({
      next: (value: Groups[]) => this.setGroups(value),
      error: (error: any) => console.log(error),
      complete: () => void (0)
    });
   
  }


  addGroup(group: Groups): Observable<Groups> {
    return this.http.post<Groups>(`http://127.0.0.1:8082/api/groups/`, group);
  }

  updateGroup(group: Groups): Observable<Groups> {
    return this.http.put<Groups>(`http://127.0.0.1:8082/api/groups/`, group);
  }

  deleteGroup(id: number): Observable<Groups> {
    return this.http.delete<Groups>(`http://127.0.0.1:8082/api/groups/${id}`);
  }

}


