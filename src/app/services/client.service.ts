import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients$ = new BehaviorSubject<Client[]>([
    { firstName: 'Arya', lastName: 'Stark' },
    { firstName: 'Robb', lastName: 'Stark' },
    { firstName: 'Olenna', lastName: 'Tyrell' },
    { firstName: 'Tyrion', lastName: 'Lannister' },
    { firstName: 'Davos', lastName: 'Seaworth' },
    { firstName: 'Renly', lastName: 'Baratheon' },
    { firstName: 'Stannis', lastName: 'Baratheon' },
    { firstName: 'Roose', lastName: 'Bolton' },
  ]);

  constructor() {}

  public getClients(): Observable<Client[]> {
    return this.clients$;
  }
}
