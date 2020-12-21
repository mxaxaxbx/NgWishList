import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  lista: Lista;
  itemName = '';

  constructor(
    private deseosSvc: DeseosService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(paramsMap => {
      const params = paramsMap['params'];
      const listId = params['id'];
      this.lista = this.deseosSvc.getList(listId);
    });
  }

  ngOnInit() {
  }

  addItem() {    
    if(this.itemName.length === 0) {
      return;
    }

    const newItem = new ListaItem (this.itemName);

    this.lista.items.push(newItem);
    this.itemName = '';
    this.deseosSvc.saveStorage();
  }

  changeCheck(item: ListaItem) {
    const pendientes = this.lista.items
      .filter(itemData => !itemData.completado)
      .length;

    if (pendientes === 0) {
      this.lista.finishedAt = new Date();
      this.lista.finished = true;

    } else {
      this.lista.finishedAt = null;
      this.lista.finished = false;

    }

    this.deseosSvc.saveStorage();
    
  }

  deleteItem(i: number) {
    this.lista.items.splice(i, 1);
    this.deseosSvc.saveStorage();
  }

}
