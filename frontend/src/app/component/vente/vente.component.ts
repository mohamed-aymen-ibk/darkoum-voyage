import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { VenteService } from '../../services/vente/vente.service';
import { DatePipe, NgClass, NgForOf, NgIf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ClientService } from '../../services/client/client.service';
import { PackService } from '../../services/pack/pack.service';
import { VenteDtoRequest, VenteDtoResponse } from "../../models/vente.dtos";

@Component({
    selector: 'app-vente',
    templateUrl: './vente.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, DatePipe, NgClass, DecimalPipe],
    styleUrls: ['./vente.component.css'],
})
export class VenteComponent implements OnInit, OnDestroy {
    ventes: VenteDtoResponse[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newVente: VenteDtoRequest = { clientId: [], packId: [], saleNumber: '', quantity: 0, price: 0, factured: false };
    editVente: VenteDtoResponse = { id: 0, clientName: '', packNumber: '', quantity: 0, createdAt: new Date(), saleNumber: '', clientNames: [], providerNames: [], packNumbers:[], clientId:[], packId:[], factured: false  };
    venteToDelete: any = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    clients: { id: number, name: string }[] = [];
    packs: { id: number, packNumber: string }[] = [];
    currentPage = 0;
    pageSize = 10;
    totalPages = 0;
    totalElements = 0;
    pages: ({ value: number | '...', display: string })[] = [];
    salePrice: number | null = null;
    selectedPacks:  number[] = [];
    selectedClients: number[] = [];
    expandedClients: { [venteId: number]: boolean } = {};
    expandedPacks: { [venteId: number]: boolean } = {};
    private isDropdownOpenTable: boolean = false;
    showPackDropdownAdd = false;
    showClientDropdownAdd = false; // Toggle client dropdown visibility
    selectedFilter: string = 'All';
    searchTerm: string = '';


    constructor(
        private venteService: VenteService,
        private clientService: ClientService,
        private packService: PackService
    ) { }

    ngOnInit(): void {
        this.loadVentes();
        this.loadClientsAndPacks();
    }

    loadClientsAndPacks(): void {
        this.clientService.getClients().subscribe(  //  changed to getClients
            (data: any) => {
                this.clients = data.content;
            },
            () => {
                this.generalErrorMessage = 'Error loading clients. Please try again later.';
            }
        );
        this.packService.getPacks().subscribe( // Corrected line
            (data: any) => {
                this.packs = data.content;
            },
            () => {
                this.generalErrorMessage = 'Error loading packs. Please try again later.';
            }
        );
    }

    loadVentes(): void {
        this.venteService.getVentes(this.currentPage, this.pageSize, this.selectedFilter).subscribe(
            (data: any) => {
                this.ventes = data.content;
                this.totalPages = data.totalPages;
                this.totalElements = data.totalElements;
                this.generatePageNumbers();
            },
            () => {
                this.generalErrorMessage = 'Error loading ventes. Please try again later.';
            }
        );
    }


    openAddModal(): void {
        this.newVente = { clientId: [], packId: [], saleNumber: '', quantity: 0, price: 0, factured: false };
        this.showAddModal = true;
        this.addErrorMessage = null;
        this.salePrice = null;
        this.selectedPacks = [];
        this.selectedClients = [];
        this.showPackDropdownAdd = false;
        this.showClientDropdownAdd = false;
    }

    closeAddModal(): void {
        this.showAddModal = false;
        this.salePrice = null;
        this.selectedPacks = [];
        this.selectedClients = [];
        this.showPackDropdownAdd = false;
        this.showClientDropdownAdd = false;
    }

    onAddVente(): void {
        if (this.selectedClients.length <= 0) {
            this.addErrorMessage = 'Must select at least one Client.';
        } else if (this.selectedPacks.length <= 0) {
            this.addErrorMessage = 'Must select at least one Pack.';
        } else {

            this.newVente.clientId = this.selectedClients;
            this.newVente.packId = this.selectedPacks;
            console.log("newVente before service call", this.newVente)

            this.venteService.addVente(this.newVente).subscribe(
                () => {
                    this.loadVentes();
                    this.closeAddModal();
                },
                (error) => {
                    this.addErrorMessage = this.handleAddError(error);
                }
            );
        }
    }

    updateSelectedPacks(pack: { id: number, packNumber: string }, event: any): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.selectedPacks.push(pack.id);
        } else {
            this.selectedPacks = this.selectedPacks.filter(p => p !== pack.id);
        }
        console.log("selectedPacks: "+ this.selectedPacks)
    }

    updateSelectedClients(client: { id: number, name: string }, event: any): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.selectedClients.push(client.id);
        } else {
            this.selectedClients = this.selectedClients.filter(c => c !== client.id);
        }
        console.log("selectedClients: "+ this.selectedClients)
    }

    openUpdateModal(vente: VenteDtoResponse): void {
        this.editVente = { ...vente };
        this.showUpdateModal = true;
        this.updateErrorMessage = null;
        this.selectedPacks = vente.packNumbers?.map((packNumber, index) => index+1) || [];
        this.selectedClients = vente.clientNames?.map((clientName, index) => index+1) || [];
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }


    onUpdateVente(): void {
        const updateData: any = {};

        if(this.editVente.saleNumber){
            updateData.saleNumber = this.editVente.saleNumber;
        }
        if(this.editVente.quantity){
            updateData.quantity = this.editVente.quantity;
        }
        if(this.editVente.price){
            updateData.price = this.editVente.price;
        }
        updateData.factured = this.editVente.factured; // send the actual value from the toggle

        if(this.selectedPacks){
            updateData.packId = this.selectedPacks;
        }
        if(this.selectedClients){
            updateData.clientId = this.selectedClients;
        }

        this.venteService.updateVente(this.editVente.id!, updateData).subscribe(
            () => {
                this.loadVentes();
                this.closeUpdateModal();
            },
            (error) => {
                this.updateErrorMessage = this.handleUpdateError(error);
            }
        );
    }

    openDeleteModal(vente: VenteDtoResponse): void {
        this.venteToDelete = vente;
        this.showDeleteModal = true;
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
        this.venteToDelete = null;
    }

    onDeleteVente(): void {
        if (this.venteToDelete) {
            this.venteService.deleteVente(this.venteToDelete.id!).subscribe(
                () => {
                    this.loadVentes();
                    this.closeDeleteModal();
                },
                () => {
                    this.generalErrorMessage = 'Error deleting sale. Please try again later.';
                }
            );
        }
    }

    goToPage(page: number | string): void {
        if (page === '...') {
            return;
        }
        this.currentPage = page as number;
        this.loadVentes();
    }

    onSearchChange(event: any): void {
        this.searchTerm = event.target.value;
    }
    onFilterChange(): void {
        this.currentPage = 0;
        this.loadVentes();
    }

    toggleFacturedAdd() {
        this.newVente.factured = !this.newVente.factured;
    }

    toggleFacturedEdit() {
        this.editVente.factured = !this.editVente.factured;
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

    togglePackExpansion(venteId: number, event: MouseEvent): void {
        this.expandedPacks[venteId] = !this.expandedPacks[venteId];
        this.isDropdownOpenTable = this.expandedPacks[venteId];
        event.stopPropagation();
    }

    toggleClientExpansion(venteId: number, event: MouseEvent): void {
        this.expandedClients[venteId] = !this.expandedClients[venteId];
        this.isDropdownOpenTable = this.expandedClients[venteId];
        event.stopPropagation();
    }

    toggleClientDropdownAdd(): void {
        this.showClientDropdownAdd = !this.showClientDropdownAdd;
    }

    togglePackDropdownAdd(): void {
        this.showPackDropdownAdd = !this.showPackDropdownAdd;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (this.isDropdownOpenTable) {
            let clickedInside = false;
            let clickedOnTrigger = false;
            Object.keys(this.expandedClients).forEach((venteId) => {
                const targetElement = document.querySelector(`.clients-dropdown-${venteId}`);
                const triggerElement = document.querySelector(`.clients-trigger-${venteId}`);

                if (targetElement) {
                    if (targetElement.contains(event.target as Node))
                        clickedInside = true;
                }
                if (triggerElement) {
                    if (triggerElement.contains(event.target as Node))
                        clickedOnTrigger = true;
                }
            });
            if (!clickedInside && !clickedOnTrigger) {
                this.expandedClients = {};
                this.isDropdownOpenTable = false;
            }
            Object.keys(this.expandedPacks).forEach((venteId) => {
                const targetElement = document.querySelector(`.articles-dropdown-${venteId}`);
                const triggerElement = document.querySelector(`.articles-trigger-${venteId}`);

                if (targetElement) {
                    if (targetElement.contains(event.target as Node))
                        clickedInside = true;
                }
                if (triggerElement) {
                    if (triggerElement.contains(event.target as Node))
                        clickedOnTrigger = true;
                }
            });
            if (!clickedInside && !clickedOnTrigger) {
                this.expandedPacks = {};
                this.isDropdownOpenTable = false;
            }
        }
    }

    ngOnDestroy(): void { }

    // Error handling methods
    private handleAddError(error: any): string {
        return error.error?.message || 'Error adding sale. Please try again later.';
    }

    private handleUpdateError(error: any): string {
        return error.error?.message || 'Error updating sale. Please try again later.';
    }
}