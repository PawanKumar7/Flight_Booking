import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByPNRComponent } from './search-by-pnr.component';

describe('SearchByPNRComponent', () => {
  let component: SearchByPNRComponent;
  let fixture: ComponentFixture<SearchByPNRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByPNRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByPNRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
