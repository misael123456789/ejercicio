import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string | undefined;
  isLoading = false;

  //Variables utilizadas en el ejercicio
  number:any;
  multiplos: any[];
  color: any;

  constructor(private quoteService: QuoteService) { 
    this.multiplos = [];
  }

  ngOnInit() {
    this.color = '#000000'
    this.isLoading = true;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; });
  }


  //Funcion que ese ejecuta cuando el formulario es enviado
  onSubmit(form: NgForm){
    this.getMultiplos(this.number)
  }

  //Funcion para obtener los multiplos solicitados y asignar un color
  getMultiplos(numero: number){
    this.multiplos = [];
    if(( numero % 3 ) == 0){
      this.multiplos.push({color: '#00FF00', number: '3'})
    }

    if(( numero % 5 ) == 0){
      this.multiplos.push({color: '#FF0000', number: '5'})
    }

    if(( numero % 7 ) == 0){
      this.multiplos.push({color: '#0000FF', number: '7'})
    }
    if(this.multiplos.length > 0){
      this.color = this.multiplos[0].color
    }
    

    
  }

}
