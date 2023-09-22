import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteDetailsComponent } from './add-favorite-details.component';

describe('AddFavoriteDetailsComponent', () => {
  let component: AddFavoriteDetailsComponent;
  let fixture: ComponentFixture<AddFavoriteDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFavoriteDetailsComponent]
    });
    fixture = TestBed.createComponent(AddFavoriteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
