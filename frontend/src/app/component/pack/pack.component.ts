import { Component, OnInit } from '@angular/core';
import { PackService } from '../../services/pack/pack.service';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
    selector: 'app-pack',
    templateUrl: './pack.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, CurrencyPipe],
    styleUrls: ['./pack.component.css'],
})
export class PackComponent implements OnInit {
    packs: any[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newPack = { name: '', description: '', price: 0 };
    editPack: any = {};
    packToDelete: any = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;

    constructor(private packService: PackService) {}

    ngOnInit(): void {
        this.loadPacks();
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

    openAddModal(): void {
        this.newPack = { name: '', description: '', price: 0 };
        this.showAddModal = true;
        this.addErrorMessage = null; // Reset error message
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    onAddPack(): void {
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

    openUpdateModal(pack: any): void {
        this.editPack = { ...pack };
        this.showUpdateModal = true;
        this.updateErrorMessage = null; // Reset error message
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdatePack(): void {
        this.packService.updatePack(this.editPack.id, this.editPack).subscribe(
            () => {
                this.loadPacks();
                this.closeUpdateModal();
            },
            (error) => {
                this.updateErrorMessage = this.handleUpdateError(error);
            }
        );
    }

    openDeleteModal(pack: any): void {
        this.packToDelete = pack;
        this.showDeleteModal = true;
        this.generalErrorMessage = null; // Reset error message
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
        this.packToDelete = null;
    }

    onDeletePack(): void {
        if (this.packToDelete) {
            this.packService.deletePack(this.packToDelete.id).subscribe(
                () => {
                    this.loadPacks();
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
        return 'An error occurred while adding the pack.';
    }

    private handleUpdateError(error: any): string {
        return 'An error occurred while updating the pack.';
    }

    private handleGeneralError(error: any): string {
        return 'An error occurred while deleting the pack.';
    }
}
