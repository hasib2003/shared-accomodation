import { Component } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { IheaderLink } from 'src/app/Interfaces/iheader-link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: string;
  password: string;
  links: IheaderLink[];

  async SignInRequest() {

    if (this.email !== "" && this.password !== "") {
      console.log(`${this.email}  ${this.password}`)

      // call to a service to login

      this.AuthenticateService.Userlogin(this.email, this.password);

      setTimeout(
        () => {

          console.log(this.AuthenticateService.getSession())
          if (this.AuthenticateService.getSession()["status"]) {
            this.router.navigate([""]);
          }
          else {
            alert("Invalid Credintials")
          }
        }, 1000
      )


    }
    else {
      alert("Please Fill out all details")
    }

  }


  constructor(private AuthenticateService: AuthenticateService, private router: Router) {

    this.AuthenticateService.checkSession(true)
    this.email = "";
    this.password = "";
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
  }


}
