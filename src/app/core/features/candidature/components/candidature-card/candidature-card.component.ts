import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CandidatureServiceService} from '../../../../services/candidature-service/candidature-service.service';
import {Candidature} from '../../../../model/Candidature';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-candidature-card',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './candidature-card.component.html',
  styleUrl: './candidature-card.component.css'
})
export class CandidatureCardComponent {

  @Input() candidature!: Candidature;
  @Output() onDeleted: EventEmitter<number> = new EventEmitter();

  isEditingNotes: boolean = false;
  editedNotes: string = '';
  showStatusDropdown: boolean = false;


  constructor(private candidatureService: CandidatureServiceService) {}

  startEditingNotes() {
    this.isEditingNotes = true;
    this.editedNotes = this.candidature.notes || '';
  }


  toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown;
  }


  deleteCandidature(): void {
    if (confirm('Voulez-vous vraiment supprimer cette candidature ?')) {
      this.candidatureService.removeCandidature(this.candidature.id)
        .subscribe(() => {
          this.onDeleted.emit(this.candidature.id);
        });
    }

  }


  saveNotes() {
    this.candidatureService.addNotes(this.candidature.id, this.editedNotes)
      .subscribe(updated => {
        this.candidature.notes = updated.notes;
        this.isEditingNotes = false;
      });
  }



  cancelEditingNotes() {
    this.isEditingNotes = false;
    this.editedNotes = '';
  }

  changeStatus(status: string) {
    this.candidature.status = status;
    this.showStatusDropdown = false;
  this.candidatureService.updateStatus(this.candidature.id,status).subscribe(updated => {
    this.candidature = updated;
  })
  }
}
