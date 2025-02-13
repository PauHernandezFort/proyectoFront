import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuiJitsuComponent } from './jui-jitsu.component';

describe('JuiJitsuComponent', () => {
  let component: JuiJitsuComponent;
  let fixture: ComponentFixture<JuiJitsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiJitsuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuiJitsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
