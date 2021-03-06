import { Injectable } from '@angular/core';
import * as firebase from '../../../../node_modules/firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface User {
  email: string;
  uid: string;
}

export interface Message {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  backEndURL = 'http://localhost:3000';
  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private httpClient: HttpClient) {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser = user;
    })
   }

  addChatMessage(msg: string, tripID: string) {
    return this.afs.collection('messages').add({
      msg: msg,
      from: this.currentUser.uid,
      tripID: tripID,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    });  
  }

  addChatMessage2(msg: string, tripID: string) {
    const messageRef = this.afs.collection('messages').doc(tripID);
    return messageRef.update({messages: firebase.default.firestore.FieldValue.arrayUnion(
      {
        msg: msg,
        from: this.currentUser.uid,
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
      }
    )});
  }

  getUsers() {
    return this.afs.collection('users').valueChanges({idField: 'uid'});
    //return this.httpClient.get(this.backEndURL + '/chat/users', {observe: 'body', responseType: 'text' as 'json'}) as Observable<User[]>;
  }

  getUserForMsg(msgFromId, users: any[]) : string{
    for(let usr of users) {
      if(usr.uid === msgFromId) {
        return usr.name;
      }
    }

    return 'Deleted';
  }

  getChatMessages(tripID: string) {
    let users = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log('All users', users);

        return this.afs.collection('messages', ref => ref.where("tripID", "==", tripID).orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
        // return this.httpClient.get(this.backEndURL + '/chat/messages', {observe: 'body', responseType: 'text' as 'json'}) as Observable<Message[]>;
      }),
      map(messages => {
        for(let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }
        console.log('All messages', messages);

        return messages;
      })
    );
  }


  //Reviews
  getReviewsByID(id: string) {
    return this.afs.collection('reviews', ref => ref.where("for", "==", id)).valueChanges();
  }

  getReviewFromUserForUser(fromUser: string, forUser: string) {
    console.log(fromUser, forUser);
    return this.afs.collection('reviews', ref => ref.where("for", "==", forUser).where("from", "==", fromUser)).valueChanges();
  }

  //Comments
  getCommentsByID(id: string) {
    return this.afs.collection('comments', ref => ref.where("for", "==", id).orderBy('createdAt')).valueChanges();
  }

  addComent(forUser: string, from: string, comment: string, img: string, username: string) {
    return this.afs.collection('comments').add({
      for: forUser,
      from: from,
      comment: comment,
      img: img,
      username: username,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    });  
  }
}
