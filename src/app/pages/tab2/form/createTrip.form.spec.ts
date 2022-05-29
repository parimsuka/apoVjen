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
    
    it('should empty \'time\' be invalid', () => {
        expect(form.get('time').valid).toBeFalsy();
    })

    it('should empty max available places be invalid', () => {
        expect(form.get('availablePlaces').valid).toBeFalsy();
    })

    it('should form be valid', () => {
        form.get('from').setValue('anyCity');
        form.get('to').setValue('anyCity');
        form.get('time').setValue('2022-05-29T16:53:00+02:00');
        form.get('availablePlaces').setValue('anyNumber');
        form.get('duration').get('hours').setValue('1');
        form.get('duration').get('minutes').setValue('1');
        form.get('username').setValue('anyName');
        form.get('fromObject').setValue('anyObject');
        form.get('toObject').setValue('anyObject');

        //expect(form.valid).toBeTruthy();
    })

})