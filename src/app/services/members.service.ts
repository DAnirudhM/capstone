import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Members } from '../models/members';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseURL:string = 'http://127.0.0.1:8082/api/groups';
  private members!: Members[];


  constructor(private http: HttpClient) { }

  addMemberToGroup(groupID: number, members: Members): Observable<Members> {

    return this.http.post<Members[]>(`${this.baseURL}/${groupID}/members`,members)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  updateMemeberInGroup(groupID: number, members: Members): Observable<Members>{
    return this.http.put<Members[]>(`${this.baseURL}/${groupID}/members`,members)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  removeTeamMember(groupID:number,memberId:number):Observable<Members>{
    return this.http.delete<Members[]>(`${this.baseURL}/${groupID}/members/${memberId}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }


}
