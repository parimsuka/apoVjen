import { FormBuilder, FormGroup } from "@angular/forms";
import { CreateTripPageForm } from "./createTrip.form";

describe('CreateTripPageForm', () => {

    let createTripPageForm: CreateTripPageForm;
    let form: FormGroup;

    beforeEach(() => {
        createTripPageForm = new CreateTripPageForm(new FormBuilder);
        form = createTripPageForm.getForm();
    })
    
    it('should empty \'from\' be invalid', () => {
        expect(form.get('from').valid).toBeFalsy();
    })

    it('should empty \'to\' be invalid', () => {
        expect(form.get('to').valid).toBeFalsy();
    })
    
    it('should empty \'dateAndTime\' be invalid', () => {
        expect(form.get('dateAndTime').valid).toBeFalsy();
    })

    it('should empty max available places be invalid', () => {
        expect(form.get('availablePlaces').valid).toBeFalsy();
    })

    it('should form be valid', () => {
        form.get('from').setValue('anyCity');
        form.get('to').setValue('anyCity');
        form.get('dateAndTime').setValue('anyDateAndTime');
        form.get('availablePlaces').setValue('anyNumber');

        expect(form.valid).toBeTruthy();
    })

})