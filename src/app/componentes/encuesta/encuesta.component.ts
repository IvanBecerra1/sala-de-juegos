import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestaServicioService } from '../../servicio/encuesta-servicio.service';
import { AutenticacionService } from '../../servicio/autenticacion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent implements OnInit {
  formularioEncuesta!: FormGroup;
  correoUsuario : string | null | undefined = '';
  
  private toastr : ToastrService = inject(ToastrService);
  private fb : FormBuilder = inject(FormBuilder);
  private encuestaServicio : EncuestaServicioService = inject(EncuestaServicioService)
  private autenticacionServicio : AutenticacionService = inject(AutenticacionService);
  public checkBox : boolean = false;
  async ngOnInit() {
    this.formularioEncuesta = this.fb.group({
      nombre: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]{1,10}$")]],
      jugarFuturo: ['', Validators.required],
      juegoDificil: ['', Validators.required],
      recomendar: [''],
    });
    this.correoUsuario = await this.autenticacionServicio.obtenerUsuario()?.email;
  }

  seleccionarCheckbox(valor: boolean) {
    this.checkBox = valor;
    this.formularioEncuesta.get('recomendar')!.setValue(this.checkBox);
  }
  enviarEncuesta() {
    if (this.formularioEncuesta.valid) {
      const datos = {
        correo: this.correoUsuario,
        fecha: new Date(),
        ...this.formularioEncuesta.value
      };

      this.encuestaServicio.guardarEncuesta(datos).then(() => {
        this.mostrarMensaje(true, "Encuesta enviada correctamente");
        this.formularioEncuesta.reset();
      });
    }
  }

    private mostrarMensaje(exito : boolean, texto : string){
        exito ? 
          this.toastr.success(texto, "Encuesta")
        :
          this.toastr.error(texto, "Encuesta")
      }
}
