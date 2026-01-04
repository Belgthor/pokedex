import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country';
import { NgbdSortableHeader, SortEvent } from '../../directives/sortable';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-test',
  imports: [DecimalPipe, FormsModule, AsyncPipe, NgbHighlight, NgbdSortableHeader, NgbPaginationModule],
  providers: [CountryService, DecimalPipe],
  templateUrl: './page-test.html',
  styleUrl: './page-test.css'
})
export class PageTest {
  countries$: Observable<Country[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

	constructor(public service: CountryService) {
		this.countries$ = service.countries$;
		this.total$ = service.total$;
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}
}
