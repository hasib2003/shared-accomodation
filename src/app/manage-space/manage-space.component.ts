import { Component } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { SpaceItemService } from '../services/space-item.service';
import { IspaceItem } from '../Interfaces/ispace-item';
import { IspaceInterest } from '../Interfaces/ispace-interest';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-manage-space',
  templateUrl: './manage-space.component.html',
  styleUrls: ['./manage-space.component.css']
})
export class ManageSpaceComponent {

  // component used to mange a specific space, by the ower user

  space:Observable<IspaceItem>;
  
  allInterests: Observable<IspaceInterest[]>;



  constructor(private spaceServ: SpaceItemService, private authenServ: AuthenticateService) {
    authenServ.checkSession();

    this.spaceServ.fetchSpace().then
      (
        (response) => {
          this.space = response;

          this.spaceServ.fetchAllInterests().then
            (
              (IntRes) => {
                this.allInterests = IntRes;

              }
            ).catch
            (
              (err) => {
                alert(err)
              }
            )

        }
      ).catch
      (
        (err) => {
          alert(err)
        }
      )

  }


  async approveInterest()
  {

  }

  async discardInterest()
  {

  }

  async handleEdit()
  {

  }










}
