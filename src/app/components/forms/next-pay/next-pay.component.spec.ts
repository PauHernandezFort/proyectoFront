import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPayComponent } from './next-pay.component';

describe('NextPayComponent', () => {
  let component: NextPayComponent;
  let fixture: ComponentFixture<NextPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
