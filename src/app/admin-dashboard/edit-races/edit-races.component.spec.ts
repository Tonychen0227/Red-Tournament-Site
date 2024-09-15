import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRacesComponent } from './edit-races.component';

describe('EditRacesComponent', () => {
  let component: EditRacesComponent;
  let fixture: ComponentFixture<EditRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
