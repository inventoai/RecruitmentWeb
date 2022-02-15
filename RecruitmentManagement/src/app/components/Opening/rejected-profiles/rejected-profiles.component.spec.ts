import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedProfilesComponent } from './rejected-profiles.component';

describe('RejectedProfilesComponent', () => {
  let component: RejectedProfilesComponent;
  let fixture: ComponentFixture<RejectedProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
