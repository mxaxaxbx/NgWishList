import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private deseosSvc: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit(): void {
  }

  async addList() {
    const alert = await this.alertCtrl.create({
      header: 'Neva Lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelado');
            
          }
        },

        {
          text: 'Crear',
          handler: (data) => {
            if(data.title.lenght === 0) {
              return;
            }

            const listId = this.deseosSvc.createList(data.title);
            
            this.router.navigateByUrl(`/tabs/tab1/add/${listId}`);
          }
        },
      ]
    });

    alert.present();
  }

  

}
