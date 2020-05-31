import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createAcount: boolean = false;

  formGroup: FormGroup;

  rootRef = firebase.database().ref();

  constructor(private formBuilder: FormBuilder, private router: Router, public dataService: DataserviceService) { }

  ngOnInit() { }



  onClickCreateAcount() {

    this.createAcount = !this.createAcount;
  }


  onAddUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if(form.value.password1 != form.value.password2){
      alert("As palavras passe não correspondem!");
      return;
    }


    this.dataService.CreateUser(form.value.username, form.value.password1)
      .subscribe(data => {
        
        if (data.message == "true") {
          alert("Utilizador Registado");
          this.createAcount = false;

        } else if (data.message == "false") {
          alert("Esse username já se encontra em uso");
        }

      })

  }

  login(form: NgForm) {
    var dados;
    if (form.invalid) {
      return;
    }


    this.dataService.LoginUser(form.value.username, form.value.password).subscribe(data => {
      dados = data;
      console.log(dados);
      if (dados == false) {
        alert("Credenciais incorretas!");
      } else if (dados == true) {

        localStorage.setItem('username', form.value.username);
        localStorage.setItem('userpassword', form.value.password);
        window.location.reload();

      }

    })

  }

}
