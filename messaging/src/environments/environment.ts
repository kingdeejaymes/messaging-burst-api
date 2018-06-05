// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://api.transmitsms.com',
  // we are adding this proxy server for the CORS issue encountered since we don't have access on the server/API codes
  cors_url: 'https://cors-anywhere.herokuapp.com/',
  // authorization header generated using the provided credentials API Key and API Secret
  auth_token: 'Basic Y2I1ZmQ0NTBhY2Y5NWU2OWE0N2E4MzUyYzg0Mjg4Y2E6YnVyc3RzbXNURVNU'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
