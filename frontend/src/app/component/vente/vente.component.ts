import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../services/vente/vente.service';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ClientService } from '../../services/client/client.service';
import { PackService } from '../../services/pack/pack.service';
import { PaymentStatus } from '../../models/Enums/PaymentStatus';
import { ClientDtoResponse } from '../../models/client.dtos';
import { PackDtoResponse } from '../../models/pack.dtos';

@Component({
    selector: 'app-vente',
    templateUrl: './vente.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, DatePipe, NgClass],
    styleUrls: ['./vente.component.css'],
})
export class VenteComponent implements OnInit {
    ventes: any[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newVente: any = { clientId: null, packId: null, paymentStatus: null, description: '' };
    editVente: any = {};
    venteToDelete: any = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    clients: {id: number, name: string }[] = [];
    packs: {id: number, name: string }[] = [];
    paymentStatuses = Object.values(PaymentStatus);
    currentPage = 0;
    pageSize = 10;
    totalPages = 0;
    totalElements = 0;
    pages: ({ value: number | '...', display: string })[] = [];

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
            (error) => {
                this.generalErrorMessage = 'Error loading clients. Please try again later.';
            }
        );
    }
    loadPackNames(): void {
        this.packService.getAllPackNames().subscribe(
            (data: string[]) => {
                this.packs = data.map((name, index) => ({id: index + 1, name}));
            },
            (error) => {
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
            (error) => {
                this.generalErrorMessage = 'Error loading ventes. Please try again later.';
            }
        );
    }

    openAddModal(): void {
        this.newVente = { clientId: null, packId: null, paymentStatus: null, description: '' };
        this.showAddModal = true;
        this.addErrorMessage = null;
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    onAddVente(): void {
        const venteData = {
            clientId: this.newVente.clientId,
            packId: this.newVente.packId,
            paymentStatus: this.newVente.paymentStatus,
            description: this.newVente.description
        };
        this.venteService.addVente(venteData).subscribe(
            () => {
                this.loadVentes();
                this.closeAddModal();
            },
            (error) => {
                this.addErrorMessage = this.handleAddError(error);
            }
        );
    }

    openUpdateModal(vente: any): void {
        this.editVente = { ...vente, clientId: vente.clientId, packId: vente.packId };
        this.showUpdateModal = true;
        this.updateErrorMessage = null;
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdateVente(): void {
        const updateData = {
            paymentStatus: this.editVente.paymentStatus,
            description: this.editVente.description
        };
        this.venteService.updateVente(this.editVente.id, updateData).subscribe(
            () => {
                this.loadVentes();
                this.closeUpdateModal();
            },
            (error) => {
                this.updateErrorMessage = this.handleUpdateError(error);
            }
        );
    }

    openDeleteModal(vente: any): void {
        this.venteToDelete = vente;
        this.showDeleteModal = true;
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
    }

    onDeleteVente(): void {
        if (this.venteToDelete) {
            this.venteService.deleteVente(this.venteToDelete.id).subscribe(
                () => {
                    this.loadVentes();
                    this.closeDeleteModal();
                },
                (error) => {
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
                for (let i = 0; i < 7 && i < this.totalPages; i++) {
                    this.pages.push({ value: i, display: String(i + 1) });
                }
                this.pages.push({ value: '...', display: '...' });
                this.pages.push({ value: this.totalPages - 1, display: String(this.totalPages) });
            }
            else if (this.currentPage >= this.totalPages - 5) {
                this.pages.push({ value: 0, display: String(1) });
                this.pages.push({ value: '...', display: '...' });
                for (let i = this.totalPages - 7; i < this.totalPages; i++) {
                    this.pages.push({ value: i, display: String(i + 1) });
                }
            }
            else {
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
    // Error handling methods
    private handleAddError(error: any): string {
        return 'Error adding sale. Please try again later.';
    }

    private handleUpdateError(error: any): string {
        return 'Error updating sale. Please try again later.';
    }

    private handleGeneralError(error: any): string {
        return 'Error deleting sale. Please try again later.';
    }
}