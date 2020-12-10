import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FooterComponent } from './footer.component';
import { EmailListServiceService } from '../../services/email-list-service/email-list-service.service';
import { validEmail, invalidEmail, blankEmail } from 'src/mocks';

const emailListServiceSpy = jasmine.createSpyObj('emailListService', ['addToEmailListSubmission']);

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ 
        FooterComponent 
      ],
      providers: [
        { provide: EmailListServiceService, useValue: emailListServiceSpy }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    let email = component.emailListForm.controls['email'];

    expect(component.submittingAddToEmailListForm).toBeFalsy();
    expect(component.emailListForm).toBeDefined();
    expect(component.emailListForm.invalid).toBeTruthy();
    expect(email.valid).toBeFalsy();
  });

  it('form invalid when empty', () => {
    expect(component.emailListForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.emailListForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue(blankEmail.email);
    expect(email.hasError('required')).toBeTruthy();

    email.setValue(invalidEmail.email);
    expect(email.hasError('pattern')).toBeTruthy();
  });

  it('emailListService addToEmailListSubmission() should called ', fakeAsync(() => {
    let email = component.emailListForm.controls['email'];
    email.setValue(validEmail.email);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(emailListServiceSpy.addToEmailListSubmission).toHaveBeenCalled();
  }));
});
