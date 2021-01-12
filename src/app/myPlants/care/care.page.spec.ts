import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarePage } from './care.page';

describe('CarePage', () => {
  let component: CarePage;
  let fixture: ComponentFixture<CarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
