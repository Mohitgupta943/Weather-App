import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastDetailsComponent } from './forcast-details.component';

describe('ForcastDetailsComponent', () => {
  let component: ForcastDetailsComponent;
  let fixture: ComponentFixture<ForcastDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcastDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
