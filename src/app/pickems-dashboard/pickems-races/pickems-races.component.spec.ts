import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickemsRacesComponent } from './pickems-races.component';

describe('PickemsRacesComponent', () => {
  let component: PickemsRacesComponent;
  let fixture: ComponentFixture<PickemsRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickemsRacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickemsRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
