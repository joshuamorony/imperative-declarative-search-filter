import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientService } from '../services/client.service';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public searchField: FormControl;
  public filteredClients$: Observable<Client[]>;

  constructor(private clientService: ClientService) {
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    // Get a stream of our client data
    const clients$ = this.clientService.getClients();

    // Get a stream of our search term
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    // Combine the latest values from both streams into one stream
    this.filteredClients$ = combineLatest([clients$, searchTerm$]).pipe(
      map(([clients, searchTerm]) =>
        // Apply whatever logic we want using the values from each stream
        // In this case, the new stream should return only clients that match
        // the search term (or return all clients if the search term is blank).
        clients.filter(
          (client) =>
            searchTerm === '' ||
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
}
