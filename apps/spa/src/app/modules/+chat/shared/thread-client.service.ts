import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateThreadDto, GetThreadResponseDto } from '@boldare/ai-assistant';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ThreadClientService {
  constructor(private readonly httpClient: HttpClient) {}

  postThread(payload: CreateThreadDto = {}): Observable<GetThreadResponseDto> {
    return this.httpClient.post<GetThreadResponseDto>(
      `${environment.apiUrl}/assistant/threads`,
      payload,
    );
  }

  getThread(id: string): Observable<GetThreadResponseDto> {
    return this.httpClient.get<GetThreadResponseDto>(
      `${environment.apiUrl}/assistant/threads/${id}`,
    );
  }
}
