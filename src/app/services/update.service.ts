import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private firestore: AngularFirestore) { }

  addpost(post: any): Promise<any> {
    return this.firestore.collection('post').add(post);
  }


  getposts(): Observable<any> {
    return this.firestore.collection('post', ref => ref.orderBy('Updateddate', 'asc')).snapshotChanges();
  }

  deletepost(id: string): Promise<any> {
    return this.firestore.collection('post').doc(id).delete();
  }

  getpost(id: string): Observable<any> {
    return this.firestore.collection('post').doc(id).snapshotChanges();
  }

  updatepost(id: string, data:any): Promise<any> {
    return this.firestore.collection('post').doc(id).update(data);
  }

}
