import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {ClientDtoRequest, ClientDtoResponse} from "../../models/client.dtos";

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, NgClass],
    styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
    clients: ClientDtoResponse[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newClient: ClientDtoRequest = { name: '', cin: '', email: '', phoneNumber: '', address: '', userId: 0, codeClient: '', designation: '', ice: '', rc: '', rib:'' };
    editClient: ClientDtoResponse = { id:0, cin: '', name: '', email: '', phoneNumber: '', address: '', codeClient: '', designation: '', ice: '', rc: '', rib:'' };
    clientToDelete:  ClientDtoResponse = { id:0, name: '', cin: '', email: '', phoneNumber: '', address: '', codeClient: '', designation: '', ice: '', rc: '', rib:'' };
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    searchName: string = '';
    currentPage = 0;
    pageSize = 10;
    totalPages = 0;
    totalElements = 0;
    pages: ({ value: number | '...', display: string })[] = [];
    codeClients: string[] = [];

    constructor(private clientService: ClientService) {}

    ngOnInit(): void {
        this.loadClients();
        this.loadAllCodeClients();
    }

    loadClients(): void {
        this.clientService.getClients(this.searchName, this.currentPage, this.pageSize).subscribe(
            (data: any) => {
                this.clients = data.content;
                this.totalPages = data.totalPages;
                this.totalElements = data.totalElements;
                this.generatePageNumbers();
            },
            (error) => {
                this.generalErrorMessage = 'Error loading clients. Please try again later.';
            }
        );
    }

    loadAllCodeClients(): void{
        this.clientService.getClientNames().subscribe(
            (data: any) => {
                this.codeClients = data;
            }
        )
    }


    openAddModal(): void {
        this.newClient = { name: '', email: '', phoneNumber: '', address: '', cin: '', userId: this.getUserId(), codeClient: '', designation: '', ice: '', rc: '', rib:'' };
        this.showAddModal = true;
        this.addErrorMessage = null; // Reset error message
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    onAddClient(): void {
        const userId = this.getUserId();
        if (userId === 0) {
            this.addErrorMessage = 'User ID not found, please login again.';
            return;
        }
        this.newClient.userId = userId; // Ensure userId is set
        if (this.codeClients.includes(this.newClient.codeClient!)) {
            this.addErrorMessage = 'Code client already exists. Please use a unique code.';
            return;
        }


        this.clientService.addClient(this.newClient).subscribe(
            () => {
                this.loadClients();
                this.closeAddModal();
            },
            (error) => {
                this.addErrorMessage = this.handleAddError(error);
            }
        );
    }

    openUpdateModal(client: ClientDtoResponse): void {
        this.editClient = { ...client };
        this.showUpdateModal = true;
        this.updateErrorMessage = null; // Reset error message
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdateClient(): void {
        if (this.editClient && this.editClient.id) {
            const clientToUpdate: ClientDtoRequest = {
                name: this.editClient.name,
                email: this.editClient.email,
                phoneNumber: this.editClient.phoneNumber,
                address: this.editClient.address,
                cin: this.editClient.cin,
                userId: this.getUserId(),
                codeClient: this.editClient.codeClient,
                designation: this.editClient.designation,
                ice: this.editClient.ice,
                rc: this.editClient.rc,
                rib: this.editClient.rib
            };

            this.clientService.updateClient(this.editClient.id, clientToUpdate).subscribe(
                () => {
                    this.loadClients();
                    this.closeUpdateModal();
                },
                (error) => {
                    this.updateErrorMessage = this.handleUpdateError(error);
                }
            );
        }
    }

    openDeleteModal(client: ClientDtoResponse): void {
        this.clientToDelete = client;
        this.showDeleteModal = true;
        this.generalErrorMessage = null; // Reset error message
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
        this.clientToDelete = { id:0, name: '', email: '', phoneNumber: '', address: '', cin:'', codeClient: '', designation: '', ice: '', rc: '', rib:'' };
    }

    onDeleteClient(): void {
        if (this.clientToDelete && this.clientToDelete.id) {
            this.clientService.deleteClient(this.clientToDelete.id).subscribe(
                () => {
                    this.loadClients();
                    this.closeDeleteModal();
                },
                (error) => {
                    this.generalErrorMessage = 'Error deleting client. Please try again later.';
                }
            );
        }
    }
    onSearch(value: string) {
        this.searchName = value;
        this.currentPage = 0;
        this.loadClients();
    }
    goToPage(page: number | string):void{
        if (page === '...') {
            return;
        }
        this.currentPage = page as number;
        this.loadClients()
    }
    generatePageNumbers():void{
        this.pages = [];
        if (this.totalPages <= 10) {
            for (let i = 0; i < this.totalPages; i++) {
                this.pages.push({value: i, display: String(i+1)  });
            }
        } else {
            if (this.currentPage < 5) {
                for (let i = 0; i < 7 && i < this.totalPages ; i++) {
                    this.pages.push({value: i, display: String(i+1) })
                }
                this.pages.push({value: '...', display: '...' });
                this.pages.push({value: this.totalPages - 1, display: String(this.totalPages) })
            }
            else if (this.currentPage >= this.totalPages - 5){
                this.pages.push({value: 0, display: String(1) });
                this.pages.push({value: '...', display: '...' });
                for (let i = this.totalPages - 7; i < this.totalPages; i++) {
                    this.pages.push({value: i, display: String(i+1) })
                }
            }
            else{
                this.pages.push({value: 0, display: String(1)});
                this.pages.push({value: '...', display: '...' });
                for (let i = this.currentPage -2; i <= this.currentPage + 2; i++) {
                    this.pages.push({value: i, display: String(i+1) })
                }
                this.pages.push({value: '...', display: '...' });
                this.pages.push({value: this.totalPages-1, display: String(this.totalPages) })
            }
        }
    }

    private handleAddError(error: any): string {
        if (error.status === 400) {
            return 'Bad request. Please check the input values.';
        } else if (error.status === 500) {
            return 'Failed to add client: Server error. Please try again later.';
        }
        return 'Failed to add client: An unexpected error occurred.';
    }

    private handleUpdateError(error: any): string {
        if (error.status === 404) {
            return 'Failed to update client: Client not found.';
        } else if (error.status === 400) {
            return 'Bad request. Please check the input values.';
        } else if (error.status === 500) {
            return 'Failed to update client: Server error. Please try again later.';
        }
        return 'An error occurred while updating the client. Please try again later.';
    }
    private getUserId(): number {
        const userDetailsString = localStorage.getItem('user');
        if (userDetailsString) {
            try {
                const userDetails = JSON.parse(userDetailsString);
                if (userDetails && typeof userDetails.id === 'number') {
                    return userDetails.id;
                } else if (userDetails && typeof userDetails.id === 'string') {
                    return parseInt(userDetails.id, 10); // Try parsing if it is a string
                }
                console.error("User ID not found or invalid in userDetails", userDetails);
            } catch (error) {
                console.error("Error parsing user details from localStorage", error);
            }
        }
        return 0;
    }
}