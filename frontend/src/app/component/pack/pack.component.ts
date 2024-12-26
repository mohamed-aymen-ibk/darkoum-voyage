import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PackService } from '../../services/pack/pack.service';
import {NgForOf, NgIf, DecimalPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
    selector: 'app-pack',
    templateUrl: './pack.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, DecimalPipe],
    styleUrls: ['./pack.component.css'],
})
export class PackComponent implements OnInit, OnDestroy {
    packs: any[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newPack = { name: '', description: '', price: 0, articleNames: [] as string[] };
    editPack: any = { articleNames: [] as string[] };
    packToDelete: any = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    allArticleNames: string[] = [];
    showArticleDropdownAdd: boolean = false;
    showArticleDropdownUpdate: boolean = false;
    expandedPacks: { [packId: number]: boolean } = {};
    private isDropdownOpen:boolean = false;


    constructor(private packService: PackService) {}

    ngOnInit(): void {
        this.loadPacks();
        this.loadArticleNames();
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
        this.newPack = { name: '', description: '', price: 0, articleNames: [] };
        this.showAddModal = true;
        this.addErrorMessage = null; // Reset error message
        this.showArticleDropdownAdd = false;
    }

    closeAddModal(): void {
        this.showAddModal = false;
        this.showArticleDropdownAdd = false;
    }
    toggleArticleDropdownAdd() {
        this.showArticleDropdownAdd = !this.showArticleDropdownAdd;
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
    updateSelectedArticles(articleName: string, event: any, pack: any): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            pack.articleNames.push(articleName);
        } else {
            pack.articleNames = pack.articleNames.filter((name: string) => name !== articleName);
        }
    }
    openUpdateModal(pack: any): void {
        this.editPack = { ...pack };
        this.showUpdateModal = true;
        this.updateErrorMessage = null;
        this.showArticleDropdownUpdate = false;
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
        this.showArticleDropdownUpdate = false;
    }

    toggleArticleDropdownUpdate() {
        this.showArticleDropdownUpdate = !this.showArticleDropdownUpdate;
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
    togglePackExpansion(packId: number, event: MouseEvent): void {
        this.expandedPacks[packId] = !this.expandedPacks[packId];
        this.isDropdownOpen = this.expandedPacks[packId];
        event.stopPropagation()
    }
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if(this.isDropdownOpen){
            let clickedInside = false;
            let clickedOnTrigger = false
            Object.keys(this.expandedPacks).forEach((packId) => {
                const targetElement = document.querySelector(`.articles-dropdown-${packId}`);
                const triggerElement = document.querySelector(`.articles-trigger-${packId}`);

                if(targetElement){
                    if(targetElement.contains(event.target as Node))
                        clickedInside = true;
                }
                if(triggerElement){
                    if(triggerElement.contains(event.target as Node)){
                        clickedOnTrigger = true;
                    }
                }
            });

            if (!clickedInside && !clickedOnTrigger) {
                this.expandedPacks = {};
                this.isDropdownOpen = false;
            }
        }
    }

    ngOnDestroy(): void {
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
