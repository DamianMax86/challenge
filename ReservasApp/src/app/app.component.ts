import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservasComponent } from './reservas/reservas.component'; // Componente autónomo
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component'; // Componente autónomo
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component'; // Componente autónomo

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ReservasComponent, CrearReservaComponent, EditarReservaComponent], // Asegúrate de importar los componentes autónomos
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
