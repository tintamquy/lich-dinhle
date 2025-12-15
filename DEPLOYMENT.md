# Hướng dẫn Deployment

## GitHub Pages

Dự án đã được cấu hình để tự động deploy lên GitHub Pages.

### Bước 1: Bật GitHub Pages

1. Vào repository trên GitHub: https://github.com/tintamquy/lich-dinhle
2. Vào **Settings** > **Pages**
3. Trong phần **Source**, chọn branch **main** và folder **/ (root)**
4. Click **Save**

### Bước 2: Kiểm tra Deployment

Sau khi push code, GitHub Actions sẽ tự động deploy. Bạn có thể:
- Xem trạng thái deployment trong tab **Actions**
- Truy cập website tại: `https://tintamquy.github.io/lich-dinhle/`

### Bước 3: Cập nhật Service Worker

Nếu bạn thay đổi service worker, cần update version trong `service-worker.js`:

```javascript
const CACHE_NAME = 'lich-phat-phap-v2'; // Tăng version number
```

## Local Development

### Chạy local server

```bash
# Sử dụng Python
python -m http.server 8000

# Hoặc sử dụng Node.js
npx serve

# Hoặc sử dụng PHP
php -S localhost:8000
```

Sau đó truy cập: `http://localhost:8000`

## Lưu ý

1. **Service Worker**: Chỉ hoạt động trên HTTPS hoặc localhost
2. **File lớn**: File PDF lớn (>50MB) có thể gây cảnh báo trên GitHub
3. **CORS**: Nếu deploy lên domain khác, cần cấu hình CORS cho service worker

## Troubleshooting

### Service Worker không hoạt động
- Kiểm tra console để xem lỗi
- Đảm bảo đang chạy trên HTTPS hoặc localhost
- Clear cache và reload

### Hình ảnh không hiển thị
- Kiểm tra đường dẫn trong `data.js`
- Đảm bảo file tồn tại trong repository
- Kiểm tra console để xem lỗi load

### Three.js không hoạt động
- Kiểm tra kết nối internet (CDN)
- Kiểm tra console để xem lỗi
- Thử reload trang

