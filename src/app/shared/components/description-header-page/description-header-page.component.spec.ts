import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionHeaderPageComponent } from './description-header-page.component';

describe('DescriptionHeaderPageComponent', () => {
  let component: DescriptionHeaderPageComponent;
  let fixture: ComponentFixture<DescriptionHeaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionHeaderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionHeaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
