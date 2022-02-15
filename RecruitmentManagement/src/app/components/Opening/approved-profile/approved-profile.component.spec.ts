import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedProfileComponent } from './approved-profile.component';

describe('ApprovedProfileComponent', () => {
  let component: ApprovedProfileComponent;
  let fixture: ComponentFixture<ApprovedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
