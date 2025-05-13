import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestaServicioService } from '../../servicio/encuesta-servicio.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent implements OnInit {
  formularioEncuesta!: FormGroup;
  correoUsuario: string = '';

  private fb : FormBuilder = inject(FormBuilder);
  private encuestaServicio : EncuestaServicioService = inject(EncuestaServicioService)

  ngOnInit(): void {
    this.formularioEncuesta = this.fb.group({
      nombre: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]{1,10}$")]],
      jugarFuturo: ['', Validators.required],
      juegoDificil: ['', Validators.required],
      recomendar: [[], Validators.required],
    });
    this.correoUsuario = 'test@mail.com';
  }

  enviarEncuesta() {
    if (this.formularioEncuesta.valid) {
      const datos = {
        correo: this.correoUsuario,
        fecha: new Date(),
        ...this.formularioEncuesta.value
      };

      this.encuestaServicio.guardarEncuesta(datos).then(() => {
        alert("Encuesta enviada correctamente");
        this.formularioEncuesta.reset();
      });
    }
  }
}
