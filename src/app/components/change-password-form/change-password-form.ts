import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class ChangePasswordForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        let form = this.formBuilder.group({
            currentPassword: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            repeatPassword: ['']
        });

        form.get('repeatPassword').setValidators(matchPasswordAndRepeatPassword(form));

        return form;
    }

    getForm() : FormGroup {
        return this.form;
    }

}

function matchPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    const validator = () => {
        return password.value == repeatPassword.value ? null : {isntMatching: true}
    };

    return validator;
}