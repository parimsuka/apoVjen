import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserRegister } from "src/app/model/user/UserRegister";

export class EditProfilePageForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        return this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            address: this.formBuilder.group({
                address: ['', [Validators.required]],
                number: ['', [Validators.required]],
                zip: ['', [Validators.required]],
                state: ['', [Validators.required]],
                city: ['', [Validators.required]]
            })
        });
    }

    setForm(loggedInUser: UserRegister): void {
        this.form = this.formBuilder.group({
            name: [loggedInUser.name, [Validators.required]],
            email: [loggedInUser.email, [Validators.required, Validators.email]],
            phone: [loggedInUser.phone, [Validators.required]],
            address: this.formBuilder.group({
                address: [loggedInUser.address.address, [Validators.required]],
                number: [loggedInUser.address.number, [Validators.required]],
                zip: [loggedInUser.address.zip, [Validators.required]],
                state: [loggedInUser.address.state, [Validators.required]],
                city: [loggedInUser.address.city, [Validators.required]]
            })
        });
    }

    getForm() : FormGroup {
        return this.form;
    }

}