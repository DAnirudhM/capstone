import { Component, OnInit } from '@angular/core';
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
  currentOrganizations!: Organizations[];
  string: string = 'sampleurl';

  constructor(private organizationsService: OrganizationsService) {
    this.organizationsService.getOrganizations().subscribe({
      next: (value: Organizations[]) => {
        this.currentOrganizations = value
      },
      error: (error: any) => handleError(error),
      complete: () => console.log(this.currentOrganizations)
    });
   }

  ngOnInit(): void {
   console.log(this.currentOrganizations);
  }

}
function handleError(error: any): void {
  console.error(error);
  throw new Error('Function not implemented.');
}

