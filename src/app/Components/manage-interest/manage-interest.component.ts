import { Component,Input } from '@angular/core';
import { IspaceInterest } from 'src/app/Interfaces/ispace-interest';
import { SpaceItemService } from 'src/app/services/space-item.service';
@Component({
  selector: 'app-manage-interest',
  templateUrl: './manage-interest.component.html',
  styleUrls: ['./manage-interest.component.css']
})
export class ManageInterestComponent {

  @Input() interest:IspaceInterest;

  constructor(private spaceServ:SpaceItemService)
  {
    // this.spaceServ.fetchALlInterests().then
    // (
    //   (response)=>
    //   {
    //     this.interest 
    //   }
    // )
  }


}
