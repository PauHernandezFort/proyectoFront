import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePupilsComponent } from './table-pupils.component';

describe('TablePupilsComponent', () => {
  let component: TablePupilsComponent;
  let fixture: ComponentFixture<TablePupilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePupilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePupilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
