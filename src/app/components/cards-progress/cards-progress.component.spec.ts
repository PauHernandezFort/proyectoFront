import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsProgressComponent } from './cards-progress.component';

describe('CardsProgressComponent', () => {
  let component: CardsProgressComponent;
  let fixture: ComponentFixture<CardsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
