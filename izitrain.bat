List các chức năng 
-Trang chủ giới thiệu thông tin và cho phép tìm chuyến tàu theo lịch trình, ngày đi => Các thông tin này sẽ được lưu vào cookie để lần sau quay lại vẫn hiện thì đúng thông tin đó người ta sẽ đổi thôi
-Trang hiển thị thông tin tìm kiếm ra các chuyến tàu theo ngày chọn theo chuyến được lấy từ api của các hãng tàu => sẽ được sắp xếp mặt định theo giờ tăng dần
-Các công cụ search => ở trên sẽ là thêm thông tin số lượng khách
-Công cụ seach nâng cao bên trái => search tăng giảm giờ đi => search tăng giảm giá tiền => search tăng giảm số lượng ghế trống => search theo hãng tàu
-Các thông tin cần hiển thị ở trang chi tiết là: image, tên tàu, tên hãng, star review, photo của tàu,  from address, to address, from time, to time, price
-Khi click thì sẽ ra 1 trang mới => hiện thị thông tin chi tiết của chuyến tàu gồm: tên chuyến đi từ đâu đến đâu => tên tàu, tên hãng, star review, photo của tàu, thông tin chi tiết lịch trình: đi từ đâu đến đau, mấy giờ đến mấy giờ, đi mất bao lâu, giá tiền => Review của tàu này trong các chuyến trước 
-chọn thông tin để đặt vé => ngày, giờ, số vé, giá tiền => book now
-Đăng nhâp bằng google, facebook, hoặc tạo tài khoản
-Tự động fill các thông tin họ, tên, cmnd, email, phone => nếu có nhiều vé thì các khách khác sẽ fill thông tin họ và tên, cmnd
=> hiển thị thông tin tổng cộng thanh toán để tiến hành thanh toán
- nhập mã giảm giá nếu có => chọn hình thức thanh toán => thanh toán bằng visa => thanh toán bằng ví điện tử momo
=> kiểm tra thanh toán thành công thì gửi vé cho khách hàng qua mail, số điện thoại => thêm thông tin vào database để quản lý các vé đã mua
=> nếu thanh toán băng momo thì sẽ tạo ra 1 mã QR để khách hàng dùng ứng dụng momo quét và thanh toán
https://developers.momo.vn/#/
https://developers.momo.vn/#/docs/qr_payment


home, list, detail, booking, payment
account, history

ng g module home-page/content/home --module content
ng g c home-page/content/home

ng g module home-page/content/list --module content
ng g c home-page/content/list

ng g module home-page/content/detail --module content
ng g c home-page/content/detail

ng g module home-page/content/booking --module content
ng g c home-page/content/booking

ng g module home-page/content/payment --module content
ng g c home-page/content/payment

ng g module home-page/content/account --module content
ng g c home-page/content/account

ng g module home-page/content/history --module content
ng g c home-page/content/history

ng g module home-page/content/xxx --module content
ng g c home-page/content/xxx

ng g module home-page/content/xxx --module content
ng g c home-page/content/xxx
