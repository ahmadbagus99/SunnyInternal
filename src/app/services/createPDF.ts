import { Injectable } from '@angular/core';
//pdf package
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { stringify } from 'querystring';
import { setCheckNoChangesMode } from '@angular/core/src/render3/state';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class CreatPDF {
    letterObj = {
        address: ' Arkadia Green Park Estate, Tower F, 6th Floor, Jl. TB Simatupang No.Kav. 88, RT.1/RW.2, Kebagusan, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520',
        text: ' For purchasing the item with the criteria as below : '
      }
    pdfObj = null;
    constructor(
        private plt: Platform,
        private file: File,
        private fileOpener: FileOpener
        ) {
    }
    createPdf(company, emailCompany, alamatCompany, nomorCompany, namaCustomer, companyCustomer, emailCustomer, alamatCustomer, no_tlp, DataProduct, totalPrice) {
        var Product = DataProduct;
        var Time = new Date().toTimeString();
        Time = Time.toString().substring(0, Time.toString().length-25);

        var date = new Date().toString();
        date = date.toString().substring(0, date.toString().length-34);

        function buildTableBody(data, columns) {
            var body = [];
            body.push(columns);
            data.forEach(function(row) {
                var dataRow = [];
                columns.forEach(function(column) {
                    dataRow.push({text : row[column].toString(), alignment : 'center', fillColor: 'white'});
                })
                body.push(dataRow);
            });
            return body;
        }
        function table(data, columns) {
            return {
                widths : [ '*', 'auto', 100, '*' ],
                alignment : 'center',
                fillColor: 'lightgrey',
                table: {
                    widths: ['*','*'],
                    alignment : 'center',
                    headerRows: 1,
                    body: buildTableBody(data, columns)
                }
            };
        }
        var docDefinition = {
            content: [
                { text: 'Quotation', style: 'header' },
                { text: Time, alignment: 'right' },

                { text: 'Isystem Asia', style: 'subheader1' },
                { text: this.letterObj.address },

                { text: 'To', style: 'subheader' },
                company,
                emailCompany,
                alamatCompany,
                nomorCompany,

                { text: 'Customer Info', style: 'subheader' },
                namaCustomer,
                companyCustomer,
                emailCustomer,
                alamatCustomer,
                no_tlp,

                { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
                table(Product, ['Product','Qty']),
                {
                    table:
                    {
                      widths: ['*', '*'],
                      body: [
                        [{ text: 'Total Price', alignment:'center' ,fillColor: 'lightgrey'}, { text: 'Rp' + totalPrice, alignment:'center', fillColor: 'lightgrey'}],
                      ]
                    }
                  },
                { text: 'Thank you for your bussiness!', style: 'subheader', alignment: 'right' },
                { text: date, alignment: 'right' },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 0]
                },
                subheader1: {
                    fontSize: 10,
                    bold: true,
                    margin: [0, 15, 0, 0]
                },
                story: {
                    italic: true,
                    alignment: 'center',
                    width: '50%',
                }
            }
        }
        this.pdfObj = pdfMake.createPdf(docDefinition);
    }

    downloadPdf() {
        if (this.plt.is('cordova')) {
          this.pdfObj.getBuffer((buffer) => {
            var blob = new Blob([buffer], { type: 'application/pdf' });
            this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
              this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
            })
          });
        } else {
          this.pdfObj.download();
        }
      }
}
