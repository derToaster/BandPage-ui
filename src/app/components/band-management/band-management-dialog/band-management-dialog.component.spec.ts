import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BandManagementDialogComponent} from './band-management-dialog.component';

describe('BandManagementDialogComponent', () => {
  let component: BandManagementDialogComponent;
  let fixture: ComponentFixture<BandManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandManagementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
