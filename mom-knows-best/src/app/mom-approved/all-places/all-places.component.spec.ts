import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlacesComponent } from './all-places.component';

describe('AllPlacesComponent', () => {
  let component: AllPlacesComponent;
  let fixture: ComponentFixture<AllPlacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPlacesComponent]
    });
    fixture = TestBed.createComponent(AllPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
