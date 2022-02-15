import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWorkReportComponent } from './daily-work-report.component';

describe('DailyWorkReportComponent', () => {
  let component: DailyWorkReportComponent;
  let fixture: ComponentFixture<DailyWorkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyWorkReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWorkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
