import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  types: Array<{
    val: number,
    display: string
  }>;

  questionCount: Array<{
    val: number,
    display: string
  }>;

  count: any;
  type: any;

  constructor(private router: Router) {
    this.router = router;

    this.types = [
      { val: 1, display: 'Pravda/Nepravda' },
      { val: 2, display: 'Zadelenie do skupiny' },
      { val: 3, display: 'Priradenie politika k vyroku' }
    ];

    this.questionCount = [
      { val: 5, display: '5' },
      { val: 10, display: '10' },
      { val: 15, display: '15' },
      { val: 20, display: '20' }
    ];
  }

  ngOnInit() {
    this.count = this.questionCount[0];
    this.type = this.types[0];
  }

  startTest() {
    this.router.navigate(['test' + this.type.val, { count: this.count.val }]);
  }

}
