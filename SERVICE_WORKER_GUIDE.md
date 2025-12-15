# Hướng dẫn Service Worker và Cloudflare Pages

## Service Worker là gì?

Service Worker là một script chạy ngầm trong trình duyệt, tách biệt với trang web chính. Nó có các tác dụng chính:

### 1. **Caching (Bộ nhớ đệm)**
- Lưu trữ các file tĩnh (HTML, CSS, JS, hình ảnh) vào cache của trình duyệt
- Giúp website tải nhanh hơn ở lần truy cập sau
- Giảm băng thông và chi phí server

### 2. **Offline Support (Hỗ trợ ngoại tuyến)**
- Cho phép website hoạt động ngay cả khi mất kết nối internet
- Hiển thị nội dung đã được cache trước đó
- Tăng trải nghiệm người dùng

### 3. **Background Sync (Đồng bộ nền)**
- Thực hiện các tác vụ đồng bộ khi có kết nối lại
- Gửi dữ liệu khi mạng ổn định

### 4. **Push Notifications (Thông báo đẩy)**
- Gửi thông báo ngay cả khi người dùng không mở website
- Tương tự như ứng dụng mobile

## Triển khai trên Cloudflare Pages

### Bước 1: Tạo file Service Worker

File `sw.js` đã được tạo sẵn trong dự án với cấu trúc đơn giản, phù hợp Cloudflare Pages.

### Bước 2: Đăng ký Service Worker

Service Worker đã được đăng ký trong `index.html`:

```javascript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
```

### Bước 3: Deploy lên Cloudflare Pages

1. **Kết nối repository với Cloudflare Pages:**
   - Vào Cloudflare Dashboard > Pages
   - Chọn "Create a project"
   - Kết nối với GitHub repository của bạn

2. **Cấu hình Build:**
   - Build command: (để trống vì đây là static site)
   - Build output directory: `/` (root)

3. **Đảm bảo file sw.js được deploy:**
   - File `sw.js` phải ở thư mục root
   - Cloudflare Pages sẽ tự động serve file này

### Bước 4: Kiểm tra Service Worker

Sau khi deploy:

1. Mở website trên Cloudflare Pages
2. Mở DevTools (F12) > Tab "Application" > "Service Workers"
3. Kiểm tra xem Service Worker đã được đăng ký chưa
4. Kiểm tra tab "Cache" để xem các file đã được cache

## Lưu ý quan trọng

### 1. **HTTPS bắt buộc**
- Service Worker chỉ hoạt động trên HTTPS
- Cloudflare Pages tự động cung cấp HTTPS
- Không hoạt động trên HTTP (trừ localhost)

### 2. **Path chính xác**
- Service Worker phải ở root: `/sw.js`
- Không đặt trong thư mục con
- Đường dẫn đăng ký phải chính xác

### 3. **Cache Version**
- Khi cập nhật Service Worker, cần thay đổi `CACHE_NAME`
- Ví dụ: `'lich-phat-phap-v1'` → `'lich-phat-phap-v2'`
- Điều này đảm bảo cache cũ được xóa

### 4. **File Size**
- Service Worker nên nhỏ gọn (< 50KB)
- Tránh cache quá nhiều file lớn
- Ưu tiên cache các file quan trọng

### 5. **Update Strategy**
- Service Worker tự động update khi có phiên bản mới
- Sử dụng `skipWaiting()` để update ngay lập tức
- Sử dụng `clients.claim()` để control tất cả các tab

## Troubleshooting

### Service Worker không đăng ký
- Kiểm tra console để xem lỗi
- Đảm bảo đang dùng HTTPS
- Kiểm tra đường dẫn file sw.js

### Cache không hoạt động
- Kiểm tra DevTools > Application > Cache Storage
- Xóa cache cũ và reload
- Kiểm tra CACHE_NAME có đúng không

### Website không update
- Xóa cache trong DevTools
- Hard reload (Ctrl+Shift+R)
- Update CACHE_NAME trong sw.js

## Tối ưu hóa

### 1. **Cache Strategy**
- Static assets: Cache First
- API calls: Network First
- Images: Cache với expiration

### 2. **Lazy Loading**
- Chỉ cache các file cần thiết
- Load các file khác khi cần

### 3. **Compression**
- Cloudflare tự động nén file
- Service Worker cache file đã nén

## Kết luận

Service Worker trên Cloudflare Pages hoạt động tốt và đơn giản. Chỉ cần:
1. Tạo file `sw.js` ở root
2. Đăng ký trong HTML
3. Deploy lên Cloudflare Pages
4. Service Worker sẽ tự động hoạt động!

File `sw.js` trong dự án này đã được tối ưu cho Cloudflare Pages và sẽ hoạt động ngay sau khi deploy.

