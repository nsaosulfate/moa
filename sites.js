/* ══════════════════════════════════════════════════════════════════
   사이트 목록  ·  새 사이트를 추가하려면 아래 배열에 객체 하나만 넣으세요.

   ┌── 필드 설명 ─────────────────────────────────────────────────┐
   │ id     : 고유 키 (영문/숫자, 중복 금지)                        │
   │ name   : 사이트 이름 (한글)                                    │
   │ sub    : 부제 · 영문명 (작게 표시, 선택)                       │
   │ desc   : 한 줄 설명                                            │
   │ url    : 사이트 주소                                           │
   │ icon   : 타일에 보일 글자/이모지 1~2자                         │
   │ color  : 대표 색 (HEX)                                         │
   │ color2 : 그라데이션 끝 색 (선택 · 없으면 단색)                 │
   │ tags   : 분류 태그 배열                                        │
   │ font   : 특수 폰트가 필요한 아이콘일 때만 (선택)              │
   │          예) 바이바이인 글자는 Noto Sans Tagalog 필요         │
   └──────────────────────────────────────────────────────────────┘

   💡 형식이 헷갈리면 허브 화면 우측 하단 "＋ 사이트 추가" 버튼을 쓰세요.
      폼을 채우면 여기에 붙여넣을 코드를 자동으로 만들어 줍니다.
   ══════════════════════════════════════════════════════════════════ */

window.SITES = [

  {
    id: "haru",
    name: "하루",
    sub: "Haru",
    desc: "매일의 루틴 · 할 일 · 디데이 · 캘린더를 한 곳에서",
    url: "https://nsaosulfate.github.io/haru/",
    icon: "하",
    color: "#2f9e63",
    color2: "#43c07a",
    tags: ["생산성", "루틴", "PWA"]
  },

  {
    id: "kanade",
    name: "카나데",
    sub: "Kanade",
    desc: "히라가나 · 가타카나 암기 카드 · 퀴즈 · 통계",
    url: "https://nsaosulfate.github.io/kanade/",
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
    url: "https://nsaosulfate.github.io/baybayin/",
    icon: "ᜊ",
    color: "#c0563a",
    color2: "#e08a52",
    tags: ["필리핀어", "암기", "문자"],
    font: "'Noto Sans Tagalog', sans-serif"
  },

  {
    id: "dday",
    name: "디데이",
    sub: "D-Day",
    desc: "공익 복무 · 조기전역 · 병가/연가/휴일 계산과 캘린더",
    url: "https://nsaosulfate.github.io/dday/",
    icon: "D",
    color: "#2563eb",
    color2: "#4f8cff",
    tags: ["공익", "전역", "캘린더", "계산기"]
  },

  {
    id: "kazu",
    name: "카즈",
    sub: "Kazu",
    desc: "일본어 숫자 · 조수사 · 날짜/시간 읽기 암기 카드",
    url: "https://nsaosulfate.github.io/kazu/",
    icon: "数",
    color: "#0ea5a4",
    color2: "#22c7b8",
    tags: ["일본어", "숫자", "암기"]
  },

  {
    id: "tonggeun",
    name: "통근권",
    sub: "Tonggeun",
    desc: "출발지에서 지하철+버스로 닿는 30·60·90분 통근 가능권을 지도에 표시",
    url: "https://nsaosulfate.github.io/tonggeun/",
    icon: "통",
    color: "#2563eb",
    color2: "#4f8cff",
    tags: ["지도", "지하철", "통근", "수도권"]
  }

];
