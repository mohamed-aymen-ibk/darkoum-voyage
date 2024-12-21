import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  imports: [NgIf, FormsModule, NgForOf, FooterComponent, NavbarComponent],
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  articles: any[] = [];
  showAddModal = false;
  showUpdateModal = false;
  showDeleteModal = false;
  newArticle = { title: '', content: '', author: '' };
  editArticle: any = {};
  articleToDelete: any = null;
  addErrorMessage: string | null = null;
  updateErrorMessage: string | null = null;
  generalErrorMessage: string | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
        (data) => {
          this.articles = data;
        },
        (error) => {
          this.generalErrorMessage = 'Error loading articles. Please try again later.';
        }
    );
  }

  openAddModal(): void {
    this.newArticle = { title: '', content: '', author: '' };
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
        (error) => {
          this.addErrorMessage = this.handleAddError(error);
        }
    );
  }

  openUpdateModal(article: any): void {
    this.editArticle = { ...article };
    this.showUpdateModal = true;
    this.updateErrorMessage = null;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  onUpdateArticle(): void {
    this.articleService.updateArticle(this.editArticle.id, this.editArticle).subscribe(
        () => {
          this.loadArticles();
          this.closeUpdateModal();
        },
        (error) => {
          this.updateErrorMessage = this.handleUpdateError(error);
        }
    );
  }

  openDeleteModal(articleId: any): void {
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
        (error) => {
          this.generalErrorMessage = 'Error deleting article. Please try again later.';
        }
    );
  }

  private handleAddError(error: any): string {
    return error.error?.message || 'Failed to add article. Please try again later.';
  }

  private handleUpdateError(error: any): string {
    return error.error?.message || 'Failed to update article. Please try again later.';
  }
}
