import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  generatePDF() {
    let docDefinition = {
      content: ["PDF Created"],
    };
    console.log('alert')

    pdfMake.createPdf(docDefinition).open();
  }
}
