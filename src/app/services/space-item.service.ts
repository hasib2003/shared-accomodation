import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { IspaceItem } from '../Interfaces/ispace-item';
import { IspaceItemDash } from '../Interfaces/ispace-item-dash';

import { Observable,of } from 'rxjs';
import { Firestore, query, collection, doc, addDoc, CollectionReference, snapshotEqual, getDocs, where, and } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { IspaceInterest } from '../Interfaces/ispace-interest';


@Injectable({
  providedIn: 'root'
})
export class SpaceItemService {

  private fireStore: Firestore = inject(Firestore);


  // points to the main collection of all spaces
  spaceCollection: CollectionReference;

  // refers to the collection that contains all the interests

  interestCollection: CollectionReference;

  // used for managing space 

  currentSpaceId: string;



  constructor(private AuthenticateService: AuthenticateService) {

    this.spaceCollection = collection(this.fireStore, "spaces");
    this.interestCollection = collection(this.fireStore, "interests");
    this.currentSpaceId = ""

  }

  // --setters--

  async addSpace(spaceItem: IspaceItem)
  // :Promise<boolean>
  {
    // if we have some session 
    const session = this.AuthenticateService.getSession();

    if (session["user"]["userId"]) {
      spaceItem["ownerId"] = session["user"]["userId"];

    }

    if (session["status"]) {
      addDoc(this.spaceCollection, <IspaceItem>spaceItem).then
        (
          (response) => {
            console.log(response);
          }

        ).catch(
          (error) => {
            console.log(error)
          }
        )
      // call to firebase 
      // if successfull

      // return true;

    }





  }

  async editSpace(sapceItem: IspaceItem) {
    // if we have some session 
    const session = this.AuthenticateService.getSession();

    if (session["status"]) {
      // call to firebase and mark it in interested 

      // first search if we have this id on one of the spaceitems
      // then update it
    }

  }

  // called when a user shows his/ her interst in a space
  async markSpaceInterest(spaceId: string, message: string) {
    // if we have some session 
    const session = this.AuthenticateService.getSession();

    if (session["status"]) {

      let interest: IspaceInterest = {} as IspaceInterest;

      interest["customerId"] = session["user"]["userId"];
      interest["message"] = message;
      interest["spaceId"] = spaceId;
      interest["status"] = false;
      interest["interestId"] = "";




      addDoc(this.interestCollection, <IspaceInterest>interest).then
        (
          (response) => {
            console.log(response);
          }

        ).catch(
          (error) => {
            console.log(error)
          }
        )
      // call to firebase 
      // if successfull

      // return true;

    }





  }

  // called when the owner of the space rejects the interest 
  // it remove the interest for that space
  async discardInterest() {
    // if we have some session 
    const session = this.AuthenticateService.getSession();

    if (session["status"]) {
      // call to firebase and mark it in interested 
    }
  }

  // called when the space owner approves the interest of the 
  // person it will update the numbers of tenants in the database
  async approveInterest() {
    // if we have some session 
    const session = this.AuthenticateService.getSession();

    if (session["status"]) {
      // call to firebase and mark it in interested 
    }
  }

  //--getters--
  // get all space listed by a 
  // specific user called for user dashboard

  async prepareUserDashboard(): Promise<Observable<IspaceItemDash[]>>
  // : spaceItemDashboard[]
  {
    // if we have some session 
    let dashItems: IspaceItemDash[] = [];
    const session = this.AuthenticateService.getSession();
    if (session["status"]) {


      // first we shall obtain a list of all spaces listed by the user

      const ownerId = session["user"]["userId"];
      let spaceIdList: string[] = [];
      let spaceTitleList: string[] = [];
      let spaceDescList: string[] = [];

      let spaceTotalInterest: number[] = [];

      const allSpaceFinderQuery = query(this.spaceCollection, where("ownerId", "==", ownerId))

      getDocs(allSpaceFinderQuery).then
        (
          (snapShotOfAllDocs) => {
            snapShotOfAllDocs.forEach
              (
                (doc) => {
                  spaceIdList.push(doc.id);
                  spaceTitleList.push(doc.data()["title"]);
                  spaceDescList.push(doc.data()["description"]);
                  console.log(`the list of space id of ${session["user"]["userName"]} `, spaceIdList, spaceTitleList);
                }
              )

            let tempItem: IspaceItemDash = {} as IspaceItemDash;



            console.log("-- > ", spaceIdList.length)
            for (let iterator = 0; iterator < spaceIdList.length; iterator++) {


              let spaceId: string = spaceIdList[iterator];

              console.log("looping over space id ", spaceId, " in interest collection")

              const queryForFindingTotalInterest = query(this.interestCollection, where("spaceId", "==", spaceId));
              let tempTotal: number = 0;
              getDocs(queryForFindingTotalInterest).then
                (
                  (response) => {
                    response.forEach
                      (
                        (doc) => {
                          console.log("int doc is ", doc.data()["spaceId"])
                          tempTotal = tempTotal + 1;
                        }
                      )

                    spaceTotalInterest.push(tempTotal);
                    tempTotal = 0;
                    tempItem = {} as IspaceItemDash;

                    tempItem["description"] = spaceDescList[iterator];
                    tempItem["title"] = spaceTitleList[iterator];
                    tempItem["spaceId"] = spaceIdList[iterator];
                    tempItem["totalInterests"] = spaceTotalInterest[iterator];

                    console.log("spaceDescList ", spaceDescList[iterator]);



                    console.log("temp Item is ", tempItem)
                    dashItems.push(tempItem);
                    console.log("iterator is ", iterator)

                  }


                ).catch(
                  (errors) => {
                    console.log(errors)
                  }
                )


            }

          }

        ).catch(
          (err) => {
            console.log(err)

          }
        )



    }


    return of(dashItems);

  }

  // called before calling the fetch space

  mangeFetchSpace(spaceId: string) {
    this.currentSpaceId = spaceId;
  }
  // called when view specific space
  // for editing or managing also

  async fetchSpace(): Promise<Observable<IspaceItem>> {

    let space: IspaceItem = {} as IspaceItem;

    // if we have some session 
    const session = this.AuthenticateService.getSession();
    if (session["status"]) {

      if (this.currentSpaceId !== "") {
        const spaceQuery = query(this.spaceCollection, where("__name__", "==", this.currentSpaceId));

        getDocs(spaceQuery).then(
          (snapShot) => {

            const temp = snapShot.docs[0].data();
            space["address1"] = temp["address1"];
            space["address2"] = temp["address2"];
            space["title"] = temp["title"];
            space["city"] = temp["city"];
            space["currenltyPresent"] = temp["currenltyPresent"];
            space["description"] = temp["description"];
            space["maxRequierd"] = temp["maxRequierd"];
            space["ownerId"] = temp["ownerId"];
            space["rentPerMonth"] = temp["rentPerMonth"];
            space["state"] = temp["state"];
            space["zipCode"] = temp["zipCode"];


          }
        ).catch
          (
            (err) => {
              console.log(err)
            }
          )



      }
    }

    return of(space);

  }
  
  async fetchAllInterests() : Promise<Observable<IspaceInterest[]>>
  {
    let allInterests: IspaceInterest[] = [];

    if(this.currentSpaceId!=="")
    {
      const spaceQuery = query(this.interestCollection, where("spaceId", "==", this.currentSpaceId));

      let tempInterest = {} as IspaceInterest;
  
      getDocs(spaceQuery).then(
        (snapShot) => {
            snapShot.forEach
            (
              (doc)=>
              {
                let currentDoc = doc.data();

                tempInterest["customerId"] = currentDoc["customerId"];
                tempInterest["spaceId"] = currentDoc["spaceId"];
                tempInterest["interestId"] = doc.id;
                tempInterest["message"] = currentDoc["message"];
                tempInterest["status"] = currentDoc["status"];



                allInterests.push(tempInterest);
                tempInterest = {} as IspaceInterest
              }
            )            
        }
      )
      .catch(
        (err)=>
        {
          console.log(err)
        }
      )
    }
    return of(allInterests);
  }
  // called on the home page
  // no need for login
  async fetchAllSpaces(): Promise<Observable<IspaceItem[]>>
  // : spaceItem[]
  {
    const q = query(this.spaceCollection, where("title", "!=", ""));

    let spaceItems: IspaceItem[] = [];
    let tempItem: IspaceItem = {} as IspaceItem;

    getDocs(q).then
      (
        (results) => {
          results.forEach
            (
              (doc) => {
                const data = doc.data()
                tempItem["title"] = data["title"];
                tempItem["description"] = data["description"];
                tempItem["maxRequierd"] = data["maxRequierd"];
                tempItem["rentPerMonth"] = data["rentPerMonth"];
                tempItem["currenltyPresent"] = data["currenltyPresent"];
                tempItem["university"] = data["university"];
                tempItem["ownerId"] = data["ownerId"];
                tempItem["spaceId"] = data["spaceId"];
                tempItem["zipCode"] = data["zipCode"];
                tempItem["state"] = data["state"];
                tempItem["address1"] = data["address1"];
                tempItem["address2"] = data["state"];
                tempItem["city"] = data["city"];

                tempItem["spaceId"] = doc.id;

                spaceItems.push(tempItem);
                tempItem = {} as IspaceItem;
              }
            )
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )


    return of(spaceItems);

  }
}
