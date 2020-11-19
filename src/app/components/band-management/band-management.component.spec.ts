import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BandManagementComponent} from './band-management.component';

describe('BandManagementComponent', () => {
  let component: BandManagementComponent;
  let fixture: ComponentFixture<BandManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
