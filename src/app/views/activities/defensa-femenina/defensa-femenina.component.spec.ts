import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensaFemeninaComponent } from './defensa-femenina.component';

describe('DefensaFemeninaComponent', () => {
  let component: DefensaFemeninaComponent;
  let fixture: ComponentFixture<DefensaFemeninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefensaFemeninaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefensaFemeninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
