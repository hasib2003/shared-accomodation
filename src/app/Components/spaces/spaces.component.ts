import { Component } from '@angular/core';
import { SpaceItemService } from 'src/app/services/space-item.service';
import { IheaderLink } from 'src/app/Interfaces/iheader-link';
import { IspaceItem } from 'src/app/Interfaces/ispace-item';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { FooterComponent } from '../footer/footer.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent {

  allSpaces: Observable<IspaceItem[]>;
  links: IheaderLink[];

  isLogIn: boolean;





  constructor(private spaceService: SpaceItemService, private AuthenService: AuthenticateService) {


    this.isLogIn = this.AuthenService.getSession()["status"];

    this.links = [

      {
        description: "Home",
        link: ""
      },
      {
        description: "Sign up",
        link: "/sign-up"
      },
      {
        description: "Sign in",
        link: "/sign-in"
      },
    ]

    if (this.AuthenService.getSession()["status"]) {
      this.links.push({
        description: "Switch to Selling",
        link: "/user/dashboard"
      })
    }

    this.spaceService.fetchAllSpaces().then(
      (res) => {
        this.allSpaces = res;
      }
    )

  }

  BookWithId(spaceId: number) {
    console.log("The request has reached the parent with id ", spaceId)
  }








}
