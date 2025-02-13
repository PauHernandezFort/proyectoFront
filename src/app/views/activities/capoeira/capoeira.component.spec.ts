import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapoeiraComponent } from './capoeira.component';

describe('CapoeiraComponent', () => {
  let component: CapoeiraComponent;
  let fixture: ComponentFixture<CapoeiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapoeiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapoeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
