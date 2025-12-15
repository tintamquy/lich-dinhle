// Monthly Data with Buddhist Quotes, Themes, and Images
const calendarData = {
    vi: {
        months: [
            {
                name: "Tháng Giêng",
                quote: "Địa Tạng Bồ Tát dạy: 'Người nào biết quay đầu, biết sám hối, thì tội lỗi sẽ tiêu tan như sương mai gặp ánh nắng mặt trời.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "cherry-blossom",
                themeName: "Hoa Đào",
                images: {
                    cover: "Lịch 2025/T1/Ảnh/ảnh đại diện chính.jpg",
                    background: "Lịch 2025/T1/Ảnh/ảnh nhỏ dưới ảnh chính 3.jpg",
                    calendar: [
                        "Lịch 2025/T1/Lịch/1.jpg",
                        "Lịch 2025/T1/Lịch/2.jpg",
                        "Lịch 2025/T1/Lịch/3.jpg",
                        "Lịch 2025/T1/Lịch/4.jpg"
                    ]
                }
            },
            {
                name: "Tháng Hai",
                quote: "Bồ Tát Địa Tạng nói: 'Từ bi là nguồn gốc của mọi điều tốt đẹp. Hãy nuôi dưỡng tâm từ bi trong mỗi khoảnh khắc.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "plum-blossom",
                themeName: "Hoa Mai",
                images: {
                    cover: "Lịch 2025/T2/Chìm/Amphenol.jpg",
                    background: [
                        "Lịch 2025/T2/Chìm/Boyd.jpg",
                        "Lịch 2025/T2/Chìm/Ideal.jpg",
                        "Lịch 2025/T2/Chìm/Tarry.jpg"
                    ]
                }
            },
            {
                name: "Tháng Ba",
                quote: "Địa Tạng Bồ Tát dạy: 'Trí tuệ không đến từ việc tích lũy kiến thức, mà từ việc buông bỏ những chấp trước, những định kiến.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "spring-rain",
                themeName: "Mưa Xuân",
                images: {
                    cover: "Lịch 2025/T3/Bìa/Cổng hộp.pdf",
                    background: [
                        "Lịch 2025/T3/Chìm/Anda.jpg",
                        "Lịch 2025/T3/Chìm/J.Pond.jpg",
                        "Lịch 2025/T3/Chìm/King Label.jpg",
                        "Lịch 2025/T3/Chìm/Kostat.jpg",
                        "Lịch 2025/T3/Chìm/Lingyi.jpg"
                    ]
                }
            },
            {
                name: "Tháng Tư",
                quote: "Bồ Tát Địa Tạng nói: 'Nhẫn nhục là sức mạnh lớn nhất. Người biết nhẫn nhục sẽ vượt qua mọi khó khăn.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "lotus",
                themeName: "Hoa Sen",
                images: {
                    cover: "Lịch 2025/T4/Chìm/Amphenol góc phải.jpg",
                    background: [
                        "Lịch 2025/T4/Chìm/Boyd.jpg",
                        "Lịch 2025/T4/Chìm/CLB xưởng.jpg",
                        "Lịch 2025/T4/Chìm/Hunkey.jpg",
                        "Lịch 2025/T4/Chìm/Lingyi.jpg"
                    ]
                }
            },
            {
                name: "Tháng Năm",
                quote: "Địa Tạng Bồ Tát dạy: 'Phước đức không phải là của cải vật chất, mà là tâm hồn thanh tịnh, an lạc.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "summer-sun",
                themeName: "Nắng Hè",
                images: {
                    cover: "Lịch 2025/T5/z5973993890272_832129a0a2e06b6fdb7d20315b8116b4.jpg"
                }
            },
            {
                name: "Tháng Sáu",
                quote: "Bồ Tát Địa Tạng nói: 'Chánh niệm là chìa khóa của hạnh phúc. Sống trong hiện tại, không nuối tiếc quá khứ, không lo lắng tương lai.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "lotus",
                themeName: "Hoa Sen",
                images: {
                    cover: "Lịch 2025/T6/Bìa/nhathep_dinhle.jpg",
                    background: "Lịch 2025/T6/Chìm/nhathep_dinhle.jpg"
                }
            },
            {
                name: "Tháng Bảy",
                quote: "Địa Tạng Bồ Tát dạy: 'Từ bi và trí tuệ là đôi cánh giúp chúng ta bay cao trong cuộc sống.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "summer-rain",
                themeName: "Mưa Hè",
                images: {
                    background: [
                        "Lịch 2025/T7/Chìm/Elentec.jpg",
                        "Lịch 2025/T7/Chìm/Kashiyama.jpg",
                        "Lịch 2025/T7/Chìm/MTG.jpg",
                        "Lịch 2025/T7/Chìm/PVN.jpg"
                    ]
                }
            },
            {
                name: "Tháng Tám",
                quote: "Bồ Tát Địa Tạng nói: 'Buông bỏ là giải phóng. Càng buông bỏ, càng tự do.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "autumn-leaves",
                themeName: "Lá Thu",
                images: {
                    cover: "Lịch 2025/T8/Chìm/ảnh bìa.jpg",
                    background: "Lịch 2025/T8/Chìm/Kashiyama.jpg"
                }
            },
            {
                name: "Tháng Chín",
                quote: "Địa Tạng Bồ Tát dạy: 'Tâm thanh tịnh sẽ thấy được bản chất chân thật của vạn vật.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "autumn-moon",
                themeName: "Trăng Thu",
                images: {
                    cover: "Lịch 2025/T9/Bìa/z5835951766283_c18d5e26eeacea4d80c9a2cc2a6dfbce.jpg",
                    background: "Lịch 2025/T9/Chìm/Gonyo.jpg"
                }
            },
            {
                name: "Tháng Mười",
                quote: "Bồ Tát Địa Tạng nói: 'Hãy sống với tâm biết ơn. Biết ơn sẽ mang lại niềm vui và hạnh phúc.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "chrysanthemum",
                themeName: "Hoa Cúc",
                images: {
                    background: [
                        "Lịch 2025/T10/Chìm/ảnh chìm 1.jpg",
                        "Lịch 2025/T10/Chìm/ảnh chìm 2.jpg",
                        "Lịch 2025/T10/Chìm/GT.jpg"
                    ]
                }
            },
            {
                name: "Tháng Mười Một",
                quote: "Địa Tạng Bồ Tát dạy: 'Tình thương yêu chân thật không phân biệt, không điều kiện, đó là tình thương của Bồ Tát.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "winter-frost",
                themeName: "Sương Giá",
                images: {
                    cover: "Lịch 2025/T11/Bìa/Dong SHin HN vina.jpg",
                    background: "Lịch 2025/T11/Chìm/ảnh chìm 1.JPG"
                }
            },
            {
                name: "Tháng Mười Hai",
                quote: "Bồ Tát Địa Tạng nói: 'Mỗi ngày là một cơ hội mới để tu tập, để trở nên tốt đẹp hơn.'",
                source: "Kinh Địa Tạng - Phẩm thứ 9",
                theme: "snow",
                themeName: "Tuyết Rơi",
                images: {
                    cover: "Lịch 2025/T12/Bìa/Cổng Hộp cờ Đồng Văn 4.jpg"
                }
            }
        ]
    },
    en: {
        months: [
            {
                name: "January",
                quote: "Bodhisattva Ksitigarbha teaches: 'Those who know how to turn back, who know how to repent, their sins will vanish like morning dew meeting the sun.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "cherry-blossom",
                themeName: "Cherry Blossom",
                images: {
                    cover: "Lịch 2025/T1/Ảnh/ảnh đại diện chính.jpg",
                    background: "Lịch 2025/T1/Ảnh/ảnh nhỏ dưới ảnh chính 3.jpg",
                    calendar: [
                        "Lịch 2025/T1/Lịch/1.jpg",
                        "Lịch 2025/T1/Lịch/2.jpg",
                        "Lịch 2025/T1/Lịch/3.jpg",
                        "Lịch 2025/T1/Lịch/4.jpg"
                    ]
                }
            },
            {
                name: "February",
                quote: "Bodhisattva Ksitigarbha says: 'Compassion is the root of all goodness. Nurture compassion in every moment.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "plum-blossom",
                themeName: "Plum Blossom",
                images: {
                    cover: "Lịch 2025/T2/Chìm/Amphenol.jpg",
                    background: [
                        "Lịch 2025/T2/Chìm/Boyd.jpg",
                        "Lịch 2025/T2/Chìm/Ideal.jpg",
                        "Lịch 2025/T2/Chìm/Tarry.jpg"
                    ]
                }
            },
            {
                name: "March",
                quote: "Bodhisattva Ksitigarbha teaches: 'Wisdom does not come from accumulating knowledge, but from letting go of attachments and prejudices.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "spring-rain",
                themeName: "Spring Rain",
                images: {
                    cover: "Lịch 2025/T3/Bìa/Cổng hộp.pdf",
                    background: [
                        "Lịch 2025/T3/Chìm/Anda.jpg",
                        "Lịch 2025/T3/Chìm/J.Pond.jpg",
                        "Lịch 2025/T3/Chìm/King Label.jpg",
                        "Lịch 2025/T3/Chìm/Kostat.jpg",
                        "Lịch 2025/T3/Chìm/Lingyi.jpg"
                    ]
                }
            },
            {
                name: "April",
                quote: "Bodhisattva Ksitigarbha says: 'Patience is the greatest strength. Those who know patience will overcome all difficulties.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "lotus",
                themeName: "Lotus",
                images: {
                    cover: "Lịch 2025/T4/Chìm/Amphenol góc phải.jpg",
                    background: [
                        "Lịch 2025/T4/Chìm/Boyd.jpg",
                        "Lịch 2025/T4/Chìm/CLB xưởng.jpg",
                        "Lịch 2025/T4/Chìm/Hunkey.jpg",
                        "Lịch 2025/T4/Chìm/Lingyi.jpg"
                    ]
                }
            },
            {
                name: "May",
                quote: "Bodhisattva Ksitigarbha teaches: 'Merit is not material wealth, but a pure and peaceful mind.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "summer-sun",
                themeName: "Summer Sun",
                images: {
                    cover: "Lịch 2025/T5/z5973993890272_832129a0a2e06b6fdb7d20315b8116b4.jpg"
                }
            },
            {
                name: "June",
                quote: "Bodhisattva Ksitigarbha says: 'Mindfulness is the key to happiness. Live in the present, without regret for the past or worry about the future.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "lotus",
                themeName: "Lotus",
                images: {
                    cover: "Lịch 2025/T6/Bìa/nhathep_dinhle.jpg",
                    background: "Lịch 2025/T6/Chìm/nhathep_dinhle.jpg"
                }
            },
            {
                name: "July",
                quote: "Bodhisattva Ksitigarbha teaches: 'Compassion and wisdom are the wings that help us soar high in life.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "summer-rain",
                themeName: "Summer Rain",
                images: {
                    background: [
                        "Lịch 2025/T7/Chìm/Elentec.jpg",
                        "Lịch 2025/T7/Chìm/Kashiyama.jpg",
                        "Lịch 2025/T7/Chìm/MTG.jpg",
                        "Lịch 2025/T7/Chìm/PVN.jpg"
                    ]
                }
            },
            {
                name: "August",
                quote: "Bodhisattva Ksitigarbha says: 'Letting go is liberation. The more you let go, the freer you become.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "autumn-leaves",
                themeName: "Autumn Leaves",
                images: {
                    cover: "Lịch 2025/T8/Chìm/ảnh bìa.jpg",
                    background: "Lịch 2025/T8/Chìm/Kashiyama.jpg"
                }
            },
            {
                name: "September",
                quote: "Bodhisattva Ksitigarbha teaches: 'A pure mind will see the true nature of all things.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "autumn-moon",
                themeName: "Autumn Moon",
                images: {
                    cover: "Lịch 2025/T9/Bìa/z5835951766283_c18d5e26eeacea4d80c9a2cc2a6dfbce.jpg",
                    background: "Lịch 2025/T9/Chìm/Gonyo.jpg"
                }
            },
            {
                name: "October",
                quote: "Bodhisattva Ksitigarbha says: 'Live with a grateful heart. Gratitude brings joy and happiness.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "chrysanthemum",
                themeName: "Chrysanthemum",
                images: {
                    background: [
                        "Lịch 2025/T10/Chìm/ảnh chìm 1.jpg",
                        "Lịch 2025/T10/Chìm/ảnh chìm 2.jpg",
                        "Lịch 2025/T10/Chìm/GT.jpg"
                    ]
                }
            },
            {
                name: "November",
                quote: "Bodhisattva Ksitigarbha teaches: 'True love is undiscriminating and unconditional, that is the love of a Bodhisattva.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "winter-frost",
                themeName: "Winter Frost",
                images: {
                    cover: "Lịch 2025/T11/Bìa/Dong SHin HN vina.jpg",
                    background: "Lịch 2025/T11/Chìm/ảnh chìm 1.JPG"
                }
            },
            {
                name: "December",
                quote: "Bodhisattva Ksitigarbha says: 'Each day is a new opportunity to practice, to become better.'",
                source: "Ksitigarbha Sutra - Chapter 9",
                theme: "snow",
                themeName: "Snow",
                images: {
                    cover: "Lịch 2025/T12/Bìa/Cổng Hộp cờ Đồng Văn 4.jpg"
                }
            }
        ]
    },
    zh: {
        months: [
            {
                name: "一月",
                quote: "地藏菩萨教导：'知回头、知忏悔的人，罪业会如晨露遇阳光般消散。'",
                source: "地藏经 - 第九品",
                theme: "cherry-blossom",
                themeName: "樱花",
                images: {
                    cover: "Lịch 2025/T1/Ảnh/ảnh đại diện chính.jpg",
                    background: "Lịch 2025/T1/Ảnh/ảnh nhỏ dưới ảnh chính 3.jpg",
                    calendar: [
                        "Lịch 2025/T1/Lịch/1.jpg",
                        "Lịch 2025/T1/Lịch/2.jpg",
                        "Lịch 2025/T1/Lịch/3.jpg",
                        "Lịch 2025/T1/Lịch/4.jpg"
                    ]
                }
            },
            {
                name: "二月",
                quote: "地藏菩萨说：'慈悲是一切善的根本。在每一刻培养慈悲心。'",
                source: "地藏经 - 第九品",
                theme: "plum-blossom",
                themeName: "梅花",
                images: {
                    cover: "Lịch 2025/T2/Chìm/Amphenol.jpg",
                    background: [
                        "Lịch 2025/T2/Chìm/Boyd.jpg",
                        "Lịch 2025/T2/Chìm/Ideal.jpg",
                        "Lịch 2025/T2/Chìm/Tarry.jpg"
                    ]
                }
            },
            {
                name: "三月",
                quote: "地藏菩萨教导：'智慧不是来自积累知识，而是来自放下执着和偏见。'",
                source: "地藏经 - 第九品",
                theme: "spring-rain",
                themeName: "春雨",
                images: {
                    cover: "Lịch 2025/T3/Bìa/Cổng hộp.pdf",
                    background: [
                        "Lịch 2025/T3/Chìm/Anda.jpg",
                        "Lịch 2025/T3/Chìm/J.Pond.jpg",
                        "Lịch 2025/T3/Chìm/King Label.jpg",
                        "Lịch 2025/T3/Chìm/Kostat.jpg",
                        "Lịch 2025/T3/Chìm/Lingyi.jpg"
                    ]
                }
            },
            {
                name: "四月",
                quote: "地藏菩萨说：'忍辱是最大的力量。懂得忍辱的人会克服一切困难。'",
                source: "地藏经 - 第九品",
                theme: "lotus",
                themeName: "莲花",
                images: {
                    cover: "Lịch 2025/T4/Chìm/Amphenol góc phải.jpg",
                    background: [
                        "Lịch 2025/T4/Chìm/Boyd.jpg",
                        "Lịch 2025/T4/Chìm/CLB xưởng.jpg",
                        "Lịch 2025/T4/Chìm/Hunkey.jpg",
                        "Lịch 2025/T4/Chìm/Lingyi.jpg"
                    ]
                }
            },
            {
                name: "五月",
                quote: "地藏菩萨教导：'福德不是物质财富，而是清净、安乐的内心。'",
                source: "地藏经 - 第九品",
                theme: "summer-sun",
                themeName: "夏日",
                images: {
                    cover: "Lịch 2025/T5/z5973993890272_832129a0a2e06b6fdb7d20315b8116b4.jpg"
                }
            },
            {
                name: "六月",
                quote: "地藏菩萨说：'正念是幸福的关键。活在当下，不后悔过去，不担心未来。'",
                source: "地藏经 - 第九品",
                theme: "lotus",
                themeName: "莲花",
                images: {
                    cover: "Lịch 2025/T6/Bìa/nhathep_dinhle.jpg",
                    background: "Lịch 2025/T6/Chìm/nhathep_dinhle.jpg"
                }
            },
            {
                name: "七月",
                quote: "地藏菩萨教导：'慈悲和智慧是帮助我们在生活中高飞的翅膀。'",
                source: "地藏经 - 第九品",
                theme: "summer-rain",
                themeName: "夏雨",
                images: {
                    background: [
                        "Lịch 2025/T7/Chìm/Elentec.jpg",
                        "Lịch 2025/T7/Chìm/Kashiyama.jpg",
                        "Lịch 2025/T7/Chìm/MTG.jpg",
                        "Lịch 2025/T7/Chìm/PVN.jpg"
                    ]
                }
            },
            {
                name: "八月",
                quote: "地藏菩萨说：'放下就是解脱。越放下，越自由。'",
                source: "地藏经 - 第九品",
                theme: "autumn-leaves",
                themeName: "秋叶",
                images: {
                    cover: "Lịch 2025/T8/Chìm/ảnh bìa.jpg",
                    background: "Lịch 2025/T8/Chìm/Kashiyama.jpg"
                }
            },
            {
                name: "九月",
                quote: "地藏菩萨教导：'清净的心会看到万物的真实本性。'",
                source: "地藏经 - 第九品",
                theme: "autumn-moon",
                themeName: "秋月",
                images: {
                    cover: "Lịch 2025/T9/Bìa/z5835951766283_c18d5e26eeacea4d80c9a2cc2a6dfbce.jpg",
                    background: "Lịch 2025/T9/Chìm/Gonyo.jpg"
                }
            },
            {
                name: "十月",
                quote: "地藏菩萨说：'以感恩的心生活。感恩带来喜悦和幸福。'",
                source: "地藏经 - 第九品",
                theme: "chrysanthemum",
                themeName: "菊花",
                images: {
                    background: [
                        "Lịch 2025/T10/Chìm/ảnh chìm 1.jpg",
                        "Lịch 2025/T10/Chìm/ảnh chìm 2.jpg",
                        "Lịch 2025/T10/Chìm/GT.jpg"
                    ]
                }
            },
            {
                name: "十一月",
                quote: "地藏菩萨教导：'真正的爱是不分别、无条件的，那就是菩萨的爱。'",
                source: "地藏经 - 第九品",
                theme: "winter-frost",
                themeName: "冬霜",
                images: {
                    cover: "Lịch 2025/T11/Bìa/Dong SHin HN vina.jpg",
                    background: "Lịch 2025/T11/Chìm/ảnh chìm 1.JPG"
                }
            },
            {
                name: "十二月",
                quote: "地藏菩萨说：'每一天都是修行的新机会，变得更好。'",
                source: "地藏经 - 第九品",
                theme: "snow",
                themeName: "雪",
                images: {
                    cover: "Lịch 2025/T12/Bìa/Cổng Hộp cờ Đồng Văn 4.jpg"
                }
            }
        ]
    }
};

// Get current month (0-11)
function getCurrentMonth() {
    return new Date().getMonth();
}

// Get current year
function getCurrentYear() {
    return new Date().getFullYear();
}

