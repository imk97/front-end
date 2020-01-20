import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner, private route: ActivatedRoute, private dataservice: DataService) { }
  
  data: any;
  qrData: any;
  elementType;
  scannedCode = null;
  private book = [];
  
  ngOnInit() {
    //this.data = this.route.snapshot.paramMap.get('qr');
    this.qrData = this.dataservice.getPlateNum();
    this.elementType = 'img';
    console.log(this.qrData);
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcode => {
        this.scannedCode = barcode
      }
    );
  }

  

  

}
