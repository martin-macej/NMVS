import { ResultDialogComponent } from './../result-dialog/result-dialog.component';
import { Component, OnInit } from '@angular/core';
import items from '../../assets/select.json';
import image from '../../assets/image.json';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.less']
})
export class Test3Component implements OnInit {
  questions: Array<any>;
  authors: Array<string> = [];
  submitted = false;
  btnText = 'Vyhodnoť';
  selectedValues: any;
  count: number;
  right: number;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.route = route;
    this.router = router;
    this.dialog = dialog;

    this.shuffle();
    this.count = Number(this.route.snapshot.paramMap.get('count'));
    this.selectedValues = Array(this.count).fill(undefined);
    this.questions = items.slice(0, this.count);
    this.questions = this.questions.map(q => {
      return {
        question: q.statement,
        answers: this.getAnswersShuffle(q.person)
      };
    });
  }

  ngOnInit(): void {
  }

  getImage(person) {
    const img = image.find(a => a.person === person);
    return '../assets/images/' + (img.image || '');
  }

  getAnswersShuffle(rightAnswer) {
    const answers = [{
      display: rightAnswer,
      right: true
    }];
    const aaa = [rightAnswer];
    const maxCount = 2;
    let currentCount = 0;
    this.shuffleAuthors();
    this.authors.some(a => {
      if (!aaa.includes(a)) {
        if (Math.random() > 0.5) {
          answers.push({display: a, right: false});
        } else {
          answers.unshift({display: a, right: false});
        }
        aaa.push(a);
        return ++currentCount === maxCount;
      } else {
        return false;
      }
    });
    return answers;
  }

  shuffle() {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
      if (!this.authors.includes(items[i].person)) {
        this.authors.push(items[i].person);
      }
    }
  }

  shuffleAuthors() {
    for (let i = this.authors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.authors[i], this.authors[j]] = [this.authors[j], this.authors[i]];
    }
  }

  isBtnDisabled() {
    return this.selectedValues.some(sl => !!!sl);
  }

  submit() {
    if (!this.submitted) {
      this.right = this.selectedValues.filter(sv => sv && sv.right).length;
      this.submitted = true;
      this.btnText = 'Späť';
      this.dialog.open(ResultDialogComponent, {
        width: '250px',
        data: {rightAnswers: this.right, wrongAnswers: this.count - this.right}
      });
    } else {
      this.router.navigate(['']);
    }
  }
}
