import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

interface Post {
  title: string;
  content: string;
}
interface PostId extends Post {
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

  title:string;
  content:string;

  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;
  
  constructor(private afs: AngularFirestore, private _pushNotificationService: PushNotificationService) {

  }

  ngOnInit() {

    this._pushNotificationService.requestPermission();

    this.postsCol = this.afs.collection('posts');
    //this.posts = this.postsCol.valueChanges();
    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          console.log('atualizei');
          this.myFunction(data.title, data.content);
          return { id, data };
        })
      })
  }

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content});
  }

  getPost(postId) {
    this.postDoc = this.afs.doc('posts/'+postId);
    this.post = this.postDoc.valueChanges();
    console.log('passou por aqui quando atualizei....');
  }

  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }

  myFunction(title2, body) {
    const title = title2;
    const options = new PushNotificationOptions();
    options.body = body;


    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
      (err) => {
        console.log(err);
      });
  }
}
