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
            duration: this.formBuilder.group({
                hours: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
                minutes: ['', [Validators.required, Validators.min(0), Validators.max(59)]]
            }),
            availablePlaces: ['', [Validators.required]],
            username: [''],
            fromObject: [''],
            toObject: [''],
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

    setFrom(from: string) : void {
        this.getForm().get('from').setValue(from);
    }

    setTo(from: string) : void {
        this.getForm().get('to').setValue(from);
    }

    setFromObject(obj) : void {
        this.getForm().get('fromObject').setValue(obj);
    }

    setToObject(obj) : void {
        this.getForm().get('toObject').setValue(obj);
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