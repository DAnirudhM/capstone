import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Organizations } from 'src/app/models/organizations.model';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { SharedService } from 'src/app/services/shared.service';

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
  searchKey!: string;
  isSearchEnabled!: boolean;


  constructor(private organizationsService: OrganizationsService, private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.organizationsService.getOrganizations().subscribe({
      next: (value: Organizations[]) => {
        this.currentOrganizations = value;
      },
      error: (error: any) => this.handleError(error),
      complete: () => { }
    });
  }

  openSearchDialog(e: any) {
    this.isSearchEnabled = e;
  }

  handleError(error: any): void {
    console.error(error);
    throw new Error('Function not implemented.');
  }

}




