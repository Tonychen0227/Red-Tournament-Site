import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndRoundComponent } from './end-round.component';

describe('EndRoundComponent', () => {
  let component: EndRoundComponent;
  let fixture: ComponentFixture<EndRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndRoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
