import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  lista: Lista[] = [];
  @Input() finished = true;
  @ViewChild(IonList) list: IonList;

  constructor(
    private deseosSvc: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.lista = this.deseosSvc.listas;
  }

  selectedList(list: Lista) {
    if (this.finished) {
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);

    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }

  deleteLista(item: Lista) {    
    this.deseosSvc.deleteList(item);
  }

  async modifyList(list: Lista) {    
    const alert = await this.alertCtrl.create({
      header: 'Neva Lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelado');
            this.list.closeSlidingItems();
          }
        },

        {
          text: 'Modificar',
          handler: (data) => {
            if(data.title.lenght === 0) {
              return;
            }

            const listSelected = this.lista.filter(listData => listData.id == list.id);

            listSelected[0].title = data.title;

            this.deseosSvc.saveStorage();
            this.list.closeSlidingItems();
          }
        },
      ]
    });

    alert.present();
  }

}
