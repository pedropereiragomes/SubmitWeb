import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import { DataserviceService } from './dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 sidebarOpenedOrClosed : boolean = true;

  title = 'TrabalhoWeb';

  users: Observable<any[]>;

  constructor(db: AngularFireDatabase, private dataService: DataserviceService){
 
  this.users = db.list('users').valueChanges();

  this.dataService.updateData(db.list('users').valueChanges());

  }

  togglesidebar(){
    this.sidebarOpenedOrClosed = !this.sidebarOpenedOrClosed;

  }



}
