import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material'; 
import { ApiService } from '../../../common/api-service/api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewChecked {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  minDate = new Date();

  // payment with paypal
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AWDsm3NLtkWHuQWUhawhOdVoAjBPMrpKQEFMiVwUt7NTD_nMy4d5HsSrE9Khy8gwhQxty9XD00fHpLnc',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        console.log('thanh công', payment);
        this.onConfirmClick();
      })
    }
  };


  paymentWith: string = '0';

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.generatePaypal();
  }

  /**
   * áp dụng mã giảm giá
   */
  onPromotionClick() {

  }

  /**
   * Xác nhận khi thanh toán thành công
   */
  onConfirmClick() {
    this.api.navigate('/confirm');
  }

  generatePaypal() {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(
          this.paypalConfig,
          '#paypal-button-container',
          {
            style: {
              layout: 'horizontal',
              fundingicons: 'true',
            },
            funding: {
              allowed: [paypal.FUNDING.CARD],
              disallowed: [paypal.FUNDING.CREDIT]
            }
          }
        );
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

}
