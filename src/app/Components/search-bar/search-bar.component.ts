import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  
  country:string;
  city:string;
  maxTenants:string;
  priceRange:string;
  University:string;

  constructor()
  {

    this.country = "Country";
    this.city = "City";
    this.maxTenants = "Max Tenants";
    this.priceRange = "Price Range";
    this.University = "University";
  }





  searchRequest()
  {
    console.log("Recieved a Search Request")

    if(this.country!== "Country" && ((this.University !== "University") || (this.city!=="City")))
    {
      console.log("equest good to go")
    }
    else
    {
      alert("Please Choose Country filter and at least University or City Filter")
    }
  }




}
