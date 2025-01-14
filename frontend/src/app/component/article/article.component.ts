import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ArticleDtoRequest, ArticleDtoResponse } from "../../models/article.dtos";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent, NgClass],
    styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
    articles: ArticleDtoResponse[] = [];
    showAddModal = false;
    showUpdateModal = false;
    showDeleteModal = false;
    newArticle: ArticleDtoRequest = {  codeArticle: '', designation: '' ,  userId: 1};
    editArticle: ArticleDtoResponse = { id: 0, codeArticle:'', designation: '' };
    articleToDelete: ArticleDtoResponse | null = null;
    addErrorMessage: string | null = null;
    updateErrorMessage: string | null = null;
    generalErrorMessage: string | null = null;
    searchName: string = '';
    currentPage = 0;
    pageSize = 10;
    totalPages = 0;
    totalElements = 0;
    pages: (number | '...')[] = [];

    constructor(private articleService: ArticleService) { }

    ngOnInit(): void {
        this.loadArticles();
    }

    loadArticles(): void {
        this.articleService.getArticles(this.searchName, this.currentPage, this.pageSize).subscribe(
            (data: any) => {
                this.articles = data.content;
                this.totalPages = data.totalPages;
                this.totalElements = data.totalElements;
                this.generatePageNumbers();
            },
            (error) => {
                this.generalErrorMessage = 'Error loading articles. Please try again later.';
            }
        );
    }

    openAddModal(): void {
        this.newArticle = {  codeArticle: '', designation: '',  userId: 1};
        this.showAddModal = true;
        this.addErrorMessage = null; // Reset error message
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
            (error) => {
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
        if (this.editArticle && this.editArticle.id) {
            const articleToUpdate: ArticleDtoRequest = {
                codeArticle: this.editArticle.codeArticle,
                designation: this.editArticle.designation,
                userId: 1
            };
            this.articleService.updateArticle(this.editArticle.id, articleToUpdate).subscribe(
                () => {
                    this.loadArticles();
                    this.closeUpdateModal();
                },
                (error) => {
                    this.updateErrorMessage = this.handleUpdateError(error);
                }
            );
        }
    }


    openDeleteModal(article: ArticleDtoResponse): void {
        this.articleToDelete = article;
        this.showDeleteModal = true;
        this.generalErrorMessage = null;
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
        this.articleToDelete = null;
    }
    onDeleteArticle(): void {
        if (this.articleToDelete && this.articleToDelete.id) {
            this.articleService.deleteArticle(this.articleToDelete.id).subscribe(
                () => {
                    this.loadArticles();
                    this.closeDeleteModal();
                },
                (error) => {
                    this.generalErrorMessage = this.handleGeneralError(error);
                }
            );
        }
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
                    this.pages.push(i);
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
                this.pages.push('...');
                for (let i = this.currentPage -2; i <= this.currentPage + 2; i++) {
                    this.pages.push(i);
                }
                this.pages.push('...')
                this.pages.push(this.totalPages-1)
            }
        }
    }
    private handleAddError(error: any): string {
        if (error.status === 400) {
            return 'Failed to add article: Invalid input data.';
        } else if (error.status === 500) {
            return 'Failed to add article: Server error. Please try again later.';
        }
        return 'Failed to add article: An unexpected error occurred.';
    }

    private handleUpdateError(error: any): string {
        if (error.status === 404) {
            return 'Failed to update article: Article not found.';
        } else if (error.status === 400) {
            return 'Failed to update article: Invalid input data.';
        } else if (error.status === 500) {
            return 'Failed to update article: Server error. Please try again later.';
        }
        return 'Failed to update article: An unexpected error occurred.';
    }

    private handleGeneralError(error: any): string {
        if (error.status === 404) {
            return 'Failed to delete article: Article not found.';
        } else if (error.status === 500) {
            return 'Failed to delete article: Server error. Please try again later.';
        }
        return 'Failed to delete article: An unexpected error occurred.';
    }
}