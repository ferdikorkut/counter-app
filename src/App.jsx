// React'in "state" (hafıza) özelliğini kullanmak için useState fonksiyonunu içeri alıyoruz.
// State, bir bileşenin zaman içinde değişebilen ve değiştiğinde ekranı otomatik güncelleyen verisidir.
import {useState} from 'react'

// Bu component'e ait stilleri (App.css) bu dosyaya bağlıyoruz.
// Vite bu satırı görünce CSS'i otomatik olarak sayfaya ekler.
import './App.css'

// App, bu projenin ana (tek) component'i. Fonksiyon olarak yazılır,
// içinde state + mantık (JS) tutar, sonunda JSX (görünüm) döndürür.
function App() {
  // count: sayacın şu anki değeri. Başlangıçta 0.
  // setCount: count'u değiştirmek için kullanılan tek yol (count'a direkt count = 5 diyemeyiz,
  // React bunu fark edemez; setCount kullanmak React'e "state değişti, ekranı yeniden çiz" der).
  const [count, setCount] = useState(0)

  // maxValue: halkanın "%100 dolu" kabul ettiği referans sayı.
  // Kullanıcı "Geri Sayım Başlat" demeden önce 0'dır, bu yüzden halka başta boş görünür.
  const [maxValue, setMaxValue] = useState(0) // halkanın "tam dolu" referans aldığı sayı

  // startInput: üstteki input kutusuna kullanıcının yazdığı metni tutar.
  // Bu bir "controlled input" (kontrollü input) - kutunun değeri her zaman bu state'ten okunur,
  // kullanıcı yazdıkça state güncellenir, state güncellendikçe kutu yeniden çizilir.
  const [startInput, setStartInput] = useState("") // input kutusundaki yazıyı tutar

  // percentage: halkanın ne kadarının renkli (dolu) görüneceğini belirleyen yüzde (0-100 arası).
  // maxValue 0 veya daha küçükse (henüz "Başlat" denmemişse) hesaplama yapmadan direkt 0 veriyoruz,
  // çünkü count/maxValue işlemi maxValue=0 olduğunda matematiksel olarak tanımsızdır (NaN/Infinity çıkar)
  // ve bu CSS'e gönderilirse halka bozulur. Bu yüzden bu kontrol bir "güvenlik önlemi"dir.
  const percentage = maxValue > 0
    ? Math.max(0, Math.min(100, (count / maxValue) * 100))
    // Math.min(100, ...) → sonuç asla 100'ü geçmesin (yüzde en fazla 100 olabilir)
    // Math.max(0, ...)   → sonuç asla negatif olmasın (yüzde en az 0 olabilir)
    : 0

  // handleStart: "Geri Sayım Başlat" butonuna basılınca çalışan fonksiyon.
  // Görevi: input kutusundaki yazıyı sayıya çevirip, sayacı ve halkanın referansını o sayıya ayarlamak.
  function handleStart() {
    const num = Number(startInput) // metni (string) sayıya (number) çevirir, örn. "50" -> 50
    if (!isNaN(num)) {
      // isNaN = "is Not a Number" (sayı değil mi?). Kullanıcı boş kutu ya da harf yazdıysa
      // Number(...) sonucu NaN olur, bu durumda hiçbir şey yapmıyoruz (hatalı veriyi reddediyoruz).
      setCount(num)      // sayaç bu sayıdan başlasın
      setMaxValue(num)   // halkanın "tam dolu" referansı da bu sayı olsun
    }
  }

  // return içindeki her şey JSX'tir: HTML'e benzeyen ama aslında JavaScript olan bir yazım şekli.
  // Burada ekranda görünecek tüm elemanlar (input, butonlar, halka, sayı) tanımlanır.
  return (
    <div className="counter">
        {/* Başlangıç sayısını belirleme alanı: bir input kutusu + bir buton */}
        <div className="start-input-row">
          <input
            type="number" // tarayıcıya bunun bir sayı kutusu olduğunu söyler (ok tuşları, klavye davranışı vs.)
            value={startInput} // kutunun gösterdiği değer her zaman state'ten gelir (controlled input)
            onChange={(event) => setStartInput(event.target.value)}
            // onChange: kullanıcı her tuşa bastığında çalışır.
            // event.target.value: o anda kutuda yazılı olan metin.
          />
          <button onClick={handleStart}>Geri Sayım Başlat</button>
          {/* onClick: butona tıklanınca handleStart fonksiyonunu çalıştırır */}
        </div>

        {/* Halka (ring) alanı: dış daire (renkli) + iç daire (beyaz, "delik" gibi görünmesini sağlar) */}
        <div
          className="counter-circle"
          style={{ background: `conic-gradient(#4caf50 ${percentage}%, transparent ${percentage}%)` }}
          // style={{...}}: satır içi (inline) CSS. Burada percentage değişkenini doğrudan CSS'e gömüyoruz.
          // conic-gradient: dairenin merkezinden başlayıp dönerek renk geçişi yapan bir CSS arka planı.
          // "yüzde'ye kadar yeşil, yüzde'den sonrası şeffaf" diyerek dolan/azalan bir görünüm elde ediyoruz.
        >
          <div className="counter-circle-inner">
            {/* Bu iç daire, dış dairenin tam ortasına oturur ve onu "halkaya" çevirir */}
            <p className="counter-number">{count}</p>
            {/* {count}: JSX içinde süslü parantez kullanmak, içine bir JavaScript değeri/değişkeni
                yazabileceğimiz anlamına gelir. Burada count state'inin güncel değerini ekrana yazdırıyoruz. */}
          </div>
        </div>

        {/* Sayaç butonları: artır / azalt / sıfırla */}
        <div className="counter-buttons">
          <div className="counter-main-buttons">
            <button className="btn-increase" onClick={() => setCount(count + 1)}>+</button>
            {/* () => setCount(count + 1): tıklanınca çalışacak küçük bir fonksiyon (arrow function).
                count'un güncel değerine 1 ekleyip tekrar state'e yazar. */}

            <button className="btn-decrease" onClick={() => setCount(count - 1)}>
              <span className="minus-char">-</span>
              {/* "-" karakterini ayrı bir <span> içine aldık, çünkü sadece bu karaktere
                  (butonun kendisine değil) küçük bir CSS düzeltmesi (yukarı/sola kaydırma) uyguladık. */}
            </button>
          </div>
          <button className="btn-reset" onClick={() => setCount(0)}>Sıfırla</button>
          {/* Sıfırla her zaman count'u 0 yapar, maxValue'ya (başlangıç sayısına) dokunmaz. */}
        </div>
    </div>
  )
}

// Bu dosyanın "varsayılan" (default) çıkışı App fonksiyonudur.
// main.jsx dosyasında "import App from './App.jsx'" satırı bu sayede çalışır.
export default App
