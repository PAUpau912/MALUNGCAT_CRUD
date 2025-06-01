import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    // Use provideHttpClient instead of HttpClientModule
    provideHttpClient(),
  ]
})
  .then(() => {
    console.log('Application bootstrapped successfully'); 
})
  .catch((err) => console.error(err));

