import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {ClientDtoRequest, ClientDtoResponse} from "../../models/client.dtos";

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent],
    styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
    clients: ClientDtoResponse[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newClient: ClientDtoRequest = { name: '', email: '', phoneNumber: '', address: '', userId: 0 };
    editClient: ClientDtoResponse = { id:0, name: '', email: '', phoneNumber: '', address: '' };
    clientToDelete:  ClientDtoResponse = { id:0, name: '', email: '', phoneNumber: '', address: '' };
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;

    constructor(private clientService: ClientService) {}

    ngOnInit(): void {
        this.loadClients();
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


    openAddModal(): void {
        this.newClient = { name: '', email: '', phoneNumber: '', address: '', userId: this.getUserId() };
        this.showAddModal = true;
        this.addErrorMessage = null; // Reset error message
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    onAddClient(): void {
        this.newClient.userId = this.getUserId(); // Ensure userId is set

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
                userId: this.getUserId()
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
        this.clientToDelete = { id:0, name: '', email: '', phoneNumber: '', address: '' };
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


    private handleAddError(error: any): string {
        if (error.status === 400) {
            return 'Bad request. Please check the input values.';
        }
        return 'An error occurred while adding the client. Please try again later.';
    }

    private handleUpdateError(error: any): string {
        if (error.status === 400) {
            return 'Bad request. Please check the input values.';
        }
        return 'An error occurred while updating the client. Please try again later.';
    }
    private getUserId(): number {
        const userDetailsString = localStorage.getItem('userDetails');
        if (userDetailsString) {
            try {
                const userDetails = JSON.parse(userDetailsString);
                return userDetails.id; // Adjust to the actual property name containing the user ID
            } catch (error) {
                console.error("Error parsing user details from localStorage", error);
            }
        }
        return 0;
    }
}