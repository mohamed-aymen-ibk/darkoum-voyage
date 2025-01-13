import { Component, OnInit, HostListener , OnDestroy } from '@angular/core';
import { VenteService } from '../../services/vente/vente.service';
import { DatePipe, NgClass, NgForOf, NgIf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ClientService } from '../../services/client/client.service';
import { PackService } from '../../services/pack/pack.service';
import {VenteDtoRequest, VenteDtoResponse} from "../../models/vente.dtos";
import { PackDtoResponse } from "../../models/pack.dtos";

@Component({
    selector: 'app-vente',
    templateUrl: './vente.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, DatePipe, NgClass,DecimalPipe],
    styleUrls: ['./vente.component.css'],
})
export class VenteComponent implements OnInit, OnDestroy {
    ventes: VenteDtoResponse[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newVente: VenteDtoRequest = { clientId: 0, packId: 0,  saleNumber: '', quantity:0, price:0 };
    editVente: VenteDtoResponse = { id: 0, clientName: '', packNumber: '', quantity: 0 ,  createdAt: new Date(),  saleNumber: '' , articleNames: [], providerNames:[]};
    venteToDelete: any = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    clients: {id: number, name: string }[] = [];
    packs:  PackDtoResponse[] = [];
    currentPage = 0;
    pageSize = 10;
    totalPages = 0;
    totalElements = 0;
    pages: ({ value: number | '...', display: string })[] = [];
    salePrice: number | null = null;
    selectedPacks: PackDtoResponse[] = [];
    expandedPacks: { [venteId: number]: boolean } = {};
    private isDropdownOpenTable: boolean = false;


    constructor(
        private venteService: VenteService,
        private clientService: ClientService,
        private packService: PackService
    ) { }

    ngOnInit(): void {
        this.loadVentes();
        this.loadClientNames();
        this.loadPackNames();
    }

    loadClientNames(): void {
        this.clientService.getAllClientNames().subscribe(
            (data: string[]) => {
                this.clients = data.map((name, index) => ({id: index + 1, name}));
            },
            () => {
                this.generalErrorMessage = 'Error loading clients. Please try again later.';
            }
        );
    }
    loadPackNames(): void {
        this.packService.getAllPacks().subscribe(
            (data: any) => {
                this.packs = data.content;
            },
            () => {
                this.generalErrorMessage = 'Error loading packs. Please try again later.';
            }
        );
    }
    loadVentes(): void {
        this.venteService.getVentes(this.currentPage, this.pageSize).subscribe(
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
        this.newVente = { clientId: 0, packId: 0,  saleNumber: '', quantity:0, price: 0};
        this.showAddModal = true;
        this.addErrorMessage = null;
        this.salePrice =  null;
        this.selectedPacks = [];
    }

    closeAddModal(): void {
        this.showAddModal = false;
        this.salePrice = null;
        this.selectedPacks = []

    }
    onClientSelected(){
        this.newVente.packId = 0;
        this.salePrice = null;
        this.selectedPacks = []

    }

    updatePrice() {
        if (this.newVente.quantity > 0 && this.selectedPacks.length > 0) {
            this.salePrice =  this.selectedPacks.reduce((sum,pack) => sum + pack.price,0) * this.newVente.quantity;
            this.newVente = {...this.newVente, price: this.salePrice };

        } else{
            this.newVente = {...this.newVente, price: 0 };

        }

        this.salePrice = this.salePrice?? 0;
    }

    onAddVente(): void {
        this.newVente.price = this.salePrice?? 0;

        if(this.selectedPacks.length <= 0){
            this.addErrorMessage = 'Must select at least one Pack.';
            return
        }
        this.newVente.packId = this.selectedPacks[0].id
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

    updateSelectedPacks(pack: PackDtoResponse, event: any): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if(isChecked)
            this.selectedPacks= [pack];
        else
            this.selectedPacks = [];

        this.updatePrice()
    }

    openUpdateModal(vente: VenteDtoResponse): void {
        this.editVente = { ...vente };
        this.showUpdateModal = true;
        this.updateErrorMessage = null;
    }
    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdateVente(): void {
        const updateData = {
        };
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
    generatePageNumbers(): void {
        this.pages = [];
        if (this.totalPages <= 10) {
            for (let i = 0; i < this.totalPages; i++) {
                this.pages.push({ value: i, display: String(i + 1) });
            }
        } else {
            if (this.currentPage < 5) {
                for (let i = 0; i < 7 && i < this.totalPages ; i++) {
                    this.pages.push({ value: i, display: String(i+1)  });
                }
                this.pages.push({ value: '...', display: '...' });
                this.pages.push({ value: this.totalPages - 1, display: String(this.totalPages) })
            }
            else if (this.currentPage >= this.totalPages - 5){
                this.pages.push({value: 0, display: String(1) });
                this.pages.push({ value: '...', display: '...' });
                for (let i = this.totalPages - 7; i < this.totalPages; i++) {
                    this.pages.push({value: i, display: String(i+1)  });
                }
            }
            else{
                this.pages.push({value: 0, display: String(1)});
                this.pages.push({value: '...', display: '...' });
                for (let i = this.currentPage -2; i <= this.currentPage + 2; i++) {
                    this.pages.push({value: i, display: String(i + 1) });
                }
                this.pages.push({ value: '...', display: '...' });
                this.pages.push({value: this.totalPages-1, display: String(this.totalPages) })
            }
        }
    }
    togglePackExpansion(venteId: number, event: MouseEvent): void {
        this.expandedPacks[venteId] = !this.expandedPacks[venteId];
        this.isDropdownOpenTable = this.expandedPacks[venteId];
        event.stopPropagation();
    }
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (this.isDropdownOpenTable) {
            let clickedInside = false;
            let clickedOnTrigger = false
            Object.keys(this.expandedPacks).forEach((venteId) => {
                const targetElement = document.querySelector(`.articles-dropdown-${venteId}`);
                const triggerElement = document.querySelector(`.articles-trigger-${venteId}`);

                if(targetElement){
                    if (targetElement.contains(event.target as Node))
                        clickedInside=true;
                }
                if (triggerElement) {
                    if(triggerElement.contains(event.target as Node)){
                        clickedOnTrigger= true;
                    }
                }
            });
            if(!clickedInside && !clickedOnTrigger){
                this.expandedPacks = {};
                this.isDropdownOpenTable = false;
            }
        }
    }
    ngOnDestroy(): void {

    }


    // Error handling methods
    private handleAddError(error: any): string {
        return  error.error?.message ||  'Error adding sale. Please try again later.';
    }

    private handleUpdateError(error: any): string {
        return  error.error?.message ||   'Error updating sale. Please try again later.';
    }
    private handleGeneralError(error: any): string {
        return 'Error deleting sale. Please try again later.';
    }
}