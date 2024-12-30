import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ArticleDtoRequest, ArticleDtoResponse } from "../../models/article.dtos";
import { ProviderService } from "../../services/provider/provider.service";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, NgClass, DecimalPipe],
    styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
    articles: ArticleDtoResponse[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newArticle: ArticleDtoRequest = { name: '', description: '', price: 0, stock: 0, providerName: '', userId: 1 };
    editArticle: ArticleDtoResponse = { id: 0, name: '', description: '', price: 0, stock: 0, providerName: '' };
    articleToDelete: any = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    providerNames: string[] = [];
    searchName: string = '';
    currentPage = 0;
    pageSize = 10;
    totalPages = 0;
    totalElements = 0;
    pages: (number | '...')[] = [];

    constructor(private articleService: ArticleService, private providerService: ProviderService) { }

    ngOnInit(): void {
        this.loadArticles();
        this.loadProviders();
    }

    loadArticles(): void {
        this.articleService.getArticles(this.searchName, this.currentPage, this.pageSize).subscribe(
            (data: any) => {
                this.articles = data.content;
                this.totalPages = data.totalPages;
                this.totalElements = data.totalElements;
                this.generatePageNumbers();
            },
            (error: any) => {
                this.generalErrorMessage = 'Error loading articles. Please try again later.';
            }
        );
    }


    loadProviders(): void {
        this.providerService.getProviderNames().subscribe(
            (data) => {
                this.providerNames = data;
            },
            (error: any) => {
                this.generalErrorMessage = 'Error loading providers. Please try again later.';
            }
        );
    }

    openAddModal(): void {
        this.newArticle = { name: '', description: '', price: 0, stock: 0, providerName: '', userId: 1 };
        this.showAddModal = true;
        this.addErrorMessage = null;
    }

    closeAddModal(): void {
        this.showAddModal = false;
    }

    onAddArticle(): void {
        this.articleService.addArticle(this.newArticle).subscribe(
            () => {
                this.loadArticles();
                this.closeAddModal();
            },
            (error: any) => {
                this.addErrorMessage = this.handleAddError(error);
            }
        );
    }

    openUpdateModal(article: ArticleDtoResponse): void {
        this.editArticle = { ...article };
        this.showUpdateModal = true;
        this.updateErrorMessage = null;
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdateArticle(): void {
        const articleToUpdate: ArticleDtoRequest = {
            name: this.editArticle.name,
            description: this.editArticle.description,
            price: this.editArticle.price,
            stock: this.editArticle.stock,
            providerName: this.editArticle.providerName,
            userId: 1
        };

        this.articleService.updateArticle(this.editArticle.id, articleToUpdate).subscribe(
            () => {
                this.loadArticles();
                this.closeUpdateModal();
            },
            (error: any) => {
                this.updateErrorMessage = this.handleUpdateError(error);
            }
        );
    }

    openDeleteModal(articleId: number): void {
        this.articleToDelete = articleId;
        this.showDeleteModal = true;
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
    }

    onDeleteArticle(): void {
        this.articleService.deleteArticle(this.articleToDelete).subscribe(
            () => {
                this.loadArticles();
                this.closeDeleteModal();
            },
            (error: any) => {
                this.generalErrorMessage = 'Error deleting article. Please try again later.';
            }
        );
    }

    onSearch(value: string) {
        this.searchName = value;
        this.currentPage = 0;
        this.loadArticles();
    }

    goToPage(page: number):void{
        this.currentPage = page;
        this.loadArticles()
    }
    generatePageNumbers(): void {
        this.pages = [];
        if (this.totalPages <= 10) {
            for (let i = 0; i < this.totalPages; i++) {
                this.pages.push(i);
            }
        } else {
            if (this.currentPage < 5) {
                for (let i = 0; i < 7 && i < this.totalPages ; i++) {
                    this.pages.push(i)
                }
                this.pages.push('...');
                this.pages.push(this.totalPages - 1)
            }
            else if (this.currentPage >= this.totalPages - 5){
                this.pages.push(0);
                this.pages.push('...');
                for (let i = this.totalPages - 7; i < this.totalPages; i++) {
                    this.pages.push(i);
                }
            }
            else{
                this.pages.push(0)
                this.pages.push('...')
                for (let i = this.currentPage -2; i <= this.currentPage + 2; i++) {
                    this.pages.push(i);
                }
                this.pages.push('...')
                this.pages.push(this.totalPages-1)
            }
        }
    }

    private handleAddError(error: any): string {
        return error.error?.message || 'Failed to add article. Please try again later.';
    }

    private handleUpdateError(error: any): string {
        return error.error?.message || 'Failed to update article. Please try again later.';
    }
}
