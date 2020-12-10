import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EmailListServiceService } from './services/email-list-service/email-list-service.service';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

describe('AppComponent', () => {
let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    const fakeService = {} as Partial<EmailListServiceService>

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent,
        FooterComponent
      ],
      providers: [
        { provide: EmailListServiceService, useValue: fakeService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create the footer', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it(`should have as title 'sauna-king'`, () => {
    expect(component.title).toEqual('sauna-king');
  });
});
