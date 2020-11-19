import { ResultDialogComponent } from './../result-dialog/result-dialog.component';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import test from '../../assets/test.json';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.less']
})
export class Test2Component implements OnInit {
  all: Array<any> = [];

  count: number;
  right = [];
  wrong = [];
  btnText: string;
  submitted: boolean;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.route = route;
    this.router = router;
    this.dialog = dialog
  }

  ngOnInit(): void {
    this.btnText = 'Vyhodnoť';
    this.count = Number(this.route.snapshot.paramMap.get('count'));
    this.all = test;
    this.shuffle();
    this.all = this.all.slice(0, this.count);
    for (let i = 0; i<this.all.length; i++) {
      this.all[i].right = this.all[i].answer === 1;
    }
  }

  shuffle() {
    for (let i = this.all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.all[i], this.all[j]] = [this.all[j], this.all[i]];
    }
  }

  isBtnDisabled() {
    return this.all.length > 0;
  }

  submit() {
    if (!this.submitted) {
      this.submitted = true;
      this.btnText = 'Späť';
      this.dialog.open(ResultDialogComponent, {
        width: '250px',
        data: {
          rightAnswers: this.right.filter(r => r.answer === 1).length + this.wrong.filter(w => w.answer === 0).length,
          wrongAnswers: this.right.filter(r => r.answer === 0).length + this.wrong.filter(w => w.answer === 1).length}
      });
      console.log(this.right, this.wrong)
    } else {
      this.router.navigate(['']);
    }
  }

}
