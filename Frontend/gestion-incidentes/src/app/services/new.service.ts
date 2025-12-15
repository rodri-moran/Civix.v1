import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewDto } from '../dtos/NewDto.dto';
import { Observable } from 'rxjs';
import { NewResponseDto } from '../dtos/NewResponseDto.dto';
@Injectable({
  providedIn: 'root'
})
export class NewService {
constructor(private http: HttpClient, ) { }
  createNew(dto: NewDto): Observable<NewDto>{
    console.log('dto para create: ',dto);
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders ({
          'Authorization': `Bearer ${token}` 
        });
    return this.http.post<NewDto>(
      "http://localhost:8080/api/report/admin",
      dto,
      { headers },
    )
  }

  getAllNews() : Observable<NewResponseDto[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders ({
          'Authorization': `Bearer ${token}` 
        });
        
    return this.http.get<NewResponseDto[]>(
      "http://localhost:8080/api/report/public"
    )
  }
}