import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  selected: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(selected: string): void{
    this.selected = selected;
  }

}
