import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsEventsComponent } from './cards-events.component';

describe('CardsEventsComponent', () => {
  let component: CardsEventsComponent;
  let fixture: ComponentFixture<CardsEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
