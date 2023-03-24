import { Input, Component } from '@angular/core';
import { IheaderLink } from 'src/app/Interfaces/iheader-link';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() mainLinks: IheaderLink[];

  user: string;
  loggedInStatus: boolean;


  constructor(private authenServ: AuthenticateService) {
    this.user = "";
    this.loggedInStatus = false;

    this.mainLinks = [
      { description: "Home", link: "" },
      { description: "Sign up", link: "/sign-up" },
      { description: "Sign in", link: "/sign-in" },
    ]

    const session = this.authenServ.getSession();

    this.loggedInStatus = session["status"];
    if (session["status"]) {
      this.user = session["user"]["userName"]
    }


  }

  logout ()
  {
    this.authenServ.destroySession();

    const session = this.authenServ.getSession();
    this.loggedInStatus = session["status"];
    if (session["status"]) {
      this.user = session["user"]["userName"]
    }

  }




}
