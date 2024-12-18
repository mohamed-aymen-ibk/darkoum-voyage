import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProviderComponent} from "./provider.component";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ProviderComponent
    ],
    exports: [
        ProviderComponent
    ]
})
export class ProviderModule { }
