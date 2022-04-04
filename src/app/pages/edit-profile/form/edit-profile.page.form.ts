import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserRegister } from "src/app/model/user/UserRegister";

export class EditProfilePageForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;
    private loggedInUser: UserRegister;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        return this.formBuilder.group({
            name: ['edit me', [Validators.required]],
            email: ['example@email.com', [Validators.required, Validators.email]],
            phone: ['s', [Validators.required]],
            address: this.formBuilder.group({
                address: ['s', [Validators.required]],
                number: ['s', [Validators.required]],
                zip: ['s', [Validators.required]],
                state: ['s', [Validators.required]],
                city: ['s', [Validators.required]]
            })
        });
    }

    getForm() : FormGroup {
        return this.form;
    }

}