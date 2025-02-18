import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMartialArtComponent } from './add-martial-art.component';

describe('AddMartialArtComponent', () => {
  let component: AddMartialArtComponent;
  let fixture: ComponentFixture<AddMartialArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMartialArtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMartialArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
