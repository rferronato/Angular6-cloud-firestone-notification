import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { FormsModule } from '@angular/forms';
import { PushNotificationService } from 'ngx-push-notifications';

var firebaseConfig = {
  apiKey: "AIzaSyBsYGCP2yj-JwXd_pI3bKdsnUMjoK6nAfE",
  authDomain: "gestao-ac-723bb.firebaseapp.com",
  databaseURL: "https://gestao-ac-723bb.firebaseio.com",
  projectId: "gestao-ac-723bb",
  storageBucket: "gestao-ac-723bb.appspot.com",
  messagingSenderId: "371293678179"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [PushNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
