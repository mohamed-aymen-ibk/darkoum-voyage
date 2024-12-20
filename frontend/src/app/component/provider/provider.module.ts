import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProviderComponent} from "./provider.component";

export class Provider {
    id?: string;
    name: string;
    email: string;
    phone: string;

    constructor() {
        this.name = '';
        this.email = '';
        this.phone = '';
    }
}

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
