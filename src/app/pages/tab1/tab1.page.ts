import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // listas:Lista[] = []


  constructor(public _deseosService:DeseosService,
              private _router: Router,
              private _alertCtrl: AlertController) {
    // this.listas = this._deseosService.listas
  }

 async agregarLista(){
    
    const alert = await this._alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cacenlar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data );
            if(data.titulo.length === 0){
              return;
            }

          const listaId = this._deseosService.crearLista(data.titulo)

            //Tengo que crear la lista
             this._router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            
          }
        }
      ]
    })
    await alert.present();
  }


}
