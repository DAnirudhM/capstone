import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Organizations } from 'src/app/models/organizations.model';
import { OrganizationsService } from 'src/app/services/organizations.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerTitle: string = 'Motor Racing'
  altBrandLogo: string = 'Motor Racing Logo';
  //currentOrganizations!: Observable<Organizations[]>;
  currentOrganizations!: Organizations[];
  string: string = 'sampleurl';

  constructor(private organizationsService: OrganizationsService) {
   
  }

  ngOnInit(): void {
    this.organizationsService.getOrganizations().subscribe({
      next: (value: Organizations[]) => {
        this.currentOrganizations= value;
        // this.currentOrganizations = new Observable();
        // this.currentOrganizations.subscribe(d=> console.log(d));
      },
      error: (error: any) => handleError(error),
      complete: () => void(0)
    });
  }

}
function handleError(error: any): void {
  console.error(error);
  throw new Error('Function not implemented.');
}

