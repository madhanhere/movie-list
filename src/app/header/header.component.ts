import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, map, tap } from 'rxjs';

import { AuthService } from '../api/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup<any> = new FormGroup({
    search: new FormControl('')
  });

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.searchForm.valueChanges
    .pipe(
      untilDestroyed(this),
      debounceTime(350),
      map((value) => value['search']?.trim()),
      tap((value: string) => {
        this.result.emit(value);
      })
    ).subscribe();
  }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
  }

}
