import { Component, OnInit } from '@angular/core';
import { ClickmapService } from '../../services/clickmap.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private searchbox:string;
  constructor(private service:ClickmapService) { }

  ngOnInit() {
  }
  search(){
    this.service.updateList(this.searchbox);
    console.log(this.searchbox);
  }
}
