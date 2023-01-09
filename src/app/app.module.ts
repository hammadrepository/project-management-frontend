import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProjectComponent} from './project/project.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule  } from '@angular/material';
import { DevelopersDialogComponent,AddDeveloperToProjectComponent } from './developers-dialog/developers-dialog.component';
import { TechnologiesDialogComponent } from './technologies-dialog/technologies-dialog.component';
import { DevelopersComponent,DevelopersAddDialogComponent,DevelopersEditDialogComponent } from './developers/developers.component';
import { TechnologiesComponent,TechnologiesAddDialogComponent } from './technologies/technologies.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectEditComponent,
    ProjectAddComponent,
    DevelopersDialogComponent,
    TechnologiesDialogComponent,
    DevelopersComponent,
    AddDeveloperToProjectComponent,
    DevelopersAddDialogComponent,
    DevelopersEditDialogComponent,
    TechnologiesComponent,
    TechnologiesAddDialogComponent
  ],
  entryComponents: [
  DevelopersDialogComponent,
  TechnologiesDialogComponent,
  DevelopersAddDialogComponent,
  DevelopersEditDialogComponent,
  TechnologiesAddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
