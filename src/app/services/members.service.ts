import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Members } from '../models/members';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private members!: Members[];
  private groups: BehaviorSubject<Members[]> = new BehaviorSubject<Members[]>(this.members);

  constructor(private http: HttpClient) { }

  addMemberToGroup(groupID: number): Observable<Members[]> {

    return this.http.get<Members[]>(`http://127.0.0.1:8082/api/groups/${groupID}/members`)
      .pipe(
        map((response: any) => {
          this.setGroups(response);
          return response;
        })
      );
  }

  getGroups$(): Observable<Members[]> {
    return this.groups.asObservable();
  }

  setGroups(data: Members[]): void {
    this.groups.next(data);
  }

}
