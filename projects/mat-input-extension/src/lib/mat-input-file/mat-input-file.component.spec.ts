import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputFileComponent } from './mat-input-file.component';

describe('MatInputFileComponent', () => {
  let component: MatInputFileComponent;
  let fixture: ComponentFixture<MatInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatInputFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
