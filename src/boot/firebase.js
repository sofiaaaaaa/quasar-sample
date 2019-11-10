import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  yours: 'settings..'
};
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();
export { firebaseAuth, firebaseDb };
