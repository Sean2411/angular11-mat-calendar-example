import { Component, OnInit } from '@angular/core';
import {
  DateRange,
  DefaultMatCalendarRangeStrategy,
  MatRangeDateSelectionModel,
  MAT_DATE_RANGE_SELECTION_STRATEGY
} from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy
    },
    DefaultMatCalendarRangeStrategy,
    MatRangeDateSelectionModel
  ]
})
export class CalendarComponent implements OnInit {
  selectedDate: any = new Date('2012-03-03');
  name = 'Angular 6';
  date = new Date('2012-03-03');
  maxDate = new Date('2012-03-03');
  dateRange: DateRange<Date>;

  constructor(
    private readonly selectionModel: MatRangeDateSelectionModel<Date>,
    private readonly selectionStrategy: DefaultMatCalendarRangeStrategy<Date>
  ) {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    this.dateRange = new DateRange(fiveDaysAgo, new Date());
  }

  ngOnInit() {}

  onSelect(event) {
    console.log(event);
    this.selectedDate = event;
  }

  rangeChanged(selectedDate: Date) {
    const selection = this.selectionModel.selection,
      newSelection = this.selectionStrategy.selectionFinished(
        selectedDate,
        selection
      );

    this.selectionModel.updateSelection(newSelection, this);
    this.dateRange = new DateRange<Date>(newSelection.start, newSelection.end);

    if (this.selectionModel.isComplete()) {
      console.log('new selection', newSelection);
    }
  }
}
