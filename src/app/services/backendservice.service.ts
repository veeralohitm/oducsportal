import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import auth from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firestore from 'firebase';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

  private userRoleSource = new Subject<string>();
  userRole$ = this.userRoleSource.asObservable();

  constructor( private _afs: AngularFirestore,
    private _storage: AngularFireStorage,
    public afAuth: AngularFireAuth) { }

    loginEmail(formData: { data: { email: any; password: any; }; }){
      return this.afAuth.signInWithEmailAndPassword(formData.data.email, formData.data.password);
        }

    getCollUrls(coll:any) {
      let _coll = "USER_SETTINGS";
      if (coll == "USERS") { _coll = "USER_SETTINGS"; }
      if (coll == "ROLES") { _coll = "USER_ROLES"; }
      if (coll == "QUESTIONS") { _coll = "USER_QUESTIONS"; }      
      return _coll;
    }
    get timestamp() {
      const d = new Date();
      return d;      
    }
  
    setUserDoc(coll:any,docId:any, data:any) {
      const timestamp = this.timestamp;
      console.log(docId);
      var docRef = this._afs.collection(this.getCollUrls(coll)).doc(docId);
      return docRef.set({
        ...data,
        author: docId,
        updatedAt: timestamp,
        createdAt: timestamp
      }).then((res) => { return true; });
    }
    getDoc(coll: string, docId: string) {
      return this._afs.collection(this.getCollUrls(coll)).doc(docId).valueChanges();
    }
    updateDoc(coll: string,docId: string | undefined, data: Partial<unknown>) {
      const timestamp = this.timestamp
      var docRef = this._afs.collection(this.getCollUrls(coll)).doc(docId);
      return docRef.update({
        ...data,
        updatedAt: timestamp,
      }).then((res) => { return true; });
    }

    setRole(role: any) {
      this.userRoleSource.next(role);
    }
    deleteDoc(coll: string, docId: string) {
      const timestamp = this.timestamp
      var docRef = this._afs.collection(this.getCollUrls(coll)).doc(docId);
      return docRef.delete().then((res) => { return true });
    }
    getDocs(coll: string, formData?:any) {    
        return this._afs.collection(this.getCollUrls(coll)).valueChanges();
         }
 
    






  }
