import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewhouseComponent } from './newhouse.component';

describe('NewhouseComponent', () => {
  let component: NewhouseComponent;
  let fixture: ComponentFixture<NewhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewhouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
