import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BandEditPageComponent} from './band-edit-page.component';

describe('BandEditPageComponent', () => {
  let component: BandEditPageComponent;
  let fixture: ComponentFixture<BandEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
