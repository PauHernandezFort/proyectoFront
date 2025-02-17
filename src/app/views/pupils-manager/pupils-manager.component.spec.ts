import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilsManagerComponent } from './pupils-manager.component';

describe('PupilsManagerComponent', () => {
  let component: PupilsManagerComponent;
  let fixture: ComponentFixture<PupilsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupilsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
