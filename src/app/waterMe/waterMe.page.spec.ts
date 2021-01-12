import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaterMePage } from './waterMe.page';

describe('WaterMePage', () => {
  let component: WaterMePage;
  let fixture: ComponentFixture<WaterMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaterMePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaterMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
