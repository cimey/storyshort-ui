import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptInputComponent } from './script-input.component';

describe('ScriptInputComponent', () => {
  let component: ScriptInputComponent;
  let fixture: ComponentFixture<ScriptInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScriptInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
