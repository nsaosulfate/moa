# 모아 · moa — 내 미니앱 허브 🗂️

> 내가 만든 GitHub Pages 미니앱들을 **카드 그리드 하나로 모아 보여주는 런처(허브)**.
> 검색·태그 필터·라이트/다크 테마·한국어/영어 토글을 갖춘 순수 정적 단일 페이지 앱.

🔗 **라이브:** https://clayborneyeounjunlee.github.io/moa/
📦 **저장소:** https://github.com/ClayborneYeounjunLee/moa

---

## ✨ 주요 기능

- **미니앱 카드 그리드** — `sites.js`에 등록된 형제 앱들을 색상 타일 + 이름 + 설명 + 태그 카드로 나열. 카드 전체가 링크라 아무 곳이나 누르면 해당 앱으로 이동.
- **검색** — 상단 검색창에 입력하면 이름·부제·설명·태그를 통합 검색해 실시간 필터링.
- **태그 필터(pill)** — 등록된 모든 사이트의 태그를 자동 수집해 "전체 + 각 태그" 버튼으로 표시. 한 번에 하나의 태그로 좁히기.
- **표시 개수 라인** — 전체 사이트 개수 및 필터 적용 시 "N개 표시 중" 카운트 표시.
- **라이트/다크 테마 토글** — 🌙 / ☀️ 버튼. 선택은 브라우저에 저장되고, 첫 방문 시 OS 다크모드 설정을 따름. 로드 시 깜빡임 방지(FOUC 방지) 인라인 스크립트 적용.
- **한국어 ⇄ English 토글** — EN / 한 버튼. 정적 텍스트와 동적으로 렌더된 카드/카운트 모두 즉시 전환. 언어 선택도 브라우저에 저장되며, 최초 방문 시 `navigator.language`로 자동 감지.
- **화면에서 사이트 추가(바텀시트)** — "＋ 사이트 추가" 카드를 누르면 폼이 열림. 입력하면 ① 실시간 미리보기 카드 ② **`sites.js`에 붙여넣을 코드 스니펫**이 자동 생성됨.
  - **📋 코드 복사** — 스니펫을 클립보드로 복사해 소스에 영구 추가.
  - **＋ 이 기기에 바로 추가** — 이 브라우저(localStorage)에만 즉시 저장해 화면에 반영. 이렇게 추가된 항목엔 "로컬" 배지 + 삭제(×) 버튼이 붙음.
- **반응형/모바일 대응** — `auto-fill` 그리드, iOS safe-area 인셋 대응, PWA 스타일 메타 태그(홈 화면 추가 시 상태바/타이틀 지정).

---

## 🧱 기술 스택 / 언어

| 항목 | 내용 |
|---|---|
| **언어** | 순수 **HTML + CSS + JavaScript (ES2015+)** — 프레임워크·번들러 없음 |
| **파일 수** | 앱 파일 2개: `index.html`, `sites.js` (+ 이 `README.md` 문서) |
| **JS 모듈 방식** | ES 모듈 아님. `sites.js`를 일반 `<script>`로 로드해 **`window.SITES` 전역 배열**로 노출, `index.html` 인라인 스크립트가 소비 |
| **빌드 도구** | 없음. `package.json`·번들러·트랜스파일러 전무. 파일 그대로 서빙 |
| **CSS** | 인라인 `<style>` 하나. **`:root` CSS 커스텀 프로퍼티(디자인 토큰)** 기반, `html[data-theme="dark"]`로 다크 오버라이드 |
| **본문 폰트** | **Pretendard** 우선, 폴백 `Apple SD Gothic Neo → Malgun Gothic → Noto Sans KR → sans-serif` (Pretendard는 별도 임베드 없이 시스템/사용자 설치분 사용) |
| **웹폰트(CDN)** | Google Fonts에서 `Noto Sans Tagalog`, `Noto Sans JP(500)` 로드. 바이바이인(ᜊ) 타일은 사이트 객체의 `font` 필드(`'Noto Sans Tagalog'`)로 실제 적용됨. `Noto Sans JP`는 `<head>`에서 로드되지만 현재 어떤 CSS 규칙에도 직접 지정돼 있지 않아, `カ`/`数` 타일은 기본 본문 폰트 스택으로 렌더된다(글리프가 있으면 표시) |
| **외부 라이브러리/SDK** | **없음.** 아이콘 폰트·jQuery·분석 스크립트 등 일절 없음 |
| **파비콘** | 인라인 SVG data-URI (4분할 격자 마크) |
| **CSS 고급 기능** | `color-mix()`, `env(safe-area-inset-*)`, CSS 그라데이션, `@keyframes` 애니메이션(바텀시트 슬라이드업/페이드) |

`<head>`에서 실제 로드되는 외부 리소스는 **Google Fonts 두 개뿐**이다(아래 참고).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tagalog&family=Noto+Sans+JP:wght@500&display=swap" rel="stylesheet">
```

---

## 🏗️ 시스템 구조

**단일 페이지 · 무(無) 라우팅 정적 앱.** 서버·라우터·상태관리 라이브러리가 없다. 모든 로직은 `index.html` 하단의 인라인 `<script>` 하나에 담겨 있으며, 데이터만 `sites.js`로 분리돼 있다.

### 부팅 → 렌더 흐름

1. **테마 선(先)적용** — `<head>` 최상단 인라인 IIFE가 `localStorage["hub-theme"]`(없으면 OS `prefers-color-scheme`)를 읽어 `<html data-theme>`를 **본문 렌더 전에** 설정 → 다크 화면 깜빡임 방지.
2. **데이터 로드** — `<script src="sites.js">`가 실행되어 `window.SITES` 배열 등록.
3. **본문 스크립트 실행:**
   - 유틸(`$`, `$$`, `esc`, `slug`) 및 언어 사전 `T{ ko, en }` 정의, 현재 언어 `L` 결정.
   - 테마 버튼/언어 버튼 이벤트 바인딩, `setTheme()`로 초기 테마 확정.
   - `render()` 최초 호출 → `applyLang(L)`로 정적 텍스트 번역 + 재렌더.
4. **`render()`** (앱의 심장): `allSites()`로 목록을 만든 뒤
   - 태그바(pill) HTML 생성,
   - `activeTag` + `query`로 필터,
   - 카운트 라인 갱신,
   - 카드 그리드 + "＋ 추가" 카드 렌더,
   - 태그/삭제/추가 버튼에 이벤트 재바인딩.

### 상태 관리

프레임워크 없이 **모듈 스코프 변수 + 재렌더** 방식:

| 상태 | 저장 위치 | 설명 |
|---|---|---|
| `activeTag` | JS 변수 | 현재 선택된 태그 필터("" = 전체) |
| `query` | JS 변수 | 검색어 |
| `L` | JS 변수 + localStorage | 현재 언어(`ko`/`en`) |
| 테마 | `<html data-theme>` + localStorage | 라이트/다크 |
| 사용자 추가 사이트 | localStorage(JSON) | 로컬 전용 추가 항목 |

상태가 바뀌면 어디서든 `render()`(및 필요 시 `syncPreview()`)를 다시 호출해 DOM을 통째로 다시 그린다(가상 DOM·리액티브 바인딩 없음).

### 핵심 함수

| 함수 | 역할 |
|---|---|
| `customSites()` / `saveCustom()` | localStorage의 로컬 추가 사이트 읽기/쓰기 |
| `allSites()` | `window.SITES`(기본) + 로컬 추가분을 병합, 각 항목에 `_local` 플래그 부여 |
| `tileStyle(s)` | 색상/그라데이션/특수 폰트를 타일 인라인 스타일로 |
| `cardHTML(s)` | 사이트 하나 → 카드 마크업(링크·타일·이름·설명·태그·로컬배지) |
| `render()` | 태그바·필터·카운트·그리드 렌더 + 이벤트 바인딩 |
| `openSheet()` / `closeSheet()` | 추가 바텀시트 열고 닫기 |
| `readForm()` | 폼 입력 → 사이트 객체 |
| `snippet(s)` | 사이트 객체 → `sites.js`에 붙여넣을 코드 문자열 |
| `syncPreview()` | 폼 변경 시 미리보기 카드 + 스니펫 실시간 갱신 |
| `tr(k)` / `applyLang()` / `applyStaticLang()` | 다국어 번역 및 적용 |
| `setTheme(t)` | 테마 전환 + 저장 + `theme-color` 메타/버튼 아이콘 갱신 |

### 보안 소소 처리
- `esc()`로 사용자/데이터 문자열을 HTML 이스케이프해 삽입(XSS 방지).
- URL은 `https?://`가 없으면 `https://`를 자동 접두.

---

## 🗂️ 데이터

앱의 유일한 "콘텐츠 데이터"는 **`sites.js`의 `window.SITES` 배열**이다. 각 원소가 미니앱 하나를 기술하는 객체이며, 현재 **9개** 등록돼 있다.

### 사이트 객체 스키마

| 필드 | 필수 | 타입 | 설명 |
|---|:--:|---|---|
| `id` | ✅ | string | 고유 키(영문/숫자, 중복 금지) |
| `name` | ✅ | string | 사이트 이름(한글) |
| `sub` | | string | 부제·영문명(작게 표시) |
| `desc` | | string | 한 줄 설명 |
| `url` | ✅ | string | 사이트 주소 |
| `icon` | | string | 타일에 보일 글자/이모지 1~2자 |
| `color` | | string(HEX) | 대표 색 |
| `color2` | | string(HEX) | 그라데이션 끝 색(없으면 단색) |
| `tags` | | string[] | 분류 태그 배열 |
| `font` | | string | 특수 아이콘 글자용 폰트(예: 바이바이인) |

### 실제 예시 스니펫

```js
window.SITES = [
  {
    id: "kanade",
    name: "카나데",
    sub: "Kanade",
    desc: "히라가나 · 가타카나 암기 카드 · 퀴즈 · 통계",
    url: "https://clayborneyeounjunlee.github.io/kanade/",
    icon: "カ",
    color: "#e2603f",
    color2: "#eb8a52",
    tags: ["일본어", "암기", "플래시카드"]
  },
  {
    id: "baybayin",
    name: "바이바이",
    sub: "Baybay",
    desc: "필리핀 고대문자 바이바이인 암기 카드",
    url: "https://clayborneyeounjunlee.github.io/baybayin/",
    icon: "ᜊ",
    color: "#c0563a",
    color2: "#e08a52",
    tags: ["필리핀어", "암기", "문자"],
    font: "'Noto Sans Tagalog', sans-serif"   // 특수 폰트가 필요한 경우
  }
  // ...
];
```

### 현재 등록된 9개 앱

| id | 이름 | 설명 | 태그 |
|---|---|---|---|
| `haru` | 하루 (Haru) | 매일의 루틴·할 일·디데이·캘린더를 한 곳에서 | 생산성, 루틴, PWA |
| `kanade` | 카나데 (Kanade) | 히라가나·가타카나 암기 카드·퀴즈·통계 | 일본어, 암기, 플래시카드 |
| `baybayin` | 바이바이 (Baybay) | 필리핀 고대문자 바이바이인 암기 카드 | 필리핀어, 암기, 문자 |
| `dday` | 디데이 (D-Day) | 공익 복무·조기전역·병가/연가/휴일 계산과 캘린더 | 공익, 전역, 캘린더, 계산기 |
| `kazu` | 카즈 (Kazu) | 일본어 숫자·조수사·날짜/시간 읽기 암기 카드 | 일본어, 숫자, 암기 |
| `tonggeun` | 통근권 (Tonggeun) | 지하철+버스로 닿는 30·60·90분 통근 가능권을 지도에 | 지도, 지하철, 통근, 수도권 |
| `tonggeunmel` | 멜버른 통근권 (Melbourne) | 멜버른 기차로 닿는 30·45·60분 통근 가능권 지도 | 지도, 기차, 통근, 멜버른 |
| `jangbu` | 장부 (Jangbu) | 캘린더로 보는 일별 수입·지출·고정항목·월/분기/년 분석 | 가계부, 지출, 돈, 도구 |
| `korearescue` | Korea Rescue | 외국인·교포를 위한 한국여행 서바이벌 가이드 | 여행, 외국인, 가이드, 도구 |

> 데이터는 **하드코딩된 정적 배열**이다. API로 불러오지 않으며, 새 앱은 `sites.js`를 편집해 추가한다(아래 참고).

---

## 💾 저장소 / DB

**서버·데이터베이스가 없다.** Firebase도 없고(설정 파일 `firebase.json`/`.firebaserc` 없음), 백엔드 API도 없다. 상태는 전적으로 **브라우저 `localStorage`**에 저장된다.

### localStorage 키

| 키 | 용도 | 값 형태 |
|---|---|---|
| `hub-theme` | 테마 선택 저장(`light`/`dark`) | 문자열 |
| `hub-lang` | 언어 선택 저장(`ko`/`en`) | 문자열 |
| `hub-custom-sites` | "이 기기에 바로 추가"로 넣은 사용자 사이트 목록 | JSON 배열(사이트 객체와 동일 스키마) |

### 게스트 / 오프라인 / 폴백 동작

- 모든 localStorage 접근은 `try/catch`로 감싸 있어, **프라이빗 모드·저장 차단 환경에서도 앱이 죽지 않는다**(테마/언어는 세션 내 기본값으로 동작).
- 로컬 추가 사이트는 **해당 브라우저에만** 저장되며 다른 기기·계정과 동기화되지 않는다 → 영구 공유하려면 스니펫을 복사해 `sites.js`에 커밋해야 한다.
- 데이터가 배열 파싱에 실패하면 빈 배열로 폴백(`|| []`).

---

## 🌐 외부 API·의존성

**호출하는 외부 API가 없다.** Kakao/Google/환율/TravelTime/Skyscanner/Web Speech 등 어떤 외부 서비스도 사용하지 않으며, **API 키가 전혀 필요 없다.**

유일한 외부 의존성은 렌더링용 리소스뿐:

| 의존성 | 출처 | 용도 | 키 필요 |
|---|---|---|:--:|
| Google Fonts (`Noto Sans Tagalog`, `Noto Sans JP`) | fonts.googleapis.com / fonts.gstatic.com | 특수 아이콘 글자(바이바이인·일본어) 렌더 | ❌ |
| 링크 대상 미니앱들 | 각 `*.github.io` | 카드 클릭 시 이동(허브가 직접 임베드/호출하진 않음) | ❌ |

> 클립보드 복사에는 브라우저 내장 `navigator.clipboard`(실패 시 `document.execCommand("copy")` 폴백)를 쓴다 — 외부 의존성 아님.

---

## ▶️ 로컬 실행 방법

빌드가 필요 없다. 정적 파일이므로 아무 정적 서버로 열면 된다.

```bash
# 저장소 클론
git clone https://github.com/ClayborneYeounjunLee/moa.git
cd moa

# 방법 1) Python 내장 서버
python -m http.server 8080
# → http://localhost:8080

# 방법 2) Node http-server (설치돼 있다면)
npx http-server -p 8080

# 방법 3) VS Code Live Server 확장 등
```

> `index.html`을 파일로 직접 열어도(`file://`) 대부분 동작하지만, 폰트 로드·일부 브라우저 정책상 **로컬 서버 사용을 권장**한다.
> `package.json`이 없으므로 `npm install` 단계는 없다.

---

## 🚀 배포

**GitHub Pages**로 배포되어 있다(정적 호스팅).

1. 저장소 → **Settings → Pages**.
2. Source: **Deploy from a branch**, Branch: **`main`** / 루트(`/`).
3. 저장 후 몇 분 뒤 `https://clayborneyeounjunlee.github.io/moa/` 에 게시.
4. 이후 `main`에 푸시하면 자동 재배포. 별도 빌드 스텝·워크플로 없음.

**새 미니앱 추가 절차:**
- (권장) 앱 우측 하단 **"＋ 사이트 추가"** → 폼 작성 → **📋 코드 복사** → `sites.js`의 `window.SITES` 배열에 붙여넣기 → 커밋·푸시.
- 또는 `sites.js`에 위 스키마대로 객체를 직접 추가.

---

## 📁 파일 구조

```
moa/
├── index.html   # 앱 전체: 마크업 + 인라인 CSS(디자인 토큰/다크모드) + 인라인 JS(렌더·검색·테마·다국어·추가 시트)
├── sites.js     # 데이터: window.SITES 배열(미니앱 레지스트리) + 필드 설명 주석
└── README.md    # 이 문서
```

- **`index.html`** — 유일한 진입점. UI·스타일·로직을 모두 포함하는 자기완결형 단일 파일.
- **`sites.js`** — 순수 데이터 파일. 코드 로직 없이 `window.SITES` 배열만 정의하며, 상단 주석에 필드 설명이 있어 편집 가이드 역할을 한다.

---

## 🔗 관련 앱 (형제 미니앱)

이 허브가 모으는 앱들은 모두 같은 제작자의 GitHub Pages 단일 파일 앱이며, **동일한 디자인 토큰 시스템**(`--bg`/`--card`/`--ink`/`--accent` 등, 라이트/다크, Pretendard)을 공유한다.

| 앱 | 링크 |
|---|---|
| 하루 (Haru) | https://clayborneyeounjunlee.github.io/haru/ |
| 카나데 (Kanade) | https://clayborneyeounjunlee.github.io/kanade/ |
| 바이바이 (Baybayin) | https://clayborneyeounjunlee.github.io/baybayin/ |
| 디데이 (D-Day) | https://clayborneyeounjunlee.github.io/dday/ |
| 카즈 (Kazu) | https://clayborneyeounjunlee.github.io/kazu/ |
| 통근권 (Tonggeun) | https://clayborneyeounjunlee.github.io/tonggeun/ |
| 멜버른 통근권 | https://clayborneyeounjunlee.github.io/tonggeun-mel/ |
| 장부 (Jangbu) | https://clayborneyeounjunlee.github.io/jangbu/ |
| Korea Rescue | https://clayborneyeounjunlee.github.io/korea-rescue/ |

---

<sub>이 문서는 저장소의 실제 코드(`index.html`, `sites.js`)를 읽고 작성되었습니다. 비밀키·백엔드·외부 API 없음.</sub>
