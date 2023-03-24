import { Component,Input, Output,EventEmitter } from '@angular/core';

import { IspaceItem } from 'src/app/Interfaces/ispace-item';
import { SpaceItemService } from 'src/app/services/space-item.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-space-item',
  templateUrl: './space-item.component.html',
  styleUrls: ['./space-item.component.css']
})
export class SpaceItemComponent {

@Input()Item: IspaceItem ;
@Output() BookSpace = new EventEmitter<number>();  

interested:boolean;
loggedIn:boolean;
message : string;

bookReq (){
  
  console.log("a request to book ", this.Item.title)

  if(this.loggedIn)
  {
    // we shall mark the space now 
    this.SpaceService.markSpaceInterest(this.Item["spaceId"],this.message);
  }
  else
  {
    this.router.navigate(["/sign-in"])
  }



}

manageInterest()
{
  if(this.loggedIn){

    this.interested = !this.interested;
  }
  else
  {
    this.router.navigate(["/sign-in"])
  }


}



constructor 
// ()
(
  private SpaceService:SpaceItemService,
  private AuthenService : AuthenticateService,
  private router:Router,
 )
{
  this.interested = false;
  this.loggedIn = this.AuthenService.getSession()["status"];
  

}

}
