
import { Component, OnInit } from '@angular/core';
import { ProviderService } from "../../services/provider/provider.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    imports: [
        NgForOf
    ],
    styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

    providers: any[] = [];

    constructor(private providerService: ProviderService) { }

    ngOnInit(): void {
        this.loadProviders();
    }

    // Load providers from the API
    loadProviders(): void {
        this.providerService.getProviders().subscribe(data => {
            this.providers = data;
        });
    }

    // Add provider
    onAddProvider(): void {
        const newProvider = { name: 'New Provider', email: 'new@provider.com', phone: '1234567890' }; // Dummy data, adjust as needed
        this.providerService.addProvider(newProvider).subscribe(() => {
            this.loadProviders();
        });
    }

    // Update provider
    onUpdateProvider(id: number): void {
        const updatedProvider = { name: 'Updated Name', email: 'updated@provider.com', phone: '0987654321' }; // Dummy data, adjust as needed
        this.providerService.updateProvider(id, updatedProvider).subscribe(() => {
            this.loadProviders();
        });
    }

    // Delete provider (pass the provider ID)
    onDeleteProvider(id: number): void {
        if (confirm('Are you sure you want to delete this provider?')) {
            this.providerService.deleteProvider(id).subscribe(() => {
                this.loadProviders();
            });
        }
    }
}
