import * as firebase from '../../../../node_modules/firebase/compat';

export class Comment {
    for: string;
    from: string;
    comment: string;
    createdAt: firebase.default.firestore.FieldValue;
    img: string;
    username: string;
}