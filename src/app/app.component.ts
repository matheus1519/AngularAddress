import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';

interface AddressFromApi {
  cep: string
  logradouro: string 
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cep = ''
  street = ''
  number = ''
  complement = ''
  state = ''
  city = ''
  neighborhood = ''

  constructor(private http: HttpClient){}

  onInputCep(){
    if(this.cep.length === 8){
     this.http.get<AddressFromApi>(`https://viacep.com.br/ws/${this.cep}/json/`)
        .subscribe(data => {
          this.street = data.logradouro
          this.state = data.uf
          this.city = data.localidade
          this.neighborhood = data.bairro
        })
    }
  }
}
