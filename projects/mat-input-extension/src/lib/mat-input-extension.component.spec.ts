import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputExtensionComponent } from './mat-input-extension.component';

describe('MatInputExtensionComponent', () => {
  let component: MatInputExtensionComponent;
  let fixture: ComponentFixture<MatInputExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatInputExtensionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatInputExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
