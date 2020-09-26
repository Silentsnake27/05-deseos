import { Component, OnInit, ViewChild } from "@angular/core";
import { DeseosService } from "src/app/services/deseos.service";
import { ActivatedRoute } from "@angular/router";
import { Lista } from "src/app/models/lista.model";
import { ListaItem } from "src/app/models/lista-item.model";
import { AlertController, IonList } from "@ionic/angular";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {
  @ViewChild('list2') item: IonList;
  lista: Lista;
  nombreItem = "";
  constructor(
    private _deseosService: DeseosService,
    private _route: ActivatedRoute,
    private _alertCtrl: AlertController
  ) {
    const listaId = this._route.snapshot.paramMap.get("listaId");

    this.lista = this._deseosService.obtenerLista(listaId);

    // console.log(listaId);

    // console.log(this.lista);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) return;

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = "";
    this._deseosService.guardarStorage();
  }

  async editarItem(item) {
    // console.log(item);
    
    const alert = await this._alertCtrl.create({
      header: "Editar Item",
      inputs: [
        {
          name: "desc",
          type: "text",
          value: item.desc,
          placeholder: "Nombre de la lista",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar");
            this.item.closeSlidingItems();
          },
        },
        {
          text: "Editar",
          handler: (data) => {
            console.log(data);
            if (data.length === 0) {
              return;
            }

            item.desc = data.desc;

            //Tengo que guardar los cambios
            this._deseosService.guardarStorage();
            this.item.closeSlidingItems();
          },
        },
      ],
    });
    await alert.present();
  }

  cambioCheck(item: ListaItem) {
    // console.log(item);
    const pendientes = this.lista.items.filter(
      (itemData) => !itemData.completado
    ).length;

    console.log({ pendientes });

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this._deseosService.guardarStorage();

    // console.log(this._deseosService.listas);
  }

  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this._deseosService.guardarStorage();
  }
}
