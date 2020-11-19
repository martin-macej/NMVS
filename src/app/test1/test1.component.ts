import { ResultDialogComponent } from './../result-dialog/result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import test from '../../assets/test.json';
import image from '../../assets/image.json';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.less']
})
export class Test1Component implements OnInit {
  questions: any;
  userAnswers: Array<any>;
  submitted: boolean;
  rightAnswers: number;
  allAnswers: number;

  answers: Array<any>;
  count: number;
  btnText: string;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.route = route;
    this.router = router;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.btnText = 'Vyhodnoť';
    this.count = Number(this.route.snapshot.paramMap.get('count'));
    this.questions = test;
    this.shuffle();
    this.userAnswers = [];
    this.answers = [];
    this.userAnswers = Array(this.count).fill({});
    this.questions = this.questions.slice(0, this.count);
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].right = this.questions[i].answer === 1;
      this.answers.push([{
        display: 'Pravda',
        right: this.questions[i].answer === 1
      }, {
        display: 'Nepravda',
        right: this.questions[i].answer === 0
      }]);
    }
  }

  getImage(person) {
    const img = image.find(a => a.person === person);
    return '../assets/images/' + (img.image || '');
  }

  shuffle() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  isBtnDisabled() {
    return this.userAnswers.filter(ua => ua.display === undefined).length > 0;
  }

  submit() {
    if (!this.submitted) {
      this.submitted = true;
      this.btnText = 'Späť';
      this.rightAnswers = this.userAnswers.filter(ua => ua.right).length;
      this.allAnswers = this.userAnswers.length;
      this.dialog.open(ResultDialogComponent, {
        width: '250px',
        data: {rightAnswers: this.rightAnswers, wrongAnswers: this.allAnswers - this.rightAnswers}
      });
    } else {
      this.router.navigate(['']);
    }
  }

}
