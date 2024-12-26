import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../services/vente/vente.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import {ClientService} from "../../services/client/client.service";
import {PackService} from "../../services/pack/pack.service";
import {PaymentStatus} from "../../models/Enums/PaymentStatus";

@Component({
    selector: 'app-vente',
    templateUrl: './vente.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, DatePipe],
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
    clients: any[] = [];
    packs: any[] = [];
    paymentStatuses = Object.values(PaymentStatus);



    constructor(private venteService: VenteService, private clientService: ClientService,  private packService: PackService) {}


    ngOnInit(): void {
        this.loadVentes();
        this.loadClients();
        this.loadPacks();
    }
    loadClients(): void {
        this.clientService.getClients().subscribe(
            (data) => {
                this.clients = data;
            },
            (error) => {
                this.generalErrorMessage = 'Error loading clients. Please try again later.';
            }
        );
    }
    loadPacks(): void {
        this.packService.getPacks().subscribe(
            (data) => {
                this.packs = data;
            },
            (error) => {
                this.generalErrorMessage = 'Error loading packs. Please try again later.';
            }
        );
    }

    loadVentes(): void {
        this.venteService.getVentes().subscribe(
            (data) => {
                this.ventes = data;
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

    openUpdateModal(vente: any): void {
        this.editVente = { ...vente };
        this.showUpdateModal = true;
        this.updateErrorMessage = null;
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdateVente(): void {
        this.venteService.updateVente(this.editVente.id, this.editVente).subscribe(
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
        this.generalErrorMessage = null;
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
                    this.generalErrorMessage = this.handleGeneralError(error);
                }
            );
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