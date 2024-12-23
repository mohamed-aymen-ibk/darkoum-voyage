import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider/provider.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {ProviderDtoRequest} from "../../models/provider.dto";

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent],
    styleUrls: ['./provider.component.css'],
})

export class ProviderComponent implements OnInit {
    providers: any[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newProvider: ProviderDtoRequest = { id: 0, name: '', email: '', phone: '' };
    editProvider: ProviderDtoRequest = { id: 0,name: '', email: '', phone: '' };
    providerToDelete: ProviderDtoRequest = { id: 0,name: '', email: '', phone: '' };
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;

    constructor(private providerService: ProviderService) {}

    ngOnInit(): void {
        this.loadProviders();
    }

    loadProviders(): void {
        this.providerService.getProviders().subscribe(
            (data) => {
                this.providers = data;
            },
            (error) => {
                this.generalErrorMessage = 'Error loading providers. Please try again later.';
            }
        );
    }

    openAddModal(): void {
        this.newProvider = { id: 0, name: '', email: '', phone: '' };  // Default id = 0
        this.showAddModal = true;
        this.addErrorMessage = null; // Reset error message
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    onAddProvider(): void {
        this.providerService.addProvider(this.newProvider).subscribe(
            () => {
                this.loadProviders();
                this.closeAddModal();
            },
            (error) => {
                this.addErrorMessage = this.handleAddError(error);
            }
        );
    }

    openUpdateModal(provider: any): void {
        this.editProvider = { ...provider };
        this.showUpdateModal = true;
        this.updateErrorMessage = null; // Reset error message
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdateProvider(): void {
        this.providerService.updateProvider(this.editProvider.id, this.editProvider).subscribe(
            () => {
                this.loadProviders();
                this.closeUpdateModal();
            },
            (error) => {
                this.updateErrorMessage = this.handleUpdateError(error);
            }
        );
    }

    openDeleteModal(provider: any): void {
        this.providerToDelete = provider;
        this.showDeleteModal = true;
        this.generalErrorMessage = null; // Reset error message
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
        this.providerToDelete = { id: 0, name: '', email: '', phone: '' };  // Reset to default object
    }

    onDeleteProvider(): void {
        if (this.providerToDelete && this.providerToDelete.id > 0) {
            this.providerService.deleteProvider(this.providerToDelete.id).subscribe(
                () => {
                    this.loadProviders();
                    this.closeDeleteModal();
                },
                (error) => {
                    this.generalErrorMessage = this.handleGeneralError(error);
                }
            );
        }
    }

    // Error handling methods (unchanged)
    private handleAddError(error: any): string {
        if (error.status === 400) {
            return 'Failed to add provider: Invalid input data.';
        } else if (error.status === 500) {
            return 'Failed to add provider: Server error. Please try again later.';
        }
        return 'Failed to add provider: An unexpected error occurred.';
    }

    private handleUpdateError(error: any): string {
        if (error.status === 404) {
            return 'Failed to update provider: Provider not found.';
        } else if (error.status === 400) {
            return 'Failed to update provider: Invalid input data.';
        } else if (error.status === 500) {
            return 'Failed to update provider: Server error. Please try again later.';
        }
        return 'Failed to update provider: An unexpected error occurred.';
    }

    private handleGeneralError(error: any): string {
        if (error.status === 404) {
            return 'Failed to delete provider: Provider not found.';
        } else if (error.status === 500) {
            return 'Failed to delete provider: Server error. Please try again later.';
        }
        return 'Failed to delete provider: An unexpected error occurred.';
    }
}
