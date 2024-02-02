import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThreadService } from '../../../+chat/shared/thread.service';
import { take } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ConfigurationFormService } from '../../shared/configuration-form.service';
import { ConfigurationFormValue } from '../../shared/configuration.model';
import { CardFooterComponent } from '../../../../components/cards';
import { voices } from '../../shared/configuration.helpers';

@Component({
  selector: 'ai-configuration-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    CardFooterComponent,
  ],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
})
export class ConfigurationFormComponent {
  voices = voices;
  form = this.configurationFormService.form;
  @Output() submit$ = new EventEmitter<ConfigurationFormValue>();

  constructor(
    private readonly threadService: ThreadService,
    private readonly configurationFormService: ConfigurationFormService,
  ) {}

  startChat(): void {
    this.threadService
      .start()
      .pipe(take(1))
      .subscribe(() => {
        this.submit$.emit(this.form.value as ConfigurationFormValue);
      });
  }
}
