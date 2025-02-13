import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacoBoxeoComponent } from './saco-boxeo.component';

describe('SacoBoxeoComponent', () => {
  let component: SacoBoxeoComponent;
  let fixture: ComponentFixture<SacoBoxeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SacoBoxeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SacoBoxeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
