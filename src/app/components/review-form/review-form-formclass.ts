import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ReviewForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        return this.formBuilder.group({
            polite: [0, [Validators.required]],
            drivingSafe: [0, [Validators.required]],
            vehicle: [0, [Validators.required]],
            service: [0, [Validators.required]],
            helpful: [0, [Validators.required]]
        });
    }

    getForm() : FormGroup {
        return this.form;
    }

}