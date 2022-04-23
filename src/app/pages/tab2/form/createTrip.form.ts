import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class CreateTripPageForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        let form = this.formBuilder.group({
            from: ['', [Validators.required]],
            to: ['', [Validators.required]],
            time: ['', [Validators.required]],
            availablePlaces: ['', [Validators.required]],
            username: ['']
        });

        form.get('from').setValidators(fromAndToAreDifferent(form));
        form.get('to').setValidators(fromAndToAreDifferent(form));

        return form;
    }

    getForm() : FormGroup {
        return this.form;
    }

    addUserName(name: string) : void {
        this.getForm().get('username').setValue(name);
    }

}

function fromAndToAreDifferent(form: FormGroup) : ValidatorFn {
    const from = form.get('from');
    const to = form.get('to');

    const validator = () => {
        return from.value == to.value ? {isntMatching: true} : null;
    };

    return validator;
}