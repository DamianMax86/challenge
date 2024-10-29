import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reservas.component.html',
  
})
export class ReservasComponent {
  // Declara la propiedad 'reservas' con un array de objetos o un array vacío
  /*reservas = [
    { nombreCliente: 'Reserva 1', fecha: '2024-10-25', id: 1, hora: '16:30', numeroPersonas:1 },
    { nombreCliente: 'Reserva 2', fecha: '2024-10-26', id: 2, hora: '18:30', numeroPersonas:2  }
  ];*/
  reservas = [{ id: 0, nombreCliente: '', fecha: '', hora: '', numeroPersonas: '' }]; 
  nombreCliente: string = '';
  fecha: string | null = null;
  constructor(private router: Router,private reservaService: ReservaService) {}

  ngOnInit(): void {
    
    this.reservaService.getReservas().subscribe(
      (reserva) => {(this.reservas = reserva)
        this.reservas.forEach(reserva => {
          reserva.fecha = this.transformarFecha(reserva.fecha);
        });
      },
      (error) => console.error('Error al cargar reserva:', error)
    );
  }

  transformarFecha(fecha: string): string {
    const fechaDate = new Date(fecha); // Convierte la cadena a un objeto Date
    return fechaDate.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha en formato "yyyy-MM-dd"
  }

  buscarReservas(): void {
    this.reservaService.buscarReservas(this.nombreCliente, this.fecha).subscribe(
      (reservas) => this.reservas = reservas,
      (error) => console.error('Error al buscar reservas:', error)
    );
  }

  limpiarCampos() {
    this.nombreCliente = '';
    this.fecha = '';
  }
  
  irACrearReserva() {
    this.router.navigate(['/crear']);
  }

  editarReserva(id: number) {
    this.router.navigate([`/editar/${id}`]);
  }
}
