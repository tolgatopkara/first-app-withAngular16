import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
        <main>
          <header class="brand-name">
            <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
          </header>
          <section class="content">
            <router-outlet/>
          </section>
        </main>
  `,
    styleUrls: ['./app.component.scss'],
    imports: [HomeComponent,RouterModule]
})
export class AppComponent {
  title = 'default';
}
