import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmaComponent } from './mma.component';

describe('MmaComponent', () => {
  let component: MmaComponent;
  let fixture: ComponentFixture<MmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
