import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UpdateqaService {

  constructor(private firestore: AngularFirestore) { }

  addqa(qa: any): Promise<any> {
    return this.firestore.collection('qa').add(qa);
  }


  getqas(): Observable<any> {
    return this.firestore.collection('qa', ref => ref.orderBy('Updateddate', 'asc')).snapshotChanges();
  }

  deleteqa(id: string): Promise<any> {
    return this.firestore.collection('qa').doc(id).delete();
  }

  getqa(id: string): Observable<any> {
    return this.firestore.collection('qa').doc(id).snapshotChanges();
  }

  updateqa(id: string, data:any): Promise<any> {
    return this.firestore.collection('qa').doc(id).update(data);
  }
  updatereply(id: string, data:any): Promise<any> {
    return this.firestore.collection('qa').doc(id).update(data);
  }

}
