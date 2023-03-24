import { Component, Input, OnInit } from '@angular/core';
import { IspaceItem } from 'src/app/Interfaces/ispace-item';
import { IheaderLink } from 'src/app/Interfaces/iheader-link';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { SpaceItemService } from 'src/app/services/space-item.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {


  @Input() editMode: boolean;

  @Input() allowEdition: boolean;

  @Input() currentSpace$:Observable<IspaceItem>;
  currentSpace:IspaceItem;



  title: string;
  description: string;
  rentPerMonth: number;
  maxRequierd: number;
  currenltyPresent: number;
  university: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;


  links: IheaderLink[];

  disableField: boolean;
  constructor(private AuthenticateService: AuthenticateService,
    private spaceService: SpaceItemService
  ) {



  }

  ngOnInit(): void {

    // this.currentSpace = {} as IspaceItem;


    this.AuthenticateService.checkSession();

    // this.disableField = false;
    // this.editMode = false;
    // this.allowEdition = false;

    this.links = [
      {
        description: "Home",
        link: "/user/dashboard"

      },
      {
        description: "Add Space",
        link: "/user/post"
      },
      {
        description: "Help",
        link: "/user/help"
      },
      {
        description: "Switch",
        link: ""
      }
    ]

    if (this.editMode) {
      this.currentSpace$.subscribe
      (
        (res)=>
        {
          this.currentSpace = res;
          setTimeout(() => {
          this.title =  this.currentSpace["title"];
          this.description = this.currentSpace["description"]
          this.university = this.currentSpace["university"]
          this.address1 = this.currentSpace["address1"]
          this.address2 = this.currentSpace["address2"]
          this.city = this.currentSpace["city"]
          this.state = this.currentSpace["state"]
          this.zipCode = this.currentSpace["zipCode"]
    
          this.rentPerMonth = this.currentSpace["rentPerMonth"];
          this.maxRequierd = this.currentSpace["maxRequierd"];
          this.currenltyPresent = this.currentSpace["currenltyPresent"];  
          
          console.log("edited space ", this.currentSpace)
          console.log("edited title ", this.title)
          console.log("edited desc ", this.description)
          
          }, 200);              
        }
      )
    }

    else {
      this.title = ""
      this.description = ""
      this.university = ""
      this.address1 = ""
      this.address2 = ""
      this.city = ""
      this.state = ""
      this.zipCode = ""
    }



  }

  async RequestToEdit() {
    this.allowEdition = true;
  }


  // needs to be refined further more

  // it needs to emit an event that will close it from the parent element
  async requestToCloseEdit() {
    this.editMode = true;
    this.allowEdition = false;


  }


  async postSpaceRequest() {


  
    
    this.currentSpace["title"] = this.title;
    this.currentSpace["description"] = this.description;
    this.currentSpace["maxRequierd"] = this.maxRequierd;
    this.currentSpace["currenltyPresent"] = this.currenltyPresent;
    this.currentSpace["rentPerMonth"] = this.rentPerMonth;
    this.currentSpace["address1"] = this.address1;
    this.currentSpace["address2"] = this.address2;
    this.currentSpace["state"] = this.state;
    this.currentSpace["zipCode"] = this.zipCode;
    this.currentSpace["city"] = this.city;

    if (!
      (
        this.title === "" ||
        this.description === "" ||
        this.address1 === "" ||
        this.address2 === "" ||
        this.city === "" ||
        this.maxRequierd < 0 ||
        this.currenltyPresent < 0 ||
        this.rentPerMonth < 0 ||
        this.state === "" ||
        this.zipCode === "")
    ) {

      this.currentSpace["title"] = this.title;
      this.currentSpace["description"] = this.description;
      this.currentSpace["maxRequierd"] = this.maxRequierd;
      this.currentSpace["currenltyPresent"] = this.currenltyPresent;
      this.currentSpace["rentPerMonth"] = this.rentPerMonth;
      this.currentSpace["address1"] = this.address1;
      this.currentSpace["address2"] = this.address2;
      this.currentSpace["state"] = this.state;
      this.currentSpace["zipCode"] = this.zipCode;
      this.currentSpace["city"] = this.city;

      this.currentSpace["ownerId"] = "";

      if(!this.editMode)
      {

      this.spaceService.addSpace(this.currentSpace);
      }
      else
      {
        this.pushEditChanges();
      }
    }
    else {
      alert("Please fill out all fields and make sure that all numbers are positive")
    }

    






  
  }

  async pushEditChanges()
  {
    console.log("pushing changes as ", this.city)
  }



}
