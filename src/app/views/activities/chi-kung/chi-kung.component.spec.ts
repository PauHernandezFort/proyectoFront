import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiKungComponent } from './chi-kung.component';

describe('ChiKungComponent', () => {
  let component: ChiKungComponent;
  let fixture: ComponentFixture<ChiKungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiKungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiKungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
