import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    title: string;
    createdAt: Date;
    finishedAt: Date;
    finished: boolean;
    items: ListaItem[];

    constructor(title: string) {
        this.title = title;
        this.createdAt = new Date();
        this.finished = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}
