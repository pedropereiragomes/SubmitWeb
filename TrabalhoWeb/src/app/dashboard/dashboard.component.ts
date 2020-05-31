import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataserviceService } from '../dataservice.service';
import { AngularFireDatabase } from '@angular/fire/database'

import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {


  //Array com todos os Users, a informação é extraida dele para as restantes variaveis
  users: Array<Object> = [];
  //Numero de submissoes
  nSubmissions: number = 0;
  //Todos os estados possiveis para uma submissao
  Estados: String[] = ["Suspeito", "Não Confirmado", "Confirmado", "Óbito", "Recuperado"];
  //Array com o numero de infetados para cada categoria
  NumeroDeInfectados: number[] = [0, 0, 0, 0, 0];

  //Array com os meses do ano
  mesesDoAno: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


  //Array com as datas de submissão
  dateSubmissionArraySuspeito: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  dateSubmissionArrayNConfirmado: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  dateSubmissionArrayConfirmado: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  dateSubmissionArrayNObito: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  dateSubmissionArrayNRecuperado: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  //Arrays com o numero de confirmados,nao confirmados,obitos etc etc por posição 
  menstatearray: number[] = [0, 0, 0, 0, 0];
  womanstatearray: number[] = [0, 0, 0, 0, 0];

  //Array com o numero de pessoas percentencentes a uma faxa etaria
  ageArray: number[] = [0, 0, 0, 0, 0];

  TaxaMortalidade: string;

  //Array com todos os paises registados
  Paises: String[] = [];
  //Ultimo Pais que registou um relatorio.
  PaisSubmetido: string;
  //Array que tem numero de submissoes por pais
  PessoasPorPais: number[] = [];

  constructor(db: AngularFireDatabase) {


    db.list('users').valueChanges()
      .subscribe((data) => {

        this.users = data;
        console.log(data);
        this.nSubmissions = this.users.length;

        //Loop para Obter todos países com registos

        for (let index = 0; index < this.users.length; index++) {

          if (this.Paises.includes(this.users[index]['Pais'])) {

          } else {
            this.Paises.push(this.users[index]['Pais']);

          }

        }
        //Função que verifica quantas submissoes existem e a que pais pertencem
        var auxVar = 0;
        for (let a = 0; a < this.Paises.length; a++) {
          for (let index = 0; index < this.users.length; index++) {
            if (this.Paises[a] == this.users[index]['Pais']) {
              auxVar++;
            }
          }

          this.PessoasPorPais.push(auxVar);
          auxVar = 0;
        }


        console.log(this.PessoasPorPais);
        console.log(this.Paises);


        //loop que verifica o numero de infectados por cada estado
        this.NumeroDeInfectados = [0, 0, 0, 0,0];
        for (let index = 0; index < this.users.length; index++) {

          if (this.users[index]['Estado'] == "Suspeito") {

            this.NumeroDeInfectados[0]++;

          } else if (this.users[index]['Estado'] == "Não Confirmado") {

            this.NumeroDeInfectados[1]++;

          } else if (this.users[index]['Estado'] == "Confirmado") {

            this.NumeroDeInfectados[2]++;
          } else if (this.users[index]['Estado'] == "Óbito") {

            this.NumeroDeInfectados[3]++;

          } else if (this.users[index]['Estado'] == "Recuperado") {

            this.NumeroDeInfectados[4]++;
          }


        }

        //Loop que guarda todas as datas
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index]['Data'] != undefined) {

            var array = this.users[index]['Data'].split('/');

            if (this.users[index]['Estado'] == "Suspeito") {

              this.dateSubmissionArraySuspeito[array[1] - 1]++;

            } else if (this.users[index]['Estado'] == "Não Confirmado") {

              this.dateSubmissionArrayNConfirmado[array[1] - 1]++;

            } else if (this.users[index]['Estado'] == "Confirmado") {

              this.dateSubmissionArrayConfirmado[array[1] - 1]++;
            } else if (this.users[index]['Estado'] == "Óbito") {

              this.dateSubmissionArrayNObito[array[1] - 1]++;
            } else if (this.users[index]['Estado'] == "Recuperado") {

              this. dateSubmissionArrayNRecuperado[array[1] - 1]++;
            }
           
          }
        }

        //Este loop tem o objetivo de preencher o array menstatearray [Suspeito", "Não Confirmado", "Confirmado", "Óbito,"Recuperado"]
        //percorrendo o array de users e a cada user do sexo masculino verifica qual o estado e faz a atribuição no array
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index]['Sexo'] != undefined && this.users[index]['Sexo'] == "Masculino") {

            if (this.users[index]['Estado'] == "Suspeito") {
              this.menstatearray[0]++;
            }
            if (this.users[index]['Estado'] == "Não Confirmado") {
              this.menstatearray[1]++;
            }
            if (this.users[index]['Estado'] == "Confirmado") {
              this.menstatearray[2]++;
            }
            if (this.users[index]['Estado'] == "Óbito") {
              this.menstatearray[3]++;
            }
            if (this.users[index]['Estado'] == "Recuperado") {
              this.menstatearray[4]++;
            }
          } else if (this.users[index]['Sexo'] != undefined && this.users[index]['Sexo'] == "Feminino") {

            if (this.users[index]['Estado'] == "Suspeito") {
              this.womanstatearray[0]++;
            }
            if (this.users[index]['Estado'] == "Não Confirmado") {
              this.womanstatearray[1]++;
            }
            if (this.users[index]['Estado'] == "Confirmado") {
              this.womanstatearray[2]++;
            }
            if (this.users[index]['Estado'] == "Óbito") {
              this.womanstatearray[3]++;
            }
            if (this.users[index]['Estado'] == "Recuperado") {
              this.womanstatearray[4]++;
            }

          }

        }

        for (let index = 0; index < this.users.length; index++) {

          if (this.users[index]['Idade'] != undefined) {
            if (this.users[index]['Idade'] <= 25 && (this.users[index]['Estado'] == "Óbito")) {
              this.ageArray[0]++;
            }
            if ((this.users[index]['Idade'] <= 50 && (this.users[index]['Idade'] > 25)) && (this.users[index]['Estado'] == "Óbito")) {
              this.ageArray[1]++;
            }
            if ((this.users[index]['Idade'] <= 75 && (this.users[index]['Idade'] > 50)) && (this.users[index]['Estado'] == "Óbito")) {
              this.ageArray[2]++;
            }
            if ((this.users[index]['Idade'] > 75) && (this.users[index]['Estado'] == "Óbito")) {
              this.ageArray[3]++;
            }

          }

        }


        this.TaxaMortalidade = ((this.NumeroDeInfectados[3] / this.users.length) * 100).toFixed(1);
        this.PaisSubmetido = this.users[(this.users.length - 1)]['Pais'];


        //Atribuição de valores aos gráficos

        this.horizontalbar1[0].x = this.ageArray;

        this.graph.data[0].x = this.Estados;
        this.graph.data[0].y = this.NumeroDeInfectados;

        this.graph2.data[0].labels = this.Paises;
        this.graph2.data[0].values = this.PessoasPorPais;



        this.line1.y = this.dateSubmissionArrayConfirmado;
        this.line2.y = this.dateSubmissionArrayNConfirmado;
        this.line3.y = this.dateSubmissionArrayNObito;
        this.line4.y = this.dateSubmissionArraySuspeito;
        this.line5.y = this.dateSubmissionArrayNRecuperado;
        this.linelayout.yaxis.range = [0, this.nSubmissions - 10];


        this.men.y = this.menstatearray;
        this.woman.y = this.womanstatearray;
        });

  }

  public graph = {
    data: [

      { x: [], y: [], type: 'bar' },
    ],

    layout: { width: 550, height: 500, title: 'Números Atuais' }

  };



  public graph2 = {
    data: [
      {
        type: "pie",
        values: [],
        labels: [],
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true
      }],

    layout: {
      height: 400,
      width: 450,
      margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
      showlegend: false,

    }

  };


  line1 = {
    x: this.mesesDoAno,
    y: [],
    name: 'Confirmados',

    type: 'scatter'
  };

  line2 = {
    x: this.mesesDoAno,
    y: [],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Não Confirmados',
  };

  line3 = {
    x: this.mesesDoAno,
    y: [],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Óbitos',
  };
  line4 = {
    x: this.mesesDoAno,
    y: [],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Suspeitos',

  };
  line5 = {
    x: this.mesesDoAno,
    y: [],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Recuperados',

  };


  linegraph = [this.line1, this.line2, this.line3, this.line4,this.line5];
  linelayout = {
    title: 'Evolução do Virus',
    height: 500, width: 1400,
    yaxis: {
      range: [0, 5]
    },

  };



  men = {
    x: ['Suspeito', 'Não Confirmado', 'Confirmado', 'Óbito', 'Recuperado'],
    y: [],
    name: 'Submissões do Sexo Masculino',
    type: 'bar'
  };

  woman = {
    x: ['Suspeito', 'Não Confirmado', 'Confirmado', 'Óbito', 'Recuperado'],
    y: [],
    name: 'Submissões do Sexo Feminino',
    type: 'bar'
  };

  data = [this.men, this.woman];

  layout = {
    barmode: 'group',
    height: 600,
    width: 1400,
    title: 'Numero de submissões recebidas por sexo',
  };


  horizontalbar1 = [{
    type: 'bar',
    x: [],
    y: ['[0 - 25]', '[26 - 50 ]', '[51-75]', '[76 - 99+]'],
    orientation: 'h'
  }];
  horizontalbar1layout = {
    title: 'Numero de Obitos por faixa etária',
  }









  ngOnInit() {


  }




}
