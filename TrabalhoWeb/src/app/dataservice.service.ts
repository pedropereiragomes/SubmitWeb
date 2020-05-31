import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  
  myArray$: Observable<any>;
  private userArray = new Subject<any>();
  
  constructor(private httpClient: HttpClient){
      this.myArray$ = this.userArray.asObservable();
     }

    
    CreateUser(usernameS: string, passwordS: string){
      
      const user = {
       username : usernameS,
       password : passwordS

    }
    
    return this.httpClient.post<{message: string}>('http://localhost:5000/api/PostLogin',user);
    
    
        
    
    }

  /////////////////////////////////////////////////////////////

    LoginUser(usernameS: string, passwordS: string) {
      const user = {
        username : usernameS,
        password : passwordS
 
     }
      return this.httpClient.get<{message: string}>('http://localhost:5000/api/getLogin/' + user.username + '/' + user.password);
      
     
    }




    getNif(nif: string) {
      return this.httpClient.get<{message: string}>('http://localhost:5000/api/getNIF/'+ nif);
    }





  updateData(data: any){
    this.userArray.next(data);
    console.log(data);
  }


  
  

}
