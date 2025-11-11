import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient,HttpHeaders , HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],  
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule]
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
