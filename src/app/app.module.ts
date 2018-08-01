import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import {SearchPipe} from './pipes/search';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AuthenticationGuard} from './services/authentication.guard';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'conversation/:uid', component: ConversationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ImageCropperModule,
    NgbModule.forRoot(),
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]
})
export class AppModule { }
