import { Component } from '@angular/core';
import { IheaderLink } from 'src/app/Interfaces/iheader-link';
import { IuserSignup } from 'src/app/Interfaces/iuser-signup';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  User: IuserSignup;

  confirmEmail: string;
  confirmPass: string;
  validPasswrod: boolean;
  validSubmission: boolean;

  links: IheaderLink[];


  constructor(private AuthenticateService: AuthenticateService) {


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


    this.confirmEmail = "" as string
    this.confirmPass = "" as string

    this.User = {} as IuserSignup;

    this.validPasswrod = false as boolean ;
    this.validSubmission = false  as boolean;
  }

  checkValidPassword() {


    let capOne = false;
    let capTwo = false;
    let hasDig = false;


    // fetching the value in password field
    let value = this.User.password;

    // obtaining the length of string
    let length = value.length;
    // looping over the ascii of characters
    if (length > 7) {
      for (let index = 0; index < length; index++) {

        var element = value[index];
        var tarAsci = element.charCodeAt(0)

        capOne = capOne || (tarAsci > 64 && tarAsci < 91)
        capTwo = capTwo || (capOne && (tarAsci > 64 && tarAsci < 91))
        hasDig = hasDig || (tarAsci > 47 && tarAsci < 58)


      }
    }

    if (length > 7 && capOne && capTwo && hasDig) {
      return true;
    }

    return false;


  }

  async SignUpRequest() {
    if (!(this.User.password === "" ||
      this.User.email == "")) {


      if (this.checkValidPassword()) {
        
        if (this.User.password === this.confirmPass) {
            this.AuthenticateService.UserSignUp(this.User);
        }
        else {
          alert("Passwords do not match please make sure that you have same password in confirm field")
        }
      }
      else {
        alert("Password is Weak Please use a stronger Password : 8 character long with 2 uppercase and 1 digit")
      }

    }
    else {
      alert("Please fill out all fields")
    }

  }
}
