import { Injectable } from '@angular/core';
import { IuserSession } from '../Interfaces/iuser-session';
import { IuserSignup } from '../Interfaces/iuser-signup';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Firestore, query, collection, addDoc, CollectionReference, snapshotEqual, getDocs, where, and } from '@angular/fire/firestore';

@Injectable({

  providedIn: 'root'
})
export class AuthenticateService {

  //  injecting fire store api
  private fireStore: Firestore = inject(Firestore);

  users$: Observable<IuserSignup[]>;
  usersCollection: CollectionReference;

  // usefull information about the user
  session: IuserSession;
  // timeout value in minutes
  timeout: number;
  status: boolean;



  constructor(private router: Router) {


    this.status = false;
    this.session = {} as IuserSession;
    this.usersCollection = collection(this.fireStore, "users");
    this.timeout = 10;
  }

  // when user login this is called
  // to save the information in session
  setSession(userName: string, userId: string, timeout: number) {
    this.session.userName = userName;
    this.session.userId = userId;
    this.timeout = timeout;
    this.status = true;
    console.log("session created for ", this.session.userName)
  }

  // it is called when we need some specific info
  // about current session
  getSession() {
    if (this.status) {
      // destorying after timeout
      setTimeout(() => {
        this.destroySession()
      }, this.timeout * 60 * 1000 * 5);

      return { "status": this.status, "user": { "userName": this.session.userName, "userId": this.session.userId } };

    }
    return { "status": this.status, "user": {} };
  }

  // it is called on every page in the conctructor
  checkSession(signInPage: void | Boolean) {

    console.log(this.getSession())


    if(signInPage === true)
    {
      if(this.getSession()["status"])
      {
        this.router.navigate(["/user/dashboard"])
      }
    }
    else
    {
      if(!this.getSession()["status"])
      {
        this.router.navigate(["/sign-in"])
      }
    }


  }

  // will be called automatically after
  // timeout time and can also be called
  // implicitly
  destroySession() {
    this.session.userName = "";
    this.session.userId = "";
    this.status = false;
    alert("destroyed")
    console.log("session has been destroyed")
  }

  // used for the primary authentication

  async Userlogin(userName: string, password: string) {

    // destroying any session before login request
    // this can be used to get all the space from the server
    // this.users$ = collectionData(this.usersCollection) as Observable<IuserSignup[]>;



    const q = query(this.usersCollection, where("email", "==", userName), where("password", "==", password));


    const resultAsSnap = await getDocs(q);

    resultAsSnap.forEach
      (
        (doc) => {
          const user = doc.data();
          this.setSession(user["firstName"], doc.id, 5)        
        }
      )
  }

  // when user wants to sign up

  async UserSignUp(user: IuserSignup) {
    //     // calling the firebase to regiser the user 

    // checking if the email is registered not already

    const q = query(this.usersCollection, where("email", "==", user["email"]));


    getDocs(q).then(
      (SnapRes)=>
      {
        if(SnapRes.docs.length > 0)
        {
          alert("User Already Registered, Sign In")
          this.router.navigate(["/sign-in"])

        }
        else
        {
          addDoc(this.usersCollection, <IuserSignup>user).then
          (
            (response) => {
              console.log(response);
              alert("Registered Successfully")
              this.router.navigate(["/sign-in"])
            }
    
          ).catch(
            (error) => {
              console.log(error)
            }
          )
        }
      })

    // if successful
    // this.setSession(user.firstName+user.lastName, returnedUserIdValue)
  }



}
