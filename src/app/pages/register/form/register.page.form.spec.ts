import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form"

describe('RegisterPageForm', () => {

    let registerPageForm: RegisterPageForm;
    let form: FormGroup;

    beforeEach(() => {
        registerPageForm = new RegisterPageForm(new FormBuilder());
        form = registerPageForm.getForm();
    })

    it('should empty name be invalid', () => {
        expect(form.get('name').valid).toBeFalsy();
    })

    it('should empty email be invalid', () => {
        expect(form.get('email').valid).toBeFalsy();
    })

    it('should empty password be invalid', () => {
        expect(form.get('password').valid).toBeFalsy();
    })

    it('should empty phone be invalid', () => {
        expect(form.get('phone').valid).toBeFalsy();
    })

    it('should empty street be invalid', () => {
        expect(form.get('address').get('street').valid).toBeFalsy();
    })

    it('should empty number be invalid', () => {
        expect(form.get('address').get('number').valid).toBeFalsy();
    })

    it('should empty zip be invalid', () => {
        expect(form.get('address').get('zip').valid).toBeFalsy();
    })

    it('should empty state be invalid', () => {
        expect(form.get('address').get('state').valid).toBeFalsy();
    })

    it('should empty city be invalid', () => {
        expect(form.get('address').get('city').valid).toBeFalsy();
    })

    it('should invalid email be invalid', () => {
        form.get('email').setValue('invalidEmail');

        expect(form.get('email').valid).toBeFalsy();
    })

    it('should password less than 6 characters be invalid', () => {
        form.get('password').setValue('12345');

        expect(form.get('password').valid).toBeFalsy();
    })

    it('should different password from repeat password be invalid', () => {
        form.get('password').setValue('anyPassword');
        form.get('repeatPassword').setValue('anotherPassword');
        
        expect(form.get('repeatPassword').valid).toBeFalsy();
    })

    it('should form be valid', () => {
        form.get('name').setValue('anyName');
        form.get('email').setValue('any@email.com');
        form.get('password').setValue('anyPassword');
        form.get('repeatPassword').setValue('anyPassword');
        form.get('phone').setValue('anyPhone');
        form.get('address').get('street').setValue('anyStreet');
        form.get('address').get('number').setValue('anyNumber');
        form.get('address').get('zip').setValue('anyZip');
        form.get('address').get('state').setValue('anyState');
        form.get('address').get('city').setValue('anycity');


        expect(form.valid).toBeTruthy();
    })

})