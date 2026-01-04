import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryMovementDto } from '../dtos/inventory-movement.dto';
import { ResourceDto } from '../dtos/ResourceDto';
import { InventoryMovementResponseDto } from '../dtos/InventoryMovementResponse.dto';
import { ResourceCreateDto } from '../dtos/resource-create.dto';


@Injectable({
  providedIn: 'root'
})
export class IventoryServiceService {
  private apiUrl = 'http://localhost:8080/api/inventory/admin'
constructor(private http :HttpClient) { }

  createResource(resourceCreate : ResourceCreateDto) : Observable<ResourceCreateDto>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<ResourceCreateDto>(
      this.apiUrl,
      resourceCreate,
      { headers }
    );
  }
  getAllResources() : Observable<ResourceDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<ResourceDto[]>(
      'http://localhost:8080/api/inventory/squad/getAll',
      { headers }
    )
  }

  registerMovement(movement: InventoryMovementDto){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.post(
      'http://localhost:8080/api/inventory/squad/movements',
      movement,
      { headers }
    );
  }
  getAllMovements() : Observable<InventoryMovementResponseDto[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<InventoryMovementResponseDto[]>(
      'http://localhost:8080/api/inventory/admin/movements',
      { headers }
    )
  }
  deleteResource(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

  return this.http.delete(`http://localhost:8080/api/inventory/admin/delete/${id}`,
    { headers }
  );
}
}