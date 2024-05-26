import { Component, Input } from '@angular/core';
import { UserData } from '../../../core/interfaces/auth.interface';
import { TableHeaderModel, UserDetailsTableModel } from '../../../core/interfaces/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() tHeaders : TableHeaderModel [] = [{title : "Name", tBodyKey : "name"},{title : "Email", tBodyKey : "email"}]
  @Input() tBody : Array <UserDetailsTableModel> = [{name : "some", email : "some@"},{name : "who", email : "who@"}]
  
  displayedColumns !: string[] ;
  
  ngOnInit(){
    this.displayedColumns =['slNo',...this.tHeaders.map(each => each.tBodyKey)]
  }
}
