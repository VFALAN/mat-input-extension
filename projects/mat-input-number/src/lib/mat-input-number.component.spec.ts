import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputNumberComponent } from './mat-input-number.component';

describe('MatInputNumberComponent', () => {
  let component: MatInputNumberComponent;
  let fixture: ComponentFixture<MatInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatInputNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
