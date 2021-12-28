// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'fir-d46b6',
    appId: '1:861489680453:web:47716e8fafcaf61387d32c',
    storageBucket: 'fir-d46b6.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCGs9Rgs3DsBo8iskUYu4rA4ayJG1uvixc',
    authDomain: 'fir-d46b6.firebaseapp.com',
    messagingSenderId: '861489680453',
    measurementId: 'G-YNSJ0SN1RC',
  },

  production: false,
  AUTHENTICATION: 'http://localhost:8080/auth',
  COUNTRY_AUTHENTICATION: 'eUYlF6Eka0atR1PjBoRDOHkXLoFft2fwZHJizbXqQS_C589BvdHO1TBcmKbYoPFsNZg',
  COUNTRY_URL: 'https://www.universal-tutorial.com/api',
  HOUSE_URL: 'http://localhost:8080/api',
  RESERVA_URL: 'http://localhost:8080/api/reserva',
  CALIFICACION_URL: 'http://localhost:8080/api/calificacion',

  firebaseConfig : {
    apiKey: "AIzaSyCGs9Rgs3DsBo8iskUYu4rA4ayJG1uvixc",
    authDomain: "fir-d46b6.firebaseapp.com",
    projectId: "fir-d46b6",
    storageBucket: "fir-d46b6.appspot.com",
    messagingSenderId: "861489680453",
    appId: "1:861489680453:web:47716e8fafcaf61387d32c",
    measurementId: "G-YNSJ0SN1RC"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
