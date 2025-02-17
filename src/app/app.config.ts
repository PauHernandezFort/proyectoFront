import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { CalendarAppModule } from './calendar-app.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  // Import necesario

// Registrar el locale español
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideAnimations(), importProvidersFrom(CalendarAppModule),  
    { provide: LOCALE_ID, useValue: 'es' }, importProvidersFrom(NgbModule) ]
};



