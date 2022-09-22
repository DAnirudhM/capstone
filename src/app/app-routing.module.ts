import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



const fallbackRoute: Route = {
  path: '**',
  component: PageNotFoundComponent ,
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'motorsport', component: HomeComponent },
  { path: 'f-1', component: DetailsComponent },
  { path: 'f-2', component: DetailsComponent },
  { path: 'f-3', component: DetailsComponent },
  { path: 'f-e', component: DetailsComponent },
  { path: 'motogp', component: DetailsComponent },
  fallbackRoute,
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

