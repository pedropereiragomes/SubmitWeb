import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataserviceService } from '../dataservice.service';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  constructor(public db: AngularFireDatabase, public dataService: DataserviceService) { }

  ngOnInit(): void {
  }
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

  isSignedIn = localStorage.getItem('username');

 
  
  arrayInstituicao : Array<any> = [];

  
  tamanhoOrganizacao : number = 0;

  onSubmit(){
    if(this.numeronif.length < 8){
      alert("Insira um NIF valido");
      return;
    }

    var nifInUse = 0;
    var d = new Date();
 
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var dateStr = date + "/" + month + "/" + year;


  this.dataService.getNif(this.numeronif).subscribe( data =>{
     
      if(data.message == "true"){
        nifInUse = 1;
      }
    
      if(nifInUse == 1){
        alert("O NIF submetido já está associado a outro utilizador");
        return;
      }


    
      this.db.list('users').push({
      
        Nome: this.nome,
        NIF: this.numeronif,
        Tipo: this.formRadioValue,
        Estado: this.formRadioValueState,
        Pais: this.pais,
        Idade : this.idade,
        Sexo: this.formRadioSex,
        Data: dateStr,
        addedBy: localStorage.getItem('username'),
      });
  
     this.nome = '';
     this.numeronif = '';
     this.formRadioValueState = '';
     this.pais = '';
     this.idade = '';
     this.formRadioSex = '';
  
     alert("Submissão efetuada com sucesso");
    
    
    
    });

    
  }

  addInstituicao(){
    if(this.numeronif.length < 8){
      alert("Insira um NIF valido");
      return;
    }
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();
    var nifInUse = 0;
    var dateStr = date + "/" + month + "/" + year;

    this.dataService.getNif(this.numeronif).subscribe( data =>{


      if(data.message == "true"){
        nifInUse = 1;
      }
    
      if(nifInUse == 1){
        alert("O NIF submetido já está associado a outro utilizador");
        return;
      }



    this.arrayInstituicao.push({
      Nome: this.nome,
      NIF: this.numeronif,
      Tipo: this.formRadioValue,
      Estado: this.formRadioValueState,
      Pais: this.pais,
      Idade : this.idade,
      Sexo: this.formRadioSex,
      Data: dateStr,
      addedBy: localStorage.getItem('username'),
    })
    this.tamanhoOrganizacao = this.arrayInstituicao.length;
    
    
    this.nome = '';
    this.numeronif = '';
    this.formRadioValueState = '';
    this.pais = '';
    this.idade = '';
    this.formRadioSex = '';

  });

  }



  submeterSubmicao(){
    
    for (let index = 0; index < this.arrayInstituicao.length; index++) {
    this.db.list('users').push(this.arrayInstituicao[index]);
    }
    
    
    this.nome = '';
    this.numeronif = '';
    this.formRadioValueState = '';
    this.pais = '';
    this.idade = '';
    this.formRadioSex = '';

    alert("Dados Submetidos com sucesso!");
   
  }

  

}
