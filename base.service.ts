import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  requests:any = []


  constructor(private fsDatabase: AngularFirestore) { }

  getFirestoreData(){
  
    this.fsDatabase.collection('requests').ref.onSnapshot(
    
    (snapshot)=> {
      
      snapshot.forEach((doc:any) => {
        this.requests.push({...doc.data(), id: doc.id})
      })
      let html = ""
      this.requests.forEach((request:any) =>
      html += `<li class="d-inline-block list-group-item my-2 bg-warning">${request.text}</li>`
      )
      document.querySelector('.ide')!.innerHTML = html
    }
      
  )}


}
