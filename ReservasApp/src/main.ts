import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ReservasComponent } from './app/reservas/reservas.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { CrearReservaComponent } from './app/crear-reserva/crear-reserva.component';
import { EditarReservaComponent } from './app/editar-reserva/editar-reserva.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ReservasComponent },
      { path: 'crear', component: CrearReservaComponent },
      { path: 'editar/:id', component: EditarReservaComponent }
    ], withComponentInputBinding())
  ]
}).catch(err => console.error(err));
