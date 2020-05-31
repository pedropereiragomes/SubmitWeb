import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database/database';
@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})



export class SubmissionsComponent implements OnInit {
  TaxaMortalidade: string;

  isSignedIn = localStorage.getItem('username');
  usersarray: Array<any> = [];
  id: Array<string> = [];

  constructor() { 

    const rootRef = firebase.database().ref();

    const oneRef = rootRef.child('users/').orderByChild('addedBy').equalTo(localStorage.getItem('username'));
 
     oneRef.once("value").then(snapshot => {
        snapshot.forEach( (item) =>{
          
          this.id.push(item.key);
         
          var itemVal = item.val();
          
          
          this.usersarray.push(itemVal);
        
        }) 
    });
    

     
  
  }

  ngOnInit(): void {
    
    }



 


}
