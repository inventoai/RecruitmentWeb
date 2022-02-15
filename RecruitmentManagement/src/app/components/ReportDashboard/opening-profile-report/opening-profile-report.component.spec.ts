import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningProfileReportComponent } from './opening-profile-report.component';

describe('OpeningProfileReportComponent', () => {
  let component: OpeningProfileReportComponent;
  let fixture: ComponentFixture<OpeningProfileReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningProfileReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningProfileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
