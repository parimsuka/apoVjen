import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class CreateTripPageForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        return this.formBuilder.group({
            from: ['', [Validators.required]],
            to: ['', [Validators.required]],
            time: ['', [Validators.required]],
            availablePlaces: ['', [Validators.required]],
            username: ['']
        });
    }

    getForm() : FormGroup {
        return this.form;
    }

    addUserName(name: string) : void {
        this.getForm().get('username').setValue(name);
    }

}