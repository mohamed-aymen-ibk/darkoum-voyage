import { Component, OnInit } from '@angular/core';
import { VenteService } from '../../services/vente/vente.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";

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
    newVente = { productName: '', customer: '', date: '' };
    editVente: any = {};
    venteToDelete: any = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;

    constructor(private venteService: VenteService) {}

    ngOnInit(): void {
        this.loadVentes();
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
        this.newVente = { productName: '', customer: '', date: '' };
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
                    this.generalErrorMessage = 'Error deleting vente. Please try again later.';
                }
            );
        }
    }

    private handleAddError(error: any): string {
        return 'Error adding vente. Please try again later.';
    }

    private handleUpdateError(error: any): string {
        return 'Error updating vente. Please try again later.';
    }
}
