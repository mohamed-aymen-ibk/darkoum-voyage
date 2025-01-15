import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PackService } from '../../services/pack/pack.service';
import { NgForOf, NgIf, DecimalPipe, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { PackDtoRequest, PackDtoResponse } from "../../models/pack.dtos";

@Component({
    selector: 'app-pack',
    templateUrl: './pack.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, DecimalPipe, NgClass, DatePipe],
    styleUrls: ['./pack.component.css'],
})
export class PackComponent implements OnInit, OnDestroy {
    packs: PackDtoResponse[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newPack: PackDtoRequest = { packNumber: '', price: 0, quantity: 0, articleNames: [], clientNames: [], providerNames: [] };
    editPack: PackDtoResponse = { id: 0, packNumber: '', price: 0, quantity: 0, articleNames: [], clientNames: [], providerNames: [] };
    packToDelete: PackDtoResponse | null = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    allArticleNames: string[] = [];
    allClientNames: string[] = [];
    allProviderNames: string[] = [];
    showArticleDropdownAdd: boolean = false;
    showArticleDropdownUpdate: boolean = false;
    showClientDropdownAdd: boolean = false;
    showClientDropdownUpdate: boolean = false;
    expandedPacks: { [packId: number]: boolean } = {};
    expandedProviders: { [packId: number]: boolean } = {};
    private isDropdownOpenTable: boolean = false;
    private isDropdownOpenAdd: boolean = false;
    private isDropdownOpenUpdate: boolean = false;
    searchName: string = '';

    currentPage = 0;
    pageSize = 10;
    totalPages = 0;
    totalElements = 0;
    pages: ({ value: number | '...', display: string })[] = [];
    newProviderName: string = '';
    editProviderName: string = '';

    constructor(private packService: PackService) {}

    ngOnInit(): void {
        this.loadPacks();
        this.loadArticleNames();
        this.loadClientNames();
        this.loadProviderNames();
    }

    loadProviderNames(): void {
        this.packService.getAllProviderNames().subscribe(
            (data) => {
                this.allProviderNames = data;
            },
            (error) => {
                this.generalErrorMessage = 'Error loading provider names.';
            }
        );
    }

    loadClientNames(): void {
        this.packService.getClientNames().subscribe(
            (data) => {
                this.allClientNames = data;
            },
            (error) => {
                this.generalErrorMessage = 'Error loading client names.';
            }
        );
    }

    loadArticleNames(): void {
        this.packService.getArticleNames().subscribe(
            (data) => {
                this.allArticleNames = data;
            },
            (error) => {
                this.generalErrorMessage = 'Error loading article names.';
            }
        );
    }

    loadPacks(): void {
        this.packService.getPacks(this.searchName, this.currentPage, this.pageSize).subscribe(
            (data: any) => {
                this.packs = data.content;
                this.totalPages = data.totalPages;
                this.totalElements = data.totalElements;
                this.generatePageNumbers();
            },
            (error) => {
                this.generalErrorMessage = 'Error loading packs. Please try again later.';
            }
        );
    }

    openAddModal(): void {
        this.newPack = { packNumber: '', price: 0, quantity: 0, articleNames: [], clientNames: [], providerNames: [] };
        this.newProviderName = '';
        this.showAddModal = true;
        this.addErrorMessage = null;
        this.showArticleDropdownAdd = false;
        this.showClientDropdownAdd = false;
    }

    closeAddModal(): void {
        this.showAddModal = false;
        this.showArticleDropdownAdd = false;
        this.showClientDropdownAdd = false;
        this.isDropdownOpenAdd = false;
    }

    toggleArticleDropdownAdd() {
        this.showArticleDropdownAdd = !this.showArticleDropdownAdd;
        this.isDropdownOpenAdd = this.showArticleDropdownAdd;
    }

    toggleClientDropdownAdd() {
        this.showClientDropdownAdd = !this.showClientDropdownAdd;
        this.isDropdownOpenAdd = this.showClientDropdownAdd;
    }

    onAddPack(): void {
        this.newPack.providerNames = [this.newProviderName];
        this.packService.addPack(this.newPack).subscribe(
            () => {
                this.loadPacks();
                this.closeAddModal();
            },
            (error) => {
                this.addErrorMessage = this.handleAddError(error);
            }
        );
    }

    updateSelectedArticles(articleName: string, event: any, pack: PackDtoRequest | PackDtoResponse): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            if (pack.articleNames)
                pack.articleNames.push(articleName);
            else
                pack.articleNames = [articleName];
        } else {
            if (pack.articleNames)
                pack.articleNames = pack.articleNames.filter((name: string) => name !== articleName);
        }
    }

    updateSelectedClients(clientName: string, event: any, pack: PackDtoRequest | PackDtoResponse): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            if (pack.clientNames)
                pack.clientNames.push(clientName);
            else
                pack.clientNames = [clientName];
        } else {
            if (pack.clientNames)
                pack.clientNames = pack.clientNames.filter((name: string) => name !== clientName);
        }
    }

    openUpdateModal(pack: PackDtoResponse): void {
        this.editPack = { ...pack };
        this.editProviderName = this.editPack.providerNames?.[0] || '';
        this.showUpdateModal = true;
        this.updateErrorMessage = null;
        this.showArticleDropdownUpdate = false;
        this.showClientDropdownUpdate = false;
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
        this.showArticleDropdownUpdate = false;
        this.showClientDropdownUpdate = false;
        this.isDropdownOpenUpdate = false;
    }

    toggleArticleDropdownUpdate() {
        this.showArticleDropdownUpdate = !this.showArticleDropdownUpdate;
        this.isDropdownOpenUpdate = this.showArticleDropdownUpdate;
    }

    toggleClientDropdownUpdate() {
        this.showClientDropdownUpdate = !this.showClientDropdownUpdate;
        this.isDropdownOpenUpdate = this.showClientDropdownUpdate;
    }

    onUpdatePack(): void {
        this.editPack.providerNames = [this.editProviderName];
        this.packService.updatePack(this.editPack.id!, this.editPack).subscribe(
            () => {
                this.loadPacks();
                this.closeUpdateModal();
            },
            (error) => {
                this.updateErrorMessage = this.handleUpdateError(error);
            }
        );
    }

    openDeleteModal(pack: PackDtoResponse): void {
        if (pack) {
            this.packToDelete = pack;
            this.showDeleteModal = true;
            this.generalErrorMessage = null; // Reset error message
            console.log("Pack to delete", this.packToDelete);
        }
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
        this.packToDelete = null;
    }

    onDeletePack(): void {
        if (this.packToDelete && this.packToDelete.id) {
            console.log("Deleting pack with ID", this.packToDelete.id);
            this.packService.deletePack(this.packToDelete.id).subscribe(
                () => {
                    this.loadPacks();
                    this.closeDeleteModal();
                },
                (error) => {
                    console.error("Delete error", error);
                    this.generalErrorMessage = this.handleGeneralError(error);
                }
            );
        } else {
            console.error("packToDelete or packToDelete.id is not defined");
        }
    }

    onSearch(value: string) {
        this.searchName = value;
        this.currentPage = 0;
        this.loadPacks();
    }

    goToPage(page: number | string): void {
        if (page === '...') {
            return;
        }
        this.currentPage = page as number;
        this.loadPacks();
    }

    generatePageNumbers(): void {
        this.pages = [];
        if (this.totalPages <= 10) {
            for (let i = 0; i < this.totalPages; i++) {
                this.pages.push({ value: i, display: String(i + 1) });
            }
        } else {
            if (this.currentPage < 5) {
                for (let i = 0; i < 7 && i < this.totalPages; i++) {
                    this.pages.push({ value: i, display: String(i + 1) });
                }
                this.pages.push({ value: '...', display: '...' });
                this.pages.push({ value: this.totalPages - 1, display: String(this.totalPages) });
            } else if (this.currentPage >= this.totalPages - 5) {
                this.pages.push({ value: 0, display: String(1) });
                this.pages.push({ value: '...', display: '...' });
                for (let i = this.totalPages - 7; i < this.totalPages; i++) {
                    this.pages.push({ value: i, display: String(i + 1) });
                }
            } else {
                this.pages.push({ value: 0, display: String(1) });
                this.pages.push({ value: '...', display: '...' });
                for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
                    this.pages.push({ value: i, display: String(i + 1) });
                }
                this.pages.push({ value: '...', display: '...' });
                this.pages.push({ value: this.totalPages - 1, display: String(this.totalPages) });
            }
        }
    }

    togglePackExpansion(packId: number, event: MouseEvent): void {
        this.expandedPacks[packId] = !this.expandedPacks[packId];
        this.isDropdownOpenTable = this.expandedPacks[packId];
        event.stopPropagation();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (this.isDropdownOpenTable) {
            let clickedInside = false;
            let clickedOnTrigger = false;
            Object.keys(this.expandedPacks).forEach((packId) => {
                const targetElement = document.querySelector(`.articles-dropdown-${packId}`);
                const triggerElement = document.querySelector(`.articles-trigger-${packId}`);

                if (targetElement) {
                    if (targetElement.contains(event.target as Node))
                        clickedInside = true;
                }
                if (triggerElement) {
                    if (triggerElement.contains(event.target as Node)) {
                        clickedOnTrigger = true;
                    }
                }
            });
            Object.keys(this.expandedProviders).forEach((packId) => {
                const targetProviderElement = document.querySelector(`.providers-dropdown-${packId}`);
                const triggerProviderElement = document.querySelector(`.providers-trigger-${packId}`);
                if (targetProviderElement) {
                    if (targetProviderElement.contains(event.target as Node))
                        clickedInside = true;
                }
                if (triggerProviderElement) {
                    if (triggerProviderElement.contains(event.target as Node)) {
                        clickedOnTrigger = true;
                    }
                }
            });

            if (!clickedInside && !clickedOnTrigger) {
                this.expandedPacks = {};
                this.expandedProviders = {};
                this.isDropdownOpenTable = false;
            }
        }
        if (this.isDropdownOpenAdd) {
            const targetElement = document.querySelector(`.articles-dropdown-add`);
            const triggerElement = document.querySelector(`.articles-trigger-add`);

            if (targetElement && !targetElement.contains(event.target as Node) && !triggerElement?.contains(event.target as Node)) {
                this.showArticleDropdownAdd = false;
                this.isDropdownOpenAdd = false;
            }
        }
        if (this.isDropdownOpenUpdate) {
            const targetElement = document.querySelector(`.articles-dropdown-update`);
            const triggerElement = document.querySelector(`.articles-trigger-update`);

            if (targetElement && !targetElement.contains(event.target as Node) && !triggerElement?.contains(event.target as Node)) {
                this.showArticleDropdownUpdate = false;
                this.isDropdownOpenUpdate = false;
            }
        }
    }

    ngOnDestroy(): void {}

    // Error handling methods
    private handleAddError(error: any): string {
        return 'An error occurred while adding the pack.';
    }

    private handleUpdateError(error: any): string {
        return 'An error occurred while updating the pack.';
    }

    private handleGeneralError(error: any): string {
        return 'An error occurred while deleting the pack.';
    }
}