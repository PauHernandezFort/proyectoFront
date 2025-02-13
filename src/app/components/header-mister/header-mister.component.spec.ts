import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMisterComponent } from './header-mister.component';

describe('HeaderMisterComponent', () => {
  let component: HeaderMisterComponent;
  let fixture: ComponentFixture<HeaderMisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
