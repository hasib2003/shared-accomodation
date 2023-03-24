import { Component } from '@angular/core';
import { IspaceItemDash } from 'src/app/Interfaces/ispace-item-dash';
import { IheaderLink } from 'src/app/Interfaces/iheader-link';
import { IspaceItem } from 'src/app/Interfaces/ispace-item';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { SpaceItemService } from 'src/app/services/space-item.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent {

  userId:string;
  firstName:string;

  dashboardSpaces:Observable<IspaceItemDash[]>;

  links:IheaderLink[];

   constructor(private authenticateServices: AuthenticateService,private spaceServices:SpaceItemService)
  {
   

    this.authenticateServices.checkSession();

    this.links = [
      {
        description:"Home",
        link:"/user/dashboard"
        
      },
      {
        description:"Add Space",
        link:"/user/post"
      },
      {
        description:"Help",
        link:"/user/help"
      },      
      {
        description:"Switch to Buying",
        link:""
      }
    ]

    this.spaceServices.prepareUserDashboard().then
    (
      (res)=>
      {
        this.dashboardSpaces = res;
      }
    ).catch
    (
      (err)=>
      {
        console.log("in component ", err)
      }
    )

  }


}
