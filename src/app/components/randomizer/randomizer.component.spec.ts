import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizerComponent } from './randomizer.component';

describe('RandomizerComponent', () => {
  let component: RandomizerComponent;
  let fixture: ComponentFixture<RandomizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
