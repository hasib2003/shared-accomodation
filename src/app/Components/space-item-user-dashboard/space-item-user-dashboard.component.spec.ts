import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceItemUserDashboardComponent } from './space-item-user-dashboard.component';

describe('SpaceItemUserDashboardComponent', () => {
  let component: SpaceItemUserDashboardComponent;
  let fixture: ComponentFixture<SpaceItemUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceItemUserDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceItemUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
