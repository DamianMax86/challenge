import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './editar-reserva.component.html',
})
export class EditarReservaComponent implements OnInit {
  reservaForm: FormGroup;
  //reserva: Reserva;
  reserva = { id: 0, nombreCliente: '', fecha: '', hora: '', numeroPersonas: 1 };


  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.reservaForm = this.fb.group({
    nombreCliente: [{ value: '', disabled: true }, Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    numeroPersonas: ['', [Validators.required, Validators.min(1)]],
  });
}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reservaService.getReservaById(id).subscribe(
      (reserva) => {
        this.reserva = reserva;
        this.reservaForm.patchValue({
          nombreCliente: reserva.nombreCliente,
          fecha: this.transformarFecha(reserva.fecha), // Asegúrate de que esto sea una fecha en formato aceptable
          hora: reserva.hora,
          numeroPersonas: reserva.numeroPersonas,
        });
      },
      (error) => console.error('Error al cargar reserva:', error)
    );
  }

  transformarFecha(fecha: string): string {
    const fechaDate = new Date(fecha); // Convierte la cadena a un objeto Date
    console.log(fechaDate);
    return fechaDate.toISOString().split('T')[0]; // Devuelve la fecha en formato local
  }

  editarReserva(): void {
    if (this.reservaForm.valid) {
      // Obtener los valores del formulario
      const reservaData = this.reservaForm.getRawValue();
  
      // Asegurarte de que el campo 'hora' tiene el formato correcto
      if (reservaData.hora.toString().split(':').length === 2) {
        reservaData.hora = `${reservaData.hora}:00`; // Agregar los segundos
      }
  
      // Asignar la ID de la reserva a los datos de la reserva
      const reservaActualizada = {
        ...reservaData,
        id: this.reserva.id // Asegúrate de mantener el ID
      };
  
      this.reservaService.updateReserva(this.reserva.id, reservaActualizada).subscribe(
        response => {
          alert(`Reserva editada: ${reservaData.nombreCliente} para ${reservaData.numeroPersonas} personas el ${reservaData.fecha} a las ${reservaData.hora}`);
          console.log('Reserva actualizada:', response);
          this.router.navigate(['/']); // Redirige a la lista de reservas
        },
        error => console.error('Error al actualizar reserva:', error)
      );
    } else {
      // Marca todos los campos como tocados para activar las validaciones
      this.reservaForm.markAllAsTouched();
    }
  }
  

  cancelar(): void {
    //this.router.navigate(['/']); // Redirigir al inicio
    this.reservaService.deleteReservaById(this.reserva.id).subscribe(
      response => {
        alert(`Reserva cancelada: ${this.reserva.nombreCliente} para ${this.reserva.numeroPersonas} personas el ${this.reserva.fecha} a las ${this.reserva.hora}`);
        console.log('Reserva cancelada:', response);
        this.router.navigate(['/']); // Redirige a la lista de reservas
      },
      error => console.error('Error al cancelada reserva:', error)
    );
  }

  volver(): void {
    //this.router.navigate(['/']); // Redirigir al inicio
    
        this.router.navigate(['/']); // Redirige a la lista de reservas
    
    
  }
}
