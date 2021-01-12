import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPlantsPage } from './myPlants.page';

describe('Tab2Page', () => {
  let component: MyPlantsPage;
  let fixture: ComponentFixture<MyPlantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyPlantsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPlantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
