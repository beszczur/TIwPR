import {Component, OnInit} from '@angular/core';
import {DataproviderService} from '../../dataproviders/dataprovider.service';

@Component({
  selector: 'app-week',
  templateUrl: 'week.component.html',
  styleUrls: ['week.component.scss'],
  providers: [DataproviderService],
})
export class WeekComponent implements OnInit {

  private plan: any[];

  //whatTime = Observable.interval(1000).map(x => new Date()).share();

  constructor(private dataProvider: DataproviderService) {
  }

  ngOnInit() {
    console.log('getWeekPlan');
    this.plan = this.dataProvider.getWeekPlan();
    //sessionStorage.setItem("plan", JSON.stringify(this.plan));
  }
}
