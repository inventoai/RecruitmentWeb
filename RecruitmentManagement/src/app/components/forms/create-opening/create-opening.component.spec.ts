import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOpeningComponent } from './create-opening.component';

describe('CreateOpeningComponent', () => {
  let component: CreateOpeningComponent;
  let fixture: ComponentFixture<CreateOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOpeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
