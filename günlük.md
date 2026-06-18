# React Öğrenme Günlüğü

Bu dosya, `counter-app` projesinde öğrendiklerimizi ve yaptıklarımızı oturum oturum takip etmek için tutuluyor.

---

## 2026-06-18

### Yaptıklarımız
- `src/App.jsx`'i sıfırdan yazmaya başladık, klasik bir **Counter (sayaç)** uygulaması üzerinden React'in temellerini öğrendik.
- Artır (+1) / Azalt (-1) / Sıfırla butonları olan bir sayaç kurduk.
- Sayaç koduna ek olarak kendi başına bir `isOpen` (menü aç/kapa) örneği yazdın, bunu önce aynı component içine, sonra ayrı bir `Menu` component'i olarak ekledik.
- `App.css` dosyası oluşturup sayaca stil verdik: yuvarlak +/- butonları, renkli (yeşil/kırmızı), basılma animasyonu, ortalanmış "-" karakteri ince ayarı.
- Sıfırla butonunu +/- butonlarının toplam genişliğine eşit yaptık, farklı renkte ama aynı yükseklik/şekilde.
- **Halka (progress ring)** özelliği ekledik: sayaç sayısının etrafında, sayı arttıkça/azaldıkça dolan/boşalan bir CSS `conic-gradient` halkası.
- Kullanıcının **başlangıç sayısını kendisi girebileceği** bir input + "Geri Sayım Başlat" butonu ekledik; halka artık bu girilen sayıyı referans alıyor.
- Tüm `App.jsx` ve `App.css` koduna satır satır Türkçe açıklama yorumları ekledik.

### Öğrendiğimiz kavramlar
- **`useState`**: bir component'in "hafızası". Değer değiştiğinde React ekranı otomatik yeniden çizer.
- **`onChange` / `event.target.value`**: bir input'a yazılan anlık değeri yakalama yöntemi.
- **`{koşul && <jsx>}`**: koşul doğruysa bir şey gösterme, yanlışsa hiçbir şey göstermeme kısayolu.
- **Component yapısı**: bir dosyada birden fazla fonksiyon (component) tanımlanabilir, ama sadece biri `export default` olabilir; diğerleri `export function ...` ile (named export) veya hiç export edilmeden sadece o dosya içinde kullanılabilir.
- **`export default` vs `export` (named export)**: default export isimsiz çıkar (import eden istediği ismi verir), named export kendi ismiyle çıkar (import ederken süslü parantez `{ }` ve aynı isim gerekir, `as` ile yeniden adlandırılabilir).
- **Component ayırma mantığı**: küçük/tek yerde kullanılan kodları aynı dosyada tutmak sorun değildir; ayırma kararı dosya büyüklüğüne ve tekrar kullanılıp kullanılmayacağına bağlıdır — "her zaman ayır" diye bir kural yoktur.
- **`className`**: JSX'te HTML'deki `class` yerine kullanılır (çünkü `class` JS'de başka bir anlama sahip).
- **Inline style (`style={{...}}`)**: CSS değerlerini doğrudan JavaScript değişkenleriyle (örn. `${percentage}%`) dinamik olarak oluşturma yöntemi.
- **`conic-gradient` ile halka efekti**: dış daireyi yüzdeye göre renkli/şeffaf yapıp, üstüne sayfa rengiyle aynı renkte küçük bir iç daire koyarak "halka" görünümü elde etme tekniği.
- **Güvenlik kontrolleri (`maxValue > 0 ? ... : 0`)**: sıfıra bölme (`0/0` → `NaN`) gibi matematiksel hataları önlemek için yapılan kontroller; bunlar keyfi değil, gerçek bir hata senaryosuna karşı konur.
- **Yüzde hesaplama (`(count / maxValue) * 100`)**: `* 100` ve `Math.min(100, ...)` içindeki `100` değerleri "yüzde" biriminin tanımından gelir, keyfi seçilebilecek sayılar değildir (örn. `360` ile değiştirilemez, çünkü kodun başka yerinde `%` birimi bekleniyor).

### Şu anki dosya durumu
- `src/App.jsx`: Başlangıç sayısı girilebilen, halka animasyonlu, +/-/Sıfırla butonlu sayaç. Tüm satırlar Türkçe yorumlu.
- `src/App.css`: Sayaç, halka, input ve butonların stilleri. Tüm kurallar Türkçe yorumlu.

### Sıradaki olası adımlar (henüz yapılmadı)
- Component'leri ayrı dosyalara taşımayı deneme (örn. `Menu.jsx` gibi).
- Halka için SVG (`stroke-dasharray`) alternatifini deneme (daha pürüzsüz kenarlar, yuvarlatılmış uçlar).
- Yeni özellikler: adım büyüklüğü seçimi, negatife düşmeyi engelleme, vs.
