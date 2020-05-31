import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  id: string;

  nome: string;
  pais: string;
  idade: string;
  formRadioSex: string;
  numeronif: string;
  formRadioValue : string ;
  formRadioOptions : string[] = ['Singular', 'Organização'];
  formRadioSexOptions: string[] = ['Masculino', 'Feminino'];

  formRadioValueState: string;
  formRadioStateOptions : string[] = ['Suspeito','Não Confirmado','Confirmado','Óbito','Recuperado'];
  


  constructor(private _Activatedroute:ActivatedRoute){
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    

    const rootRef = firebase.database().ref();
    const oneRef = rootRef.child('users/'+this.id)
    oneRef.once("value").then(snapshot => {
    var userdata =   snapshot.val();
    this.idade = userdata.Nome;
    this.pais = userdata.Pais;
    this.idade = userdata.Idade;
    this.numeronif = userdata.NIF;
    this.formRadioSex = userdata.Sexo;
    this.formRadioValueState = userdata.Estado;
    });

  }


 
 
  updateUser(){
    const db = firebase.database().ref();

   var Estado  = this.formRadioValueState;
   var Idade = this.idade
   var NIF= this.numeronif
   var Pais = this.pais
   var Sexo = this.formRadioSex
   

   var data = {Estado,Idade,NIF,Pais,Sexo};

    db.child('users/' + this.id).update(data);
    
  }
  
  
}
