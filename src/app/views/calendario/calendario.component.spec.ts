import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioView } from './calendario.component';

describe('CalendarioComponent', () => {
  let component: CalendarioView;
  let fixture: ComponentFixture<CalendarioView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
