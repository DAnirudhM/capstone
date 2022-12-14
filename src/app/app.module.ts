import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HeaderComponent } from './components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { FooterComponent } from './components/footer/footer.component';
import { DescriptionComponent } from './components/description/description.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ContentComponent } from './components/content/content.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { RemoveWhiteSpacePipe } from './pipe/remove-white-space-pipe.class';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { TeamRegistrationComponent } from './components/team-registration/team-registration.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DescriptionComponent,
    CarouselComponent,
    ContentComponent,
    RemoveWhiteSpacePipe,
    PageNotFoundComponent,
    HomeComponent,
    DetailsComponent,
    TabMenuComponent,
    RegistrationComponent,
    TeamRegistrationComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenuModule,
    BreadcrumbModule,
    InputTextModule,
    CarouselModule,
    TabMenuModule,
    TableModule,
    ToolbarModule,
    HttpClientModule,
    DialogModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SliderModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
