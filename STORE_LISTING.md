# Chrome Web Store listing — v1.2.4

Copy-paste this into the Developer Dashboard for the v1.2.4 review submission.
Upload artifact: `youtube-shorts-remover-v1.2.4.zip`

The name and short description of each language come from `_locales/<lang>/messages.json` in the package. The dashboard's per-language **Description** field takes the text under "Localized full descriptions" below.

---

## Name
YouTube Shorts & Playables Remover

## Short description (max 132 chars)
Removes Shorts and Playables from YouTube's homepage, search results, and sidebar. Free, lightweight, with a one-click on/off toggle.

## Category
Productivity

## Full description
A minimalist, free extension that hides YouTube Shorts and Playables across the site — no account, no tracking, no bloat.

Features
• Removes Shorts from the homepage recommendations
• Removes Playables from the homepage, search results and sidebar (works in any language)
• Hides the Shorts tab and Shorts shelves in search results
• Removes the "Shorts remixing this video" shelf on watch pages
• One-click toggle switch — turn it off to bring Shorts back instantly, no page reload
• Your on/off preference syncs across your signed-in Chrome browsers
• Works automatically on dynamically loaded content

Privacy
This extension does not collect, transmit, or sell any personal data. It runs entirely in your browser and only modifies the YouTube page you're viewing. The single "storage" permission is used solely to remember your toggle setting.

Open source: https://github.com/in-c0/youtube-shorts-remover

## Permission justification (for the review form)
- **storage** — Persists the user's on/off toggle preference (a single boolean) via chrome.storage.sync so the choice is remembered and synced across the user's devices. No other data is stored.

## Single purpose (for the review form)
The extension has one purpose: to hide YouTube Shorts and Playables content from the YouTube interface, with a toggle to enable/disable that behavior.

## What changed in this version (release notes)
v1.2.4
- The extension name and description are now translated into Korean, Japanese, Spanish, Portuguese (Brazil), German, French, Italian, Indonesian, Turkish, Vietnamese and Hindi, so the store listing appears in those languages.

v1.2.3
- Fixed Shorts shelves showing again in search results after a YouTube layout change.
- Shorts shelves are now detected by link rather than title text, so it works in every YouTube language.

v1.2.2
- Fixed Playables still appearing in search results (YouTube uses a different layout there).
- Playables are now detected by link rather than English title text, so it works in every YouTube language.

v1.2.1 (follow-up patch — submit after v1.2 is approved)
- Fixed Shorts not being hidden in tabs opened in the background (timer was paused while the tab was hidden).

v1.2
- Added a real on/off toggle switch in the toolbar popup (state syncs across devices).
- Fixed the watch-page "Shorts remixing this video" shelf not being removed after a YouTube DOM change.
- Debounced the content observer for better performance.
- Hiding is now reversible (CSS-based) instead of removing DOM nodes.

## Data-use disclosures (Privacy practices tab)
- Does this item collect or use personal/sensitive user data? **No.**
- Certify: does not sell data to third parties; does not use/transfer data for purposes unrelated to the item's single purpose; does not use/transfer data to determine creditworthiness or for lending. **All three: certified true.**

## Localized full descriptions

### 한국어 (`ko`)

YouTube의 Shorts(쇼츠)와 Playables(플레이어블)를 숨겨 주는 가볍고 무료인 확장 프로그램입니다. 계정, 추적, 군더더기가 없습니다.

기능
• 홈 추천에서 Shorts 제거
• 홈, 검색 결과, 사이드바에서 Playables 제거 (모든 언어에서 동작)
• 검색 결과의 Shorts 탭과 Shorts 선반 숨기기
• 한 번의 클릭으로 켜고 끄기, 새로고침 필요 없음
• 켜기/끄기 설정이 로그인한 Chrome 브라우저 간에 동기화

개인정보
개인 데이터를 수집하거나 전송하지 않습니다. 브라우저 안에서만 동작하며, storage 권한은 켜기/끄기 설정을 기억하는 데에만 씁니다.

Open source: https://github.com/in-c0/youtube-shorts-remover

### 日本語 (`ja`)

YouTube のショートとプレイアブルを非表示にする、軽量で無料の拡張機能です。アカウント不要、トラッキングなし。

機能
• ホームのおすすめからショートを削除
• ホーム、検索結果、サイドバーからプレイアブルを削除（どの言語でも動作）
• 検索結果のショートタブとショートの棚を非表示
• ワンクリックでオン／オフ、再読み込み不要
• オン／オフ設定はログイン中の Chrome 間で同期

プライバシー
個人データを収集・送信しません。ブラウザ内だけで動作し、storage 権限はオン／オフ設定の保存にのみ使います。

Open source: https://github.com/in-c0/youtube-shorts-remover

### Español (`es`)

Una extensión ligera y gratuita que oculta los Shorts y los Playables de YouTube. Sin cuenta, sin seguimiento.

Funciones
• Quita los Shorts de las recomendaciones de la página de inicio
• Quita los Playables de la página de inicio, la búsqueda y la barra lateral (en cualquier idioma)
• Oculta la pestaña y las filas de Shorts en los resultados de búsqueda
• Actívala o desactívala con un clic, sin recargar
• Tu preferencia se sincroniza entre tus navegadores Chrome

Privacidad
No recopila ni envía datos personales. Funciona solo en tu navegador; el permiso de almacenamiento solo guarda el interruptor.

Open source: https://github.com/in-c0/youtube-shorts-remover

### Português (Brasil) (`pt_BR`)

Uma extensão leve e gratuita que oculta os Shorts e os Playables do YouTube. Sem conta, sem rastreamento.

Recursos
• Remove os Shorts das recomendações da página inicial
• Remove os Playables da página inicial, da pesquisa e da barra lateral (em qualquer idioma)
• Oculta a aba e as prateleiras de Shorts nos resultados de pesquisa
• Liga e desliga com um clique, sem recarregar
• A preferência é sincronizada entre seus navegadores Chrome

Privacidade
Não coleta nem envia dados pessoais. Funciona só no seu navegador; a permissão de armazenamento só guarda o botão liga/desliga.

Open source: https://github.com/in-c0/youtube-shorts-remover

### Deutsch (`de`)

Eine schlanke, kostenlose Erweiterung, die YouTube Shorts und Playables ausblendet. Kein Konto, kein Tracking.

Funktionen
• Entfernt Shorts aus den Empfehlungen auf der Startseite
• Entfernt Playables von Startseite, Suche und Seitenleiste (in jeder Sprache)
• Blendet den Shorts-Tab und Shorts-Regale in den Suchergebnissen aus
• Mit einem Klick ein- und ausschalten, ohne Neuladen
• Die Einstellung wird zwischen deinen Chrome-Browsern synchronisiert

Datenschutz
Es werden keine personenbezogenen Daten erfasst oder übertragen. Die Berechtigung „storage“ speichert nur den Ein/Aus-Schalter.

Open source: https://github.com/in-c0/youtube-shorts-remover

### Français (`fr`)

Une extension légère et gratuite qui masque les Shorts et les Playables de YouTube. Sans compte, sans suivi.

Fonctionnalités
• Retire les Shorts des recommandations de la page d'accueil
• Retire les Playables de l'accueil, de la recherche et de la barre latérale (dans toutes les langues)
• Masque l'onglet et les étagères Shorts dans les résultats de recherche
• Activation et désactivation en un clic, sans recharger
• Votre choix est synchronisé entre vos navigateurs Chrome

Confidentialité
Aucune donnée personnelle n'est collectée ni transmise. L'autorisation de stockage sert uniquement à mémoriser l'interrupteur.

Open source: https://github.com/in-c0/youtube-shorts-remover

### Italiano (`it`)

Un'estensione leggera e gratuita che nasconde Shorts e Playables di YouTube. Nessun account, nessun tracciamento.

Funzioni
• Rimuove gli Shorts dai consigli della home page
• Rimuove i Playables da home, ricerca e barra laterale (in qualsiasi lingua)
• Nasconde la scheda e i ripiani Shorts nei risultati di ricerca
• Attivala o disattivala con un clic, senza ricaricare
• La preferenza si sincronizza tra i tuoi browser Chrome

Privacy
Non raccoglie né invia dati personali. Il permesso di archiviazione serve solo a ricordare l'interruttore.

Open source: https://github.com/in-c0/youtube-shorts-remover

### Bahasa Indonesia (`id`)

Ekstensi ringan dan gratis yang menyembunyikan Shorts dan Playables di YouTube. Tanpa akun, tanpa pelacakan.

Fitur
• Menghapus Shorts dari rekomendasi beranda
• Menghapus Playables dari beranda, hasil penelusuran, dan bilah samping (dalam bahasa apa pun)
• Menyembunyikan tab dan rak Shorts di hasil penelusuran
• Nyalakan atau matikan dengan satu klik, tanpa memuat ulang
• Pilihan Anda disinkronkan di semua browser Chrome Anda

Privasi
Tidak mengumpulkan atau mengirim data pribadi. Izin penyimpanan hanya dipakai untuk mengingat tombol nyala/mati.

Open source: https://github.com/in-c0/youtube-shorts-remover

### Türkçe (`tr`)

YouTube Shorts ve Playables içeriklerini gizleyen hafif ve ücretsiz bir uzantı. Hesap yok, takip yok.

Özellikler
• Ana sayfa önerilerinden Shorts'u kaldırır
• Ana sayfa, arama ve kenar çubuğundan Playables'ı kaldırır (her dilde)
• Arama sonuçlarındaki Shorts sekmesini ve raflarını gizler
• Tek tıkla açıp kapatın, sayfayı yenilemeye gerek yok
• Tercihiniz Chrome tarayıcılarınız arasında senkronize edilir

Gizlilik
Kişisel veri toplamaz veya göndermez. Depolama izni yalnızca açma/kapama ayarını hatırlamak için kullanılır.

Open source: https://github.com/in-c0/youtube-shorts-remover

### Tiếng Việt (`vi`)

Tiện ích nhẹ và miễn phí giúp ẩn Shorts và Playables trên YouTube. Không cần tài khoản, không theo dõi.

Tính năng
• Xóa Shorts khỏi đề xuất trên trang chủ
• Xóa Playables khỏi trang chủ, kết quả tìm kiếm và thanh bên (với mọi ngôn ngữ)
• Ẩn thẻ Shorts và các kệ Shorts trong kết quả tìm kiếm
• Bật/tắt bằng một cú nhấp, không cần tải lại trang
• Lựa chọn của bạn được đồng bộ giữa các trình duyệt Chrome

Quyền riêng tư
Không thu thập hay gửi dữ liệu cá nhân. Quyền lưu trữ chỉ dùng để ghi nhớ nút bật/tắt.

Open source: https://github.com/in-c0/youtube-shorts-remover

### हिन्दी (`hi`)

एक हल्का और मुफ़्त एक्सटेंशन जो YouTube के Shorts और Playables छिपाता है। न अकाउंट, न ट्रैकिंग।

सुविधाएँ
• होमपेज की सिफ़ारिशों से Shorts हटाता है
• होमपेज, खोज और साइडबार से Playables हटाता है (हर भाषा में)
• खोज परिणामों में Shorts टैब और Shorts शेल्फ़ छिपाता है
• एक क्लिक में चालू/बंद, पेज रीलोड की ज़रूरत नहीं
• आपकी पसंद आपके Chrome ब्राउज़रों में सिंक होती है

गोपनीयता
कोई निजी डेटा इकट्ठा या भेजा नहीं जाता। storage अनुमति केवल चालू/बंद सेटिंग याद रखने के लिए है।

Open source: https://github.com/in-c0/youtube-shorts-remover
