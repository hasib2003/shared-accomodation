import { Component, Input } from '@angular/core';
import { IspaceItem } from 'src/app/Interfaces/ispace-item';
import { IspaceItemDash } from 'src/app/Interfaces/ispace-item-dash';
import { SpaceItemService } from 'src/app/services/space-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-space-item-user-dashboard',
  templateUrl: './space-item-user-dashboard.component.html',
  styleUrls: ['./space-item-user-dashboard.component.css']
})
export class SpaceItemUserDashboardComponent {



  @Input() spaceDashboard: IspaceItemDash;


  spaceItemActual: IspaceItem;
  openSpace: boolean;

  constructor(private spaceServ: SpaceItemService,
    private router: Router) {


    // console.log("an item in dash view ", this.spaceDashboard)

    this.openSpace = false;
    // this.spaceItemActual["title"] = this.spaceDashboard["title"];
    // this.spaceItemActual["description"] = this.spaceDashboard["description"];
    // this.spaceItemActual["title"] = this.spaceDashboard["title"];
  }

  showInterestRequest() {

    // call to a service that will load the requests from the server
    this.spaceServ.mangeFetchSpace(this.spaceDashboard.spaceId);
    this.router.navigate(["/space/manage"])




    this.openSpace = true;


  }





}
