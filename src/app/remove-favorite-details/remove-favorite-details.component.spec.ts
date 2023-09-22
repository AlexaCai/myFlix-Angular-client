import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFavoriteDetailsComponent } from './remove-favorite-details.component';

describe('RemoveFavoriteDetailsComponent', () => {
  let component: RemoveFavoriteDetailsComponent;
  let fixture: ComponentFixture<RemoveFavoriteDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveFavoriteDetailsComponent]
    });
    fixture = TestBed.createComponent(RemoveFavoriteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
