import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskinstructorComponent } from './askinstructor.component';

describe('AskinstructorComponent', () => {
  let component: AskinstructorComponent;
  let fixture: ComponentFixture<AskinstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskinstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
