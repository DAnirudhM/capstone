import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Organizations } from '../models/organizations.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http: HttpClient) { }


  getOrganizations(): Observable<Organizations[]> {
    return this.http.get<Organizations[]>('http://localhost:8082/api/organizations');
  }

}
