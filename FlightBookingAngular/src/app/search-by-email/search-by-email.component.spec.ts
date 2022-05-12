import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByEmailComponent } from './search-by-email.component';

describe('SearchByEmailComponent', () => {
  let component: SearchByEmailComponent;
  let fixture: ComponentFixture<SearchByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
