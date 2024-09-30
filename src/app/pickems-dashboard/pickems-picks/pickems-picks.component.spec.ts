import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickemsPicksComponent } from './pickems-picks.component';

describe('PickemsPicksComponent', () => {
  let component: PickemsPicksComponent;
  let fixture: ComponentFixture<PickemsPicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickemsPicksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickemsPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
