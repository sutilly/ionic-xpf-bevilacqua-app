import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WateringPage } from './watering.page';

describe('WateringPage', () => {
  let component: WateringPage;
  let fixture: ComponentFixture<WateringPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WateringPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WateringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
