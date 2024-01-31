import { Component } from '@angular/core';
import { ConfigurationFormComponent } from '../../components/configuration-form/configuration-form.component';
import { ConfigurationFormValue } from '../../shared/configuration.model';

@Component({
  selector: 'ai-configuration',
  standalone: true,
  imports: [
    ConfigurationFormComponent,
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {
  onSubmit(data: ConfigurationFormValue): void {
    console.log(data);
  }
}
