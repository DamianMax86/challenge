import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './crear-reserva.component.html',
})
export class CrearReservaComponent implements OnInit {
  reservaForm: FormGroup;
  reserva = { nombreCliente: '', fecha: '', hora: '', numeroPersonas: 1 };
  /*nombre: string = '';
  fecha: string = '';
  hora: string = '';
  personas: number = 1;*/

  constructor(private reservaService: ReservaService, private router: Router, private fb: FormBuilder) {
    this.reservaForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      numeroPersonas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  

  ngOnInit(): void {}

  crearReserva() {
    if (this.reservaForm.valid) {
     
    if(this.reservaForm.value.hora.toString().split(':').length==2){
      this.reservaForm.value.hora=this.reservaForm.value.hora+":00";
      console.log(this.reservaForm.value.hora);
    }
    
    this.reservaService.createReserva(this.reservaForm.value).subscribe(
      response => {
        alert(`Reserva creada: ${this.reservaForm.value.nombreCliente} para ${this.reservaForm.value.numeroPersonas} personas el ${this.reservaForm.value.fecha} a las ${this.reservaForm.value.hora}`);
        console.log('Reserva creada:', response);
        this.router.navigate(['/']); // Redirige a la lista de reservas
      },
      error => console.error('Error creando reserva:', error)
      
    );
  }
  }

  cancelar() {
    this.router.navigate(['/']); // Redirigir al inicio
    this.reservaForm.reset();
  }
}
