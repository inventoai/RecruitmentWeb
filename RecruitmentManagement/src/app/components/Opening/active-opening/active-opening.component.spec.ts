import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOpeningComponent } from './active-opening.component';

describe('ActiveOpeningComponent', () => {
  let component: ActiveOpeningComponent;
  let fixture: ComponentFixture<ActiveOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveOpeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
