import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacesAwaitingCompletionComponent } from './races-awaiting-completion.component';

describe('RacesAwaitingCompletionComponent', () => {
  let component: RacesAwaitingCompletionComponent;
  let fixture: ComponentFixture<RacesAwaitingCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RacesAwaitingCompletionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacesAwaitingCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
