import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { Client } from '../interfaces/client';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-imperative',
  templateUrl: './imperative.page.html',
  styleUrls: ['./imperative.page.scss'],
})
export class ImperativePage implements OnInit, OnDestroy {
  public searchField: FormControl;
  public clients: Client[];
  public filteredClients: Client[];

  // Trigger this to unsubscribe observables
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private clientService: ClientService) {
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    // Get our client data
    this.clientService
      .getClients()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clients) => {
        this.clients = clients;

        // Set list to all clients by default
        this.filteredClients = clients;
      });

    // React to changes in the search term
    this.searchField.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.filteredClients = this.clients.filter(
          (client) =>
            searchTerm === '' ||
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
