import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { SpacesComponent } from './Components/spaces/spaces.component';
import { SpaceItemComponent } from './Components/space-item/space-item.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { DashboardUserComponent } from './Components/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './Components/dashboard-admin/dashboard-admin.component';
import { PostAddComponent } from './Components/post-add/post-add.component';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { ManageInterestComponent } from './Components/manage-interest/manage-interest.component';
import { SpaceItemUserDashboardComponent } from './Components/space-item-user-dashboard/space-item-user-dashboard.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FooterComponent } from './Components/footer/footer.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { ManageSpaceComponent } from './manage-space/manage-space.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpacesComponent,
    SpaceItemComponent,
    SignInComponent,
    SignUpComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    PostAddComponent,
    SpaceItemUserDashboardComponent,
    SearchBarComponent,
    ManageInterestComponent,
    FooterComponent,
    SideBarComponent,
    ManageSpaceComponent,

  ],
  imports: [


    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
     {path: 'space/manage', component:ManageSpaceComponent},
     {path: '', component: SpacesComponent},
     {path: 'sign-in', component: SignInComponent},
     {path: 'sign-up', component: SignUpComponent},
     {path: 'user/dashboard', component: DashboardUserComponent},
     {path: 'admin/dashboard', component: DashboardAdminComponent},
     {path: 'user/post', component: PostAddComponent},

    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
