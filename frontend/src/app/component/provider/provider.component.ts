import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider/provider.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ProviderDtoRequest, ProviderDtoResponse } from "../../models/provider.dto";

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, NgClass, DatePipe],
    styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit {
    providers: ProviderDtoResponse[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newProvider: ProviderDtoRequest = { name: '', email: '', phone: '' , address: '', serviceType: ''};
    editProvider: ProviderDtoResponse = { id: 0, name: '', email: '', phone: '', address: '', serviceType: '', createdAt: new Date() };
    providerToDelete: ProviderDtoResponse = { id: 0, name: '', email: '', phone: '', address: '', serviceType: '', createdAt: new Date() };
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    searchName: string = '';

    currentPage = 0;
    pageSize = 10;
    totalPages = 0;
    totalElements = 0;
    pages: (number | '...')[] = [];

    constructor(private providerService: ProviderService) { }

    ngOnInit(): void {
        this.loadProviders();
    }

    loadProviders(): void {
        this.providerService.getProviders(this.searchName, this.currentPage, this.pageSize).subscribe(
            (data: any) => {
                this.providers = data.content;
                this.totalPages = data.totalPages;
                this.totalElements = data.totalElements;
                this.generatePageNumbers();
            },
            (error) => {
                this.generalErrorMessage = 'Error loading providers. Please try again later.';
            }
        );
    }

    openAddModal(): void {
        this.newProvider = { name: '', email: '', phone: '', address: '', serviceType: '' };
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

    openUpdateModal(provider: ProviderDtoResponse): void {
        this.editProvider = { ...provider };
        this.showUpdateModal = true;
        this.updateErrorMessage = null;
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdateProvider(): void {
        if (this.editProvider && this.editProvider.id) {
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
    }

    openDeleteModal(provider: ProviderDtoResponse): void {
        this.providerToDelete = provider;
        this.showDeleteModal = true;
        this.generalErrorMessage = null;
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
        this.providerToDelete = { id: 0, name: '', email: '', phone: '', address: '', serviceType: '', createdAt: new Date() };
    }

    onDeleteProvider(): void {
        if (this.providerToDelete && this.providerToDelete.id) {
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
    onSearch(value: string) {
        this.searchName = value;
        this.currentPage = 0;
        this.loadProviders();
    }
    goToPage(page: number):void{
        this.currentPage = page;
        this.loadProviders()
    }
    generatePageNumbers(): void {
        this.pages = [];
        if (this.totalPages <= 10) {
            for (let i = 0; i < this.totalPages; i++) {
                this.pages.push(i);
            }
        } else {
            if (this.currentPage < 5) {
                for (let i = 0; i < 7 && i < this.totalPages ; i++) {
                    this.pages.push(i)
                }
                this.pages.push('...');
                this.pages.push(this.totalPages - 1)
            }
            else if (this.currentPage >= this.totalPages - 5){
                this.pages.push(0);
                this.pages.push('...');
                for (let i = this.totalPages - 7; i < this.totalPages; i++) {
                    this.pages.push(i);
                }
            }
            else{
                this.pages.push(0)
                this.pages.push('...')
                for (let i = this.currentPage -2; i <= this.currentPage + 2; i++) {
                    this.pages.push(i);
                }
                this.pages.push('...')
                this.pages.push(this.totalPages-1)
            }
        }
    }


    // Error handling methods
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