import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchairlineComponent } from './searchairline.component';

describe('SearchairlineComponent', () => {
  let component: SearchairlineComponent;
  let fixture: ComponentFixture<SearchairlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchairlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchairlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
