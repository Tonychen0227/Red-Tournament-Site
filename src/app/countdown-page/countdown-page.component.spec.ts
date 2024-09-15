import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownPageComponent } from './countdown-page.component';

describe('CountdownPageComponent', () => {
  let component: CountdownPageComponent;
  let fixture: ComponentFixture<CountdownPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
