import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ApiService } from '../../../common/api-service/api.service';
import { TripModel } from '../../../common/models/trip-model';
import { UserModel } from '../../../common/models/user-model';

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

  // payment with paypal
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 7.7;

  paypalConfig: any;
  paymentWith: string = '0';

  minDate = new Date();
  tripModel: TripModel = {
    id: '',
    idCompany: '',
    idTrain: '',
    start_date: '',
    start_time_train: '',
    end_time_train: '',
    type_ticket: '0',
    price_origin: '',
    price: '',
  };

  userModel: UserModel = {
    name: '',
    cmnd: '',
    phone: '',
    email: '',
    born: '',
    address: '',
  };

  tripsTemp: any[] = [];
  trips: any[] = [];
  numberTicket: number = 1;
  totalPrice: number = 0;
  tripBook: any;
  start_date: string;
  coupon: string = '';

  constructor(private api: ApiService) { }

  ngOnInit() {
    // load data history from cookie 
    if (this.api.cookie.getCookie('trip') != null) {
      this.tripModel = this.api.toObject(this.api.cookie.getCookie('trip'));
      console.log(this.tripModel);
      this.start_date = this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');
    }

    // load data history from cookie 
    if (this.api.cookie.getCookie('numberTicket') != null) {
      this.numberTicket = Number(this.api.cookie.getCookie('numberTicket'));
      console.log(this.numberTicket);
    }

    // load data history from cookie 
    console.log('c');
    if (this.api.cookie.getCookie('tripBook') != null) {
      this.tripBook = this.api.toObject(this.api.cookie.getCookie('tripBook'));
      console.log(this.tripBook);

      // calculator money
      this.totalPrice = this.numberTicket * Number(this.tripBook.price);
      this.finalAmount = Number(this.totalPrice) / 23000;
      this.finalAmount = Math.round(this.finalAmount * 100) / 100;
    }

    // load data user
    if (this.api.cookie.getCookie('userModel') != null) {
      this.userModel = this.api.toObject(this.api.cookie.getCookie('userModel'));
      this.userModel.born = new Date(this.userModel.born);
      console.log('userModel', this.userModel);
    }
  }

  ngAfterViewChecked(): void {
    this.paypalConfig = {
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
          this.onConfirmClick(true);
        })
      }
    };

    this.generatePaypal();
  }

  /**
   * áp dụng mã giảm giá
   */
  onPromotionClick() {
    this.api.showWarning('Mã đã hết hạn hoặc không hợp lệ!');
  }

  /**
   * Xác nhận khi thanh toán thành công
   * @param flagPaymentDone thanh toán hoàn thành có đúng không
   */
  onConfirmClick(flagPaymentDone) {
    const user = {
      company: this.api.company,
      name: this.userModel.name,
      phone: this.userModel.phone,
      cmnd: this.userModel.cmnd,
      email: this.userModel.email,
      address: this.userModel.address,
      born: this.api.formatDate(this.userModel.born)
    };

    const booking = {
      trip: this.tripBook.id,
      user: 0,
      number_ticket: this.numberTicket,
      coupon: this.coupon,
      payment_type: this.paymentWith,
      payment_status: 0,
      start_date: this.api.formatDate(new Date())
    };

    const mail = {
      content: this.createContent(flagPaymentDone, this.userModel),
      to: this.userModel.email
    }

    // create mail sent to user
    if (flagPaymentDone) {
      // user đã thanh toán tiền xong
      booking.payment_status = 1;

    } else {
      // user thanh toán sau
      booking.payment_status = 0;
    }

    // gửi mail thành công cho user 
    this.api.excuteAllByWhat(mail, 'sendMail').subscribe(data => {
      this.api.showSuccess('Đã gửi mail thành công!');
    });

    // add thong tin user vào database
    this.api.excuteAllByWhat(user, 'createDataUserBooking').subscribe(dataUser => {
      booking.user = dataUser[0].id;

      // add booking
      this.api.excuteAllByWhat(booking, 'createDataBooking').subscribe(dataBooking => {
        console.log('success', dataBooking);

        // book vé cho user
        let bookeds = [];
        for (let i = 0; i < this.numberTicket; i++) {
          const booked = {
            company: this.api.company,
            train: this.tripBook.train,
            trip: this.tripBook.id,
            user: dataUser[0].id,
            booking: dataBooking[0].id,
            number_seat: 'xxx',
            is_debt: 0,
            start_date: this.tripBook.start_date,
            status: flagPaymentDone ? 3 : 4, // đã thanh toán/ chưa thanh toán
            pay_type: this.paymentWith,
            price_origin: this.tripBook.price_origin,
            price: this.tripBook.price,
            time_check_in: new Date(),
            role: '0',
          };
          bookeds.push(booked);
        }

        this.api.excuteAllByWhat(bookeds, 'createDataTicketAuto').subscribe(data => {
          console.log('insert ticket thanh công', data);

          // create path for seo and go to list 
          const lichTrinh = (this.tripModel.type_ticket == '0') ? 'cang-sa-ky-di-dao-ly-son' : 'dao-ly-son-di-cang-sa-ky';
          const path = '/confirm/ve-tau-' + lichTrinh + '-ngay-' + this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');
          this.api.navigate(path);
        });
      });
    });

  }

  /**
   * generatePaypal
   */
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

  /**
   * addPaypalScript
   */
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


  /**
   * https://wordtohtml.net/
   * @param paymentStatus 
   * @param userModel 
   */
  createContent(paymentStatus, userModel: UserModel) {
    const lichTrinh = (this.tripModel.type_ticket == '0') ? 'cang-sa-ky-di-dao-ly-son' : 'dao-ly-son-di-cang-sa-ky';
    let payment_type = '';
    let extend = '';
    switch (this.paymentWith) {
      case '0':
        payment_type = 'Thanh toán với Paypal';
        extend = ` 
        <p>Quý khách đã T<strong>hanh Toán thành công với Paypal</strong>, thông tin vé lên tàu của quý khách bên dưới</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>Vé 1:</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>Tên tàu: Chín Nghĩa 07</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>Ngày đi: 11/12/2019</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>Giờ đi: 08:30</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>Số ghế: 123</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>Vé 2:</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>Tên tàu: Chín Nghĩa 07</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>Ngày đi: 11/12/2019</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>Giờ đi: 08:30</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>Số ghế: 124</p>
        `;
        break;
      case '1':
        payment_type = 'Thanh toán tại cảng';
        extend = ` 
        <p>Để T<strong>hanh Toán tại cảng</strong> bạn vui lòng đọc mã số đặt vé <strong>8533&nbsp;</strong>cho nhân viên tại cảng để tiến hành thanh toán và nhận vé</p>
        `;
        break;
      case '2':
        payment_type = 'Thanh toán chuyễn khoản ngân hàng';
        extend = ` 
        <p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>Để thanh toán bằng chuyễn khoản quý khách vui lòng chuyễn khoản với nội dung bên dưới</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Ngân hàng</strong>: TPbank chi nhánh Đà Nẵng</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Số tài khoản nhận</strong>: 123</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Người nhận</strong>: le hong phuong</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Nội dung</strong>: iziship 123934</p>
        `;
        break;
      case '3':
        payment_type = 'Thanh toán qua ví điện tử MOMO';
        extend = ` 
        <p>Để T<strong>hanh Toán qua ví MOMO</strong> chuyễn khoản theo thông tin bên dưới:</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>Số điện thoại nhận: 0379558185</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>Nội dung: iziship 855034</p>
        `;
        break;
    }

    // kiểm tra đã thanh toán hay chưa
    if (paymentStatus) {
      return ` 
        <p><strong>Xin chào ` + userModel.name + `</strong></p><br>
        <p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span><strong>Chúc mừng bạn đã đặt vé tàu thành công</strong></p>
        <p><strong><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span></strong>Thông tin đăng ký chi tiết như sau:</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Lịch trình</strong>: đi từ ` + lichTrinh + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Ngày đi</strong>: ` + this.tripModel.start_date + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;<strong>&nbsp;</strong></span><strong>Số lượng vé đặt</strong>: ` + this.numberTicket + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Tổng tiền</strong>: ` + this.totalPrice + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Người đặt</strong>: ` + userModel.name + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;<strong>&nbsp;</strong></span><strong>Hình thức thanh toán</strong>: ` + payment_type + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;<strong>&nbsp;</strong></span><strong>Trạng trái thanh toán</strong>: Đã thanh Toán</p>

        ` + extend + `

        <br><p><strong>Xin chân thành Cảm Ơn ` + userModel.name + ` đã sử dụng dịch vụ của chúng tôi!</strong></p>
        <p><strong>Ban quản trị hệ thống bán vé tàu lý sơn - iziship.vn</strong></p>
          `;
    } else {
      return ` 
        <p><strong>Xin chào ` + userModel.name + `</strong></p><br>
        <p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span><strong>Chúc mừng bạn đã đặt vé tàu thành công</strong></p>
        <p><strong><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span></strong>Thông tin đăng ký chi tiết như sau:</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Lịch trình</strong>: đi từ ` + lichTrinh + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Ngày đi</strong>: ` + this.tripModel.start_date + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;<strong>&nbsp;</strong></span><strong>Số lượng vé đặt</strong>: ` + this.numberTicket + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Tổng tiền</strong>: ` + this.totalPrice + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><strong>Người đặt</strong>: ` + userModel.name + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;<strong>&nbsp;</strong></span><strong>Hình thức thanh toán</strong>: ` + payment_type + `</p>
        <p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;<strong>&nbsp;</strong></span><strong>Trạng trái thanh toán</strong>: Chưa thanh Toán</p>

        ` + extend + `

        <br><p><strong>Xin chân thành Cảm Ơn ` + userModel.name + ` đã sử dụng dịch vụ của chúng tôi!</strong></p>
        <p><strong>Ban quản trị hệ thống bán vé tàu lý sơn - iziship.vn</strong></p>
    `;
    }
  }





}
