# Lịch 2025 Phật Pháp - 3D Calendar

Ứng dụng lịch online 3D với chủ đề Phật Pháp, sử dụng công nghệ HTML5, CSS3, và Three.js để tạo hiệu ứng lật trang 3D ấn tượng.

## Tính năng

- ✨ **Hiệu ứng 3D lật trang** sử dụng Three.js với animation mượt mà
- 🌸 **Hiệu ứng theo mùa** (hoa đào, hoa mai, hoa sen, tuyết rơi...)
- 🌍 **Đa ngôn ngữ** (Tiếng Việt, English, 中文) với chuyển đổi mượt mà
- 📅 **Tự động cập nhật** theo tháng hiện tại
- 📱 **Responsive design** - tương thích mọi thiết bị
- 🖼️ **Tích hợp hình ảnh công ty** từ các thư mục với lazy loading
- 📖 **Câu Phật học** từ Kinh Địa Tạng cho mỗi tháng
- 🔗 **Chia sẻ mạng xã hội** (Facebook, Twitter, Native Share API)
- 📲 **PWA Support** - Có thể cài đặt như ứng dụng
- ⚡ **Offline Support** - Service Worker cho trải nghiệm offline
- ♿ **Accessibility** - Hỗ trợ screen reader và keyboard navigation
- 🎨 **Modern UI/UX** - Giao diện đẹp với animations mượt mà

## Cấu trúc thư mục

```
Lich12thang/
├── index.html          # File HTML chính
├── styles.css          # File CSS với animations 3D
├── app.js             # JavaScript với Three.js
├── data.js            # Dữ liệu tháng, câu Phật học
├── LOGO-1-1.png       # Logo công ty
├── og-image.png       # Ảnh preview cho social media
└── Lịch 2025/         # Thư mục chứa hình ảnh theo tháng
    ├── T1/            # Tháng 1
    ├── T2/            # Tháng 2
    └── ...
```

## Cách sử dụng

1. Mở file `index.html` trong trình duyệt web
2. Sử dụng các nút điều hướng để chuyển giữa các tháng
3. Click vào lịch 3D để xem chi tiết tháng
4. Chuyển đổi ngôn ngữ bằng các nút VI/EN/中文 ở góc trên bên phải
5. Chia sẻ lịch lên mạng xã hội bằng các nút chia sẻ

## Công nghệ sử dụng

- **HTML5** - Cấu trúc semantic với accessibility
- **CSS3** - Animations, 3D transforms, gradients, responsive design
- **Three.js** - Rendering 3D và hiệu ứng lật trang
- **Vanilla JavaScript** - Logic và tương tác
- **Service Worker** - PWA và offline support
- **Web APIs** - Intersection Observer cho lazy loading, Web Share API

## Tùy chỉnh

### Thay đổi câu Phật học

Chỉnh sửa file `data.js`, tìm đến tháng cần thay đổi và cập nhật trường `quote` và `source`.

### Thêm hình ảnh

Thêm hình ảnh vào các thư mục tương ứng (T1, T2, ...) và cập nhật đường dẫn trong `data.js`.

### Thay đổi chủ đề mùa

Trong `data.js`, thay đổi trường `theme` cho mỗi tháng:
- `cherry-blossom` - Hoa đào
- `plum-blossom` - Hoa mai
- `lotus` - Hoa sen
- `snow` - Tuyết rơi
- `spring-rain` - Mưa xuân
- `summer-sun` - Nắng hè
- `autumn-leaves` - Lá thu
- `winter-frost` - Sương giá

## Trình duyệt hỗ trợ

- Chrome (khuyến nghị)
- Firefox
- Safari
- Edge

## Lưu ý

- Đảm bảo tất cả hình ảnh trong thư mục `Lịch 2025` có sẵn
- File PDF sẽ không được hiển thị (chỉ hỗ trợ JPG/PNG)
- Logo và og-image nên có kích thước phù hợp để hiển thị tốt

## Deployment

### GitHub Pages

Dự án đã được cấu hình để tự động deploy lên GitHub Pages khi push code lên branch `main` hoặc `master`.

1. Đảm bảo repository đã bật GitHub Pages trong Settings
2. Push code lên branch `main` hoặc `master`
3. GitHub Actions sẽ tự động deploy

### Manual Deployment

1. Clone repository
2. Mở file `index.html` trong trình duyệt hoặc
3. Sử dụng local server (ví dụ: `python -m http.server` hoặc `npx serve`)

## Performance

- Lazy loading cho hình ảnh
- Service Worker caching
- Optimized Three.js rendering
- CSS animations với GPU acceleration

## Browser Support

- Chrome/Edge (khuyến nghị) - Full support
- Firefox - Full support
- Safari - Full support (iOS 11.3+)
- Opera - Full support

## License

Dự án này được tạo cho mục đích sử dụng nội bộ.

## Contributing

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## Author

Created with ❤️ for Buddhist calendar 2025

