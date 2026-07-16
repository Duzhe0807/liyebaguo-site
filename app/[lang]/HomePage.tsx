"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, CalendarBlank, ChatCircleDots, Clock, Crown, DoorOpen,
  EnvelopeSimple, List, MapPin, MusicNotes, Phone, Play, Plus, Quotes,
  Star, UsersThree, X,
} from "@phosphor-icons/react";
import { FormEvent, useEffect, useState } from "react";
import { TrailerModal } from "./TrailerModal";
import { customerServiceUrl, whatsappId, whatsappUrl } from "../customerService";
import { CustomerServiceChooser } from "./CustomerServiceChooser";


type Locale = "zh" | "zh-hant" | "en" | "ja" | "ko";

const baseCopy = {
  zh: {
    nav: ["体验概览", "演艺美馔", "团队接待", "图片与视频", "关于我们", "常见问题"],
    heroTitle: "礼宴巴国",
    heroTagline: "一席宫宴，看懂巴蜀",
    heroSub: "一席可观、可食、可赏、可忆的巴国礼宴，以礼乐为引，邀君入席。",
    book: "预订席位", group: "团体咨询", watchTrailer: "观看影片",
    facts: ["约 110 分钟", "最多 160 人", "支持包场", "重庆巴国城"],
    valueTitle: "一席之间\n读懂巴蜀",
    values: [
      ["正宗川渝宴席", "地方风味与宴席礼序共同呈现"],
      ["全场景沉浸演艺", "礼乐、舞台与互动贯穿用餐过程"],
      ["国际接待服务", "面向海外游客、旅行社与商务团队"],
    ],
    audienceTitle: "适合谁来体验",
    audiences: [
      ["海外游客", "用一场晚宴初识重庆与巴蜀文化"],
      ["旅行社与地接社", "便于行程编排、团队报价与批量接待"],
      ["企业与商务团队", "满足宴请、活动、年会与包场需求"],
      ["家庭与私人庆典", "为生日、纪念日及重要聚会添一份仪式感"],
    ],
    choose: "选择您的礼宴体验",
    tiers: [
      ["嘉宾体验", "嘉宾席位", "午宴 238 / 晚宴 316", "含古风游园、迎宾礼、演艺与宫宴", "标准观演席位", "选择此体验"],
      ["贵宾体验", "贵宾席位", "午宴 296 / 晚宴 458", "含古风游园、迎宾礼、演艺与宫宴", "更优观演席位", "选择此体验"],
      ["SVIP 体验", "SVIP 席位", "午宴 496 / 晚宴 596", "含古风游园、迎宾礼、演艺与宫宴", "赠送古装服饰和古装头饰", "选择此体验"],
    ],
    journey: "礼宴体验之旅",
    steps: ["古风游园", "迎宾礼", "入宴", "现场演艺", "互动体验", "礼成离场"],
    stories: [
      ["沉浸式巴国大秀", "Immersive Ba Kingdom Show", "灯光、鼓乐、舞蹈与古代礼制交织，巴国传说在席间徐徐展开。即使不懂中文，也能随舞台情緒沉浸其中。", "观看演出亮点"],
      ["入席成礼 边吃边入戏", "Join the Ritual Banquet", "在演员引导下完成迎宾、入席、举杯与互动，让一顿川渝宴席成为可亲身参与的文化体验。", "预订宴席体验"],
      ["穿上华服 了解东方文化", "Dress in Hanfu & Discover Eastern Culture", "换上华服，在专业引导下了解服饰、礼仪与宴席文化，于轻松互动中感受东方审美。", "了解华服体验"],
      ["古风妆造 拍出东方大片", "Ancient Styling & Photo Moments", "从发型、妆容到服饰一站式搭配，为情侣、朋友与家庭留下具东方氛围的旅行影像。", "预约妆造"],
    ],
    travelTitle: "旅行社与团队接待",
    travelSub: "面向旅行社、企业宴请、海外游客团及商务接待，提供最多 160 人接待、包场、团队报价、英文菜单与多语言服务沟通。",
    contactTitle: "到访礼宴巴国",
    trustTitle: "宾客心声",
    trustSubtitle: "来自世界各地体验者的真实反馈",
    testimonials: [
      ["完全不需要懂中文，演员的表情、音乐和灯光已经把故事讲得很清楚。穿上汉服的体验太惊艳了。", "Sarah M.", "英国"],
      ["带父母来体验，他们完全沉浸其中。宴席安排和接待都很专业，适合带外国朋友来。", "Chen 先生", "中国香港"],
      ["我们为团队年会包了场，从迎宾到演出都有专人对接，整个过程非常顺畅。", "Park 先生", "韩国"],
    ],
    gallery: "精彩瞬间", faq: "常见问题", booking: "席位预约", inquiry: "团队咨询",
    submitBook: "提交预约", submitGroup: "提交询价",
    success: "感谢您的垂询，礼宴巴国团队将在 24 小时内与您联系。",
  },
  en: {
    nav: ["Experience", "The Banquet", "Group Events", "Gallery", "About", "FAQ"],
    heroTitle: "Liyan Baguo",
    heroTagline: "Dining, theatre and Hanfu in one unforgettable night",
    heroSub: "An immersive cultural dinner show where live performance, ritual hospitality and photo-ready styling come together around the table.",
    book: "Reserve Your Seat", group: "Group Enquiry", watchTrailer: "Watch trailer",
    facts: ["Approx. 110 Minutes", "Up to 160 Guests", "Private Events", "Chongqing"],
    valueTitle: "Discover Bashu Culture in One Banquet",
    values: [
      ["Authentic Sichuan Banquet", "Regional flavours presented through traditional banquet culture"],
      ["Immersive Live Performance", "Ritual, theatre and guest interaction unfold throughout the meal"],
      ["International Hospitality", "Designed for overseas visitors, travel partners and business groups"],
    ],
    audienceTitle: "Who It Is For",
    audiences: [
      ["International Travellers", "Experience Chongqing culture in one memorable evening"],
      ["Travel Agencies & DMCs", "Easy itinerary planning, group quotations and coordinated arrivals"],
      ["Corporate & Business Groups", "For hosted dinners, events, annual gatherings and buyouts"],
      ["Families & Celebrations", "A distinctive setting for birthdays and meaningful occasions"],
    ],
    choose: "Choose Your Experience",
    tiers: [
      ["Guest Seat", "Guest seating area", "Lunch 238 / Dinner 316", "Garden visit, welcome ritual, show & banquet included", "Standard viewing position", "Select Experience"],
      ["VIP Seat", "VIP seating area", "Lunch 296 / Dinner 458", "Garden visit, welcome ritual, show & banquet included", "Enhanced viewing position", "Select Experience"],
      ["SVIP Seat", "SVIP premium seating area", "Lunch 496 / Dinner 596", "Garden visit, welcome ritual, show & banquet included", "Traditional costume and headwear included", "Select Experience"],
    ],
    journey: "The Liyan Baguo Journey",
    steps: ["Garden Visit", "Welcome Ritual", "Banquet", "Live Show", "Interaction", "Farewell"],
    stories: [
      ["Immersive Ba Kingdom Show", "LIVE PERFORMANCE", "Lighting, drums, dance and ancient court rituals bring Ba Kingdom legends to life around the banquet. No Chinese is required to follow the emotion of the show.", "Watch Show Highlights"],
      ["Join the Ritual Banquet", "DINING & INTERACTION", "Follow the performers through the welcome, ceremonial seating, toasts and guest interaction—turning a Sichuan banquet into a cultural experience you can join.", "Book the Banquet"],
      ["Dress in Hanfu & Discover Eastern Culture", "HANFU EXPERIENCE", "Dress in Hanfu and discover traditional costume, etiquette and banquet culture with friendly guidance and an easy introduction to Eastern aesthetics.", "Explore the Hanfu Experience"],
      ["Ancient Styling & Photo Moments", "STYLING & PHOTOGRAPHY", "Complete hairstyling, makeup and costume options create atmospheric travel portraits for couples, friends and families.", "Book Styling"],
    ],
    travelTitle: "Travel Agency & Group Events",
    travelSub: "For travel agencies, corporate events, international tour groups and business hosting—with capacity for 160 guests, private buyouts, group rates, English menus and multilingual service coordination.",
    contactTitle: "Visit Liyan Baguo",
    trustTitle: "Guest Love",
    trustSubtitle: "Real feedback from guests around the world",
    testimonials: [
      ["You don't need to understand Chinese. The actors, music and lighting tell the story beautifully. Dressing in Hanfu was a highlight of our trip.", "Sarah M.", "United Kingdom"],
      ["I brought my parents and they were fully immersed. The banquet and service were very professional—great for foreign guests.", "Mr. Chen", "Hong Kong, China"],
      ["We booked the venue for a team event. From welcome to show, everything was well coordinated.", "Mr. Park", "South Korea"],
    ],
    gallery: "Gallery", faq: "Frequently Asked Questions", booking: "Seat Reservation", inquiry: "Group Consultation",
    submitBook: "Submit Booking", submitGroup: "Submit Inquiry",
    success: "Thank you. Your enquiry has been received and our team will contact you within 24 hours.",
  },
} as const;
const copy = {
  ...baseCopy,
  "zh-hant": {
    ...baseCopy.zh,
    nav: ["體驗概覽", "演藝美饌", "團隊接待", "圖片與影片", "關於我們", "常見問題"],
    heroTagline: "一席宮宴，讀懂巴蜀",
    heroSub: "一席可觀、可食、可賞、可憶的巴國禮宴，以禮樂為引，邀君入席。",
    book: "預訂席位", group: "團體諮詢", watchTrailer: "觀看影片",
    facts: ["約 110 分鐘", "最多 160 人", "支援包場", "重慶巴國城"],
    valueTitle: "一席之間\n讀懂巴蜀",
    values: [["正宗川渝宴席", "地方風味與宴席禮序共同呈現"], ["全場景沉浸演藝", "禮樂、舞台與互動貫穿用餐過程"], ["國際接待服務", "面向海外旅客、旅行社與商務團隊"]],
    audienceTitle: "適合誰來體驗",
    audiences: [["海外旅客", "用一場晚宴初識重慶與巴蜀文化"], ["旅行社與地接社", "便於行程編排、團隊報價與批量接待"], ["企業與商務團隊", "滿足宴請、活動、年會與包場需求"], ["家庭與私人慶典", "為生日、紀念日及重要聚會添一份儀式感"]],
    choose: "選擇您的禮宴體驗",
    tiers: [
      ["嘉賓體驗", "嘉賓席位", "午宴 238 / 晚宴 316", "含古風遊園、迎賓禮、演藝與宮宴", "標準觀演席位", "選擇此體驗"],
      ["貴賓體驗", "貴賓席位", "午宴 296 / 晚宴 458", "含古風遊園、迎賓禮、演藝與宮宴", "更佳觀演席位", "選擇此體驗"],
      ["SVIP 體驗", "SVIP 席位", "午宴 496 / 晚宴 596", "含古風遊園、迎賓禮、演藝與宮宴", "贈送古裝服飾和古裝頭飾", "選擇此體驗"],
    ],
    journey: "禮宴體驗之旅",
    steps: ["古風遊園", "迎賓禮", "入宴", "現場演藝", "互動體驗", "禮成離場"],
    stories: [
      ["沉浸式巴國大秀", "Immersive Ba Kingdom Show", "燈光、鼓樂、舞蹈與古代禮制交織，帶您走進巴國傳說。無需懂中文，也能沉浸其中。", "觀看演出亮點"],
      ["入席成禮 邊吃邊入戲", "Join the Ritual Banquet", "在演員引導下入席、行禮、舉杯與互動，參與一場有劇情、有儀式、有美食的巴國宴。", "預訂宴席體驗"],
      ["穿上華服 了解東方文化", "Dress in Hanfu & Discover Eastern Culture", "換上華服，在專業引導下了解服飾、禮儀與宴席文化。", "了解華服體驗"],
      ["古風妝造 拍出東方大片", "Ancient Styling & Photo Moments", "髮型、妝容與服飾一站式搭配，留下獨特的中國旅行回憶。", "預約妝造"],
    ],
    travelTitle: "旅行社與團隊接待",
    contactTitle: "到訪禮宴巴國",
    trustTitle: "賓客心聲",
    trustSubtitle: "來自世界各地體驗者的真實反饋",
    testimonials: [
      ["完全不需要懂中文，演員的表情、音樂和燈光已經把故事講得很清楚。換上漢服的體驗太驚豔了。", "Sarah M.", "英國"],
      ["帶父母來體驗，他們完全沉浸其中。宴席安排和接待都很專業，適合帶外國朋友來。", "陳先生", "中國香港"],
      ["我們為團隊年會包了場，從迎賓到演出都有專人對接，整個過程非常順暢。", "朴先生", "韓國"],
    ],
    gallery: "精彩瞬間", faq: "常見問題", booking: "席位預約", inquiry: "團隊諮詢",
    submitBook: "提交預約", submitGroup: "提交詢價",
    success: "感謝您的垂詢，禮宴巴國團隊將在 24 小時內與您聯絡。",
  },
  ko: {
    ...baseCopy.en,
    nav: ["체험", "메뉴·패키지", "단체 행사", "갤러리", "소개", "자주 묻는 질문"],
    heroTitle: "리옌 바궈",
    heroTagline: "음식과 공연, 한푸가 어우러진 충칭의 하룻밤",
    heroSub: "한푸, 라이브 공연, 전통 의식과 사진 스타일링이 어우러지는 몰입형 문화 디너쇼입니다.",
    book: "좌석 예약", group: "단체 문의", watchTrailer: "소개 영상 보기",
    facts: ["약 110분", "최대 160명", "단독 대관 가능", "충칭 바궈청"],
    valueTitle: "한 번의 연회로 만나는 바슈 문화",
    values: [["정통 쓰촨 연회", "지역의 맛과 전통 연회 문화를 함께 경험합니다"], ["몰입형 라이브 공연", "식사 내내 의식과 무대, 관객 참여가 이어집니다"], ["해외 고객 맞춤 응대", "해외 여행객과 여행사, 비즈니스 단체를 위한 서비스"]],
    audienceTitle: "이런 분께 추천합니다",
    audiences: [["해외 여행객", "한 번의 특별한 저녁으로 충칭 문화를 만나보세요"], ["여행사·현지 여행사", "일정 구성, 단체 견적과 입장 조율이 편리합니다"], ["기업·비즈니스 단체", "비즈니스 만찬, 기업 행사와 단독 대관에 적합합니다"], ["가족·기념 행사", "생일과 기념일을 위한 특별한 공간입니다"]],
    choose: "좌석 패키지 선택",
    tiers: [
      ["일반석", "일반 관람 좌석", "점심 238 / 저녁 316", "정원 관람, 환영 의식, 공연과 연회 포함", "일반 관람 위치", "이 좌석 선택"],
      ["VIP석", "VIP 관람 좌석", "점심 296 / 저녁 458", "정원 관람, 환영 의식, 공연과 연회 포함", "더 좋은 관람 위치", "이 좌석 선택"],
      ["SVIP석", "SVIP 프리미엄 좌석", "점심 496 / 저녁 596", "정원 관람, 환영 의식, 공연과 연회 포함", "전통 의상과 머리 장식 포함", "이 좌석 선택"],
    ],
    journey: "리옌 바궈 체험 여정",
    steps: ["전통 정원 산책", "환영 의식", "연회 입장", "라이브 공연", "관객 참여", "마무리 인사"],
    stories: [
      ["몰입형 바 왕국 공연", "IMMERSIVE BA KINGDOM SHOW", "조명, 북소리, 춤과 고대 의식이 어우러져 바 왕국의 전설을 펼쳐냅니다. 중국어를 몰라도 충분히 즐길 수 있습니다.", "공연 하이라이트 보기"],
      ["의식에 참여하는 연회", "JOIN THE RITUAL BANQUET", "배우의 안내에 따라 착석하고 예를 갖추며 건배와 상호작용에 참여하는 특별한 문화 연회입니다.", "연회 체험 예약"],
      ["한푸를 입고 만나는 동양 문화", "HANFU & EASTERN CULTURE", "한푸를 입고 전문 안내와 함께 전통 복식, 예절과 연회 문화를 편안하게 경험해 보세요.", "한푸 체험 보기"],
      ["고전 스타일링과 인생 사진", "ANCIENT STYLING & PHOTO MOMENTS", "헤어, 메이크업과 의상을 한 번에 준비해 연인, 친구, 가족의 특별한 중국 여행 사진을 남겨드립니다.", "스타일링 예약"],
    ],
    travelTitle: "여행사 및 단체 행사",
    travelSub: "여행사, 기업 행사, 해외 관광단과 비즈니스 연회를 위해 최대 160명 수용, 단독 대관, 단체 견적, 영문 메뉴와 다국어 응대를 지원합니다.",
    contactTitle: "리옌 바궈 방문 안내",
    trustTitle: "게스트 후기",
    trustSubtitle: "전 세계 방문객의 실제 후기",
    testimonials: [
      ["중국어를 몰라도 괜찮습니다. 배우의 표정, 음악과 조명이 이야기를 충분히 전달합니다. 한푸를 입은 경험이 정말 인상 깊었어요.", "Sarah M.", "영국"],
      ["부모님을 모시고 갔는데 완전히 몰입하셨습니다. 연회와 서비스가 매우 전문적이라 외국 손님을 모시기에 좋습니다.", "Chen 씨", "홍콩, 중국"],
      ["팀 행사로 단독 대관을 했는데, 환영 의식부터 공연까지 전담 매니저가 진행해 매우 원활했습니다.", "Park 씨", "대한민국"],
    ],
    gallery: "하이라이트", faq: "자주 묻는 질문", booking: "좌석 예약", inquiry: "단체 상담",
    submitBook: "예약 신청", submitGroup: "문의 제출",
    success: "문의가 접수되었습니다. 담당자가 일정, 인원, 요청 사항을 확인한 후 연락드리겠습니다.",
  },
  ja: {
    ...baseCopy.en,
    nav: ["体験", "メニュー・パッケージ", "団体受付", "ギャラリー", "私たちについて", "よくある質問"],
    heroTitle: "礼宴巴国",
    heroTagline: "食と演劇、漢服が織りなす重慶の一夜",
    heroSub: "漢服、ライブパフォーマンス、儀式の交流、フォトスタイリングを楽しむ没入型文化ディナーショーです。",
    book: "ご予約", group: "団体問い合わせ", watchTrailer: "紹介動画を見る",
    facts: ["約110分", "最大160名", "貸切可", "重慶・巴国城"],
    valueTitle: "一席で味わう巴蜀文化",
    values: [
      ["本場の四川・重慶料理", "地方の風味と宴席文化をともに楽しむ"],
      ["没入型ライブパフォーマンス", "礼楽、舞台、交流が食事を通じて織りなされる"],
      ["国際対応サービス", "海外観光客、旅行会社、企業団体を対象"],
    ],
    audienceTitle: "どなたに向いているか",
    audiences: [
      ["海外観光客", "一晩のディナーで重慶と巴蜀文化を知る"],
      ["旅行会社・現地DMC", "旅程組み込み、団体見積もり、一括受入に最適"],
      ["企業・ビジネス団体", "宴席、イベント、年会、貸切に対応"],
      ["家族・プライベート記念日", "誕生日、記念日、大切な集まりに"],
    ],
    choose: "体験を選ぶ",
    tiers: [
      ["ゲスト席", "ゲストエリア", "ランチ 238 / ディナー 316", "庭園散策、出迎えの儀、ショー＆宴席を含む", "標準的な観覧席", "この体験を選ぶ"],
      ["VIP席", "VIPエリア", "ランチ 296 / ディナー 458", "庭園散策、出迎えの儀、ショー＆宴席を含む", "より良い観覧席", "この体験を選ぶ"],
      ["SVIP席", "SVIPプレミアムエリア", "ランチ 496 / ディナー 596", "庭園散策、出迎えの儀、ショー＆宴席を含む", "伝統衣装と髪飾り付き", "この体験を選ぶ"],
    ],
    journey: "礼宴巴国の体験の流れ",
    steps: ["庭園散策", "出迎えの儀", "宴席", "ライブショー", "交流体験", "お見送り"],
    stories: [
      ["没入型巴国ショー", "LIVE PERFORMANCE", "光、太鼓、舞、古代の儀式が交差し、巴国の伝説が宴席の間に広がる。中国語がわからなくても、舞台の情緒に没入できる。", "ショーのハイライトを見る"],
      ["儀式に参加する宴席", "DINING & INTERACTION", "出演者の案内で出迎え、席について、杯を掲げ、交流する。四川の宴席が参加型の文化体験になる。", "宴席を予約する"],
      ["漢服を着て東洋文化を知る", "HANFU EXPERIENCE", "漢服に着替え、専門家の案内で衣装、礼儀、宴席文化を知る。東洋の美意識を気軽に体験する。", "漢服体験を知る"],
      ["古代スタイリングで記念写真", "STYLING & PHOTOGRAPHY", "髪型、メイク、衣装を一式コーディネート。カップル、友達、家族で東洋の雰囲気の旅行写真を残す。", "スタイリングを予約"],
    ],
    travelTitle: "旅行会社・団体受付",
    travelSub: "旅行会社、企業イベント、海外観光団、ビジネスホスト向け。最大160名受入、貸切、団体価格、英語メニュー、多言語対応が可能。",
    contactTitle: "礼宴巴国へのアクセス",
    trustTitle: "ゲストの声",
    trustSubtitle: "世界中からのリアルな感想",
    testimonials: [
      ["中国語がわからなくても、俳優の表情や音楽、照明が物語を伝えてくれます。漢服に着替えた体験は旅のハイライトです。", "Sarah M.", "イギリス"],
      ["両親を連れて行きましたが、二人とも完全に没入していました。宴席とサービスが非常にプロフェッショナルで、外国のお客様にもおすすめです。", "Chen さん", "中国香港"],
      ["チームイベントで貸切しました。出迎えから公演まで担当者がついており、スムーズに進行しました。", "Park さん", "韓国"],
    ],
    gallery: "ギャラリー",
    faq: "よくある質問",
    booking: "席予約",
    inquiry: "団体問い合わせ",
    submitBook: "予約を送信",
    submitGroup: "問い合わせを送信",
    success: "お問い合わせを受け付けました。担当者が日程・人数・ご要望を確認のうえ、ご連絡いたします。",
  },
} as const;

const storyImages = ["/sleeve-dance.jpg", "/hero-banquet-cropped.jpg", "/jade-dance.jpg", "/audience-ritual.jpg"];
const factIcons = [Clock, UsersThree, DoorOpen, MapPin];
const baseGalleryGroups = {
  zh: [
    { title: "欧美旅客", en: "European & American Guests", text: "英文引导、视觉叙事与沉浸式晚宴，让第一次来到中国的欧美旅客也能轻松融入巴国之夜。", video: "/videos/gallery-western.mp4", images: ["/images/gallery-western-1.webp", "/images/gallery-western-2.webp", "/images/gallery-western-3.webp", "/images/gallery-western-4.webp"] },
    { title: "港澳台旅客", en: "Hong Kong, Macao & Taiwan Guests", text: "熟悉又新鲜的东方礼宴体验，适合亲友聚会、商务接待与城市文化旅行打卡。", video: "/videos/gallery-hmt.mp4", images: ["/images/gallery-hmt-1.webp", "/images/gallery-hmt-2.webp", "/images/gallery-hmt-3.webp", "/images/gallery-hmt-4.webp"] },
    { title: "日韩旅客", en: "Japanese & Korean Guests", text: "从华服礼仪到宴席互动，近距离感受东方礼制、服饰美学与舞台氛围。", video: "/videos/gallery-jk.mp4", images: ["/images/gallery-jk-1.webp", "/images/gallery-jk-2.webp", "/images/gallery-jk-3.webp", "/images/gallery-jk-4.webp"] },
    { title: "东南亚旅客", en: "Southeast Asian Guests", text: "适合朋友、家庭与团队同行，边看演出边入席互动，轻松拍出热闹又有记忆点的旅行照片。", video: "/videos/gallery-sea.mp4", images: ["/images/gallery-sea-1.webp", "/images/gallery-sea-2.webp", "/images/gallery-sea-3.webp", "/images/gallery-sea-4.webp"] },
  ],
  en: [
    { title: "European & American Guests", en: "欧美旅客", text: "English guidance, visual storytelling and an immersive banquet make it easy for first-time visitors to China to step into the Ba Kingdom night.", video: "/videos/gallery-western.mp4", images: ["/images/gallery-western-1.webp", "/images/gallery-western-2.webp", "/images/gallery-western-3.webp", "/images/gallery-western-4.webp"] },
    { title: "Hong Kong, Macao & Taiwan Guests", en: "港澳台旅客", text: "A familiar yet refreshing Eastern ritual banquet for family gatherings, business hosting and memorable cultural city breaks.", video: "/videos/gallery-hmt.mp4", images: ["/images/gallery-hmt-1.webp", "/images/gallery-hmt-2.webp", "/images/gallery-hmt-3.webp", "/images/gallery-hmt-4.webp"] },
    { title: "Japanese & Korean Guests", en: "日韩旅客", text: "Experience Eastern etiquette, costume aesthetics and theatrical atmosphere up close—from Hanfu rituals to banquet interaction.", video: "/videos/gallery-jk.mp4", images: ["/images/gallery-jk-1.webp", "/images/gallery-jk-2.webp", "/images/gallery-jk-3.webp", "/images/gallery-jk-4.webp"] },
    { title: "Southeast Asian Guests", en: "东南亚旅客", text: "Ideal for friends, families and groups—enjoy the show, join the banquet and capture lively travel moments worth remembering.", video: "/videos/gallery-sea.mp4", images: ["/images/gallery-sea-1.webp", "/images/gallery-sea-2.webp", "/images/gallery-sea-3.webp", "/images/gallery-sea-4.webp"] },
  ],
} as const;
const galleryGroups = { ...baseGalleryGroups, "zh-hant": baseGalleryGroups.zh, ko: baseGalleryGroups.en, ja: baseGalleryGroups.en } as const;
function langPath(locale: Locale): string {
  if (locale === "zh-hant") return "/tw";
  return `/${locale}`;
}
const navSlugs = ["experience", "banquet-menu", "costume-experience", "show-times-prices", "location-booking", "about"];
const mainNavLabels = {
  zh: ["体验概览", "演艺美馔", "华服体验", "场次票价", "到访指引", "品牌故事"],
  "zh-hant": ["體驗概覽", "演藝美饌", "華服體驗", "場次票價", "到訪指引", "品牌故事"],
  en: ["Experience", "Banquet", "Costume", "Tickets", "Plan Your Visit", "About"],
  ja: ["体験", "宴と料理", "衣装体験", "公演・料金", "アクセス", "私たちについて"],
  ko: ["체험", "연회와 요리", "의상 체험", "공연·요금", "방문 안내", "브랜드 소개"],
} as const;
const baseFaqs = {
  zh: [
    ["完整体验需要多久？", "餐秀约 110 分钟，团队活动可根据行程与接待需求提前协调。"],
    ["是否适合外国游客？", "适合。体验以舞台、礼仪、美食与互动为主，即使不懂中文也能感受内容。"],
    ["是否支持英文菜单或英文接待？", "可提前沟通英文菜单与语言接待需求，团队请在询价时注明。"],
    ["是否支持旅行社团队？", "支持旅行社、地接社、海外游客团及企业团队，并可提供团队报价。"],
    ["最多可以接待多少人？", "场地最多可接待约 160 人，具体座位与场次以确认结果为准。"],
    ["是否可以包场？", "支持包场及定制活动，请尽早提交团队需求。"],
    ["是否支持儿童、素食、清真或过敏备注？", "儿童及饮食需求请在预约时备注，团队会根据实际情况回复确认。"],
    ["如何预约？", "个人宾客可提交席位预约表单；旅行社、企业或多人团队请使用团队咨询表单。"],
    ["取消或改期规则是什么？", "具体规则将在确认档期与套餐时说明，改期请尽早联系工作人员。"],
    ["地址在哪里，如何到达？", "位于中国重庆九龙坡区巴国城，页面底部提供 Google Maps 与百度地图入口。"],
  ],
  en: [
    ["How long is the full experience?", "The banquet show lasts approximately 110 minutes. Group schedules can be coordinated in advance."],
    ["Is it suitable for international visitors?", "Yes. The experience is highly visual, combining performance, ritual, food and guest interaction."],
    ["Are English menus and English-speaking support available?", "English menus and language support can be arranged in advance. Please mention this in your enquiry."],
    ["Do you work with travel agencies?", "Yes. We welcome travel agencies, DMCs, international tour groups and corporate organisers."],
    ["What is the maximum group size?", "The venue can host up to approximately 160 guests, subject to layout and schedule confirmation."],
    ["Can the venue be booked privately?", "Yes. Private buyouts and customised events are available by advance enquiry."],
    ["Can you accommodate children or dietary needs?", "Please add child, vegetarian, halal or allergy requirements when booking so the team can confirm options."],
    ["How do I make a reservation?", "Use Guest Booking for individual visits, or Group Inquiry for agencies, companies and larger parties."],
    ["What is the cancellation or rescheduling policy?", "The applicable policy will be shared when your date and package are confirmed."],
    ["Where are you located?", "We are in Baguocheng, Jiulongpo District, Chongqing. Map links are available at the bottom of the page."],
  ],
};
const faqs = { ...baseFaqs, "zh-hant": baseFaqs.zh, ko: baseFaqs.en, ja: baseFaqs.en };

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const navLabels = mainNavLabels[locale];
  const practicalFacts = locale === "en"
    ? [["Location", "Chongqing · Baguocheng"], ["Duration", "Approx. 110 minutes"], ["Includes", "Banquet · Live show"], ["Languages", "English support on request"]]
    : [["地点", "重庆 · 巴国城"], ["时长", "餐秀约 110 分钟"], ["包含", "巴渝宴席 · 沉浸演出"], ["语言", "可提前咨询英文支持"]];
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const [galleryPhotoOffset, setGalleryPhotoOffset] = useState(0);
  const [bookingMode, setBookingMode] = useState<"guest" | "group">("guest");
  const [notice, setNotice] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [trailerOpen, setTrailerOpen] = useState(false);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => {
    setGalleryPhotoOffset(0);
    const timer = window.setInterval(() => setGalleryPhotoOffset((current) => (current + 1) % 4), 4000);
    return () => window.clearInterval(timer);
  }, [activeGallery]);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitStatus("loading");
    setNotice("");
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    data.form_type = form.dataset.formType || "guest-booking";

    const typeLabel = data.form_type === "guest-booking"
      ? (locale === "zh" || locale === "zh-hant" ? "席位预约" : locale === "ko" ? "좌석 예약" : locale === "ja" ? "ご予約" : "Guest Booking")
      : (locale === "zh" || locale === "zh-hant" ? "团队咨询" : locale === "ko" ? "단체 문의" : locale === "ja" ? "団体お問い合わせ" : "Group Inquiry");
    const contactName = data.name || data.contact || data.company || "";
    const subject = `${typeLabel} — ${contactName || "Liyan Baguo website"}`;
    const lines = Object.entries(data)
      .filter(([key]) => key !== "form_type")
      .map(([key, value]) => {
        const displayKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
        return `${displayKey}: ${value || "—"}`;
      });
    const body = lines.join("\n");
    const mailto = `mailto:liaorenxi23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = mailto;
      setSubmitStatus("success");
      setNotice(t.success);
      form.reset();
    } catch {
      setSubmitStatus("error");
      setNotice(locale === "zh" ? "提交未成功，请稍后重试，或通过电话、邮件与 WeChat Support 联系。" : locale === "zh-hant" ? "提交未成功，請稍後重試。" : locale === "ko" ? "제출하지 못했습니다. 다시 시도하거나 다른 연락처로 문의해 주세요." : locale === "ja" ? "送信に失敗しました。時間をおいて再度お試しください。" : "Submission failed. Please retry or contact us by phone, email or WeChat Support.");
    }
  };

  return (
    <main className="home-page">
      <header className="site-header">
        <Link className="wordmark" href={`${langPath(locale)}/`}><strong>礼宴巴国</strong><span>LIYAN BAGUO</span></Link>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {navLabels.map((item, index) => <Link key={item} href={`${langPath(locale)}/${navSlugs[index]}/`} onClick={() => setMenuOpen(false)}>{item}</Link>)}
        </nav>
        <div className="header-actions">
          <nav className="language-switcher" aria-label="Language">
            <Link className={locale === "zh" ? "active" : ""} href="/zh">简</Link>
            <Link className={locale === "zh-hant" ? "active" : ""} href="/tw">繁</Link>
            <Link className={locale === "en" ? "active" : ""} href="/en">EN</Link>
            <Link className={locale === "ja" ? "active" : ""} href="/ja">日</Link>
            <Link className={locale === "ko" ? "active" : ""} href="/ko">KR</Link>
          </nav>
          <a className="button compact" href="#booking">{t.book}</a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X /> : <List />}
          </button>
        </div>
      </header>

      <section className="hero">
        <h1 className="sr-only">{t.heroTitle}</h1>
        <div className="hero-media">
          <video autoPlay muted loop playsInline preload="metadata" poster="/hero-banquet-cropped.jpg" aria-label={locale === "zh" ? "礼宴巴国沉浸式文化餐秀" : "Liyan Baguo immersive cultural banquet show"}>
            <source src="/videos/hero-banquet.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">BA KINGDOM BANQUET</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-tagline">{t.heroTagline}</p>
          <p className="hero-sub">{t.heroSub}</p>
          <div className="button-row">
            <a className="button" href="#booking">{t.book}</a>
            <a className="button secondary" href="#booking">{t.group}</a>
            <button type="button" className="button ghost" onClick={() => setTrailerOpen(true)}>
              <Play weight="fill" /> {t.watchTrailer}
            </button>
          </div>
        </div>
        <TrailerModal isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} />
      </section>

      <section className="fact-bar">
        {practicalFacts.map(([label, fact], index) => {
          const Icon = factIcons[index];
          return <div key={label}><Icon size={28} weight="thin" /><span><small>{label}</small>{fact}</span></div>;
        })}
      </section>

      <section className="journey" id="experience">
        <p className="eyebrow">THE EXPERIENCE</p><h2>{t.journey}</h2>
        <div className="step-grid">
          {t.steps.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><i /><strong>{step}</strong></div>)}
        </div>
      </section>

      <section className="stories">
        {t.stories.slice(0, 3).map(([title, kicker, text, tag], index) => (
          <article className={index % 2 ? "story reverse" : "story"} key={title}>
            <div className="story-copy"><span>0{index + 1}</span><small>{kicker}</small><h2>{title}</h2><p>{text}</p><Link className="story-cta" href={`${langPath(locale)}/${["experience","banquet-menu","costume-experience","show-times-prices"][index]}/`}>{tag} <ArrowRight /></Link></div>
            <div className="story-media"><Image src={storyImages[index]} alt={locale === "zh" ? `${title}现场` : `${title} at Liyan Baguo`} fill sizes="(max-width: 800px) 100vw, 60vw" /></div>
          </article>
        ))}
      </section>

      <section className="home-practical-grid">
        <article><p className="eyebrow">SHOW TIMES & PRICES</p><h2>{locale === "zh" ? "先选场次，再选席位" : "Choose a session and seat"}</h2><p>{locale === "zh" ? "午宴与晚宴均包含游园、迎宾、宴席与演出。":"Lunch and dinner sessions combine the garden, welcome ritual, banquet and show."}</p><Link className="button secondary" href={`${langPath(locale)}/show-times-prices/`}>{locale === "zh" ? "查看场次与席位" : "View tickets"}</Link></article>
        <article><p className="eyebrow">LOCATION</p><h2>{locale === "zh" ? "重庆 · 巴国城" : "Baguocheng · Chongqing"}</h2><p>{locale === "zh" ? "查看中英文地址、地图导航和到场方式。":"Get the address, maps and arrival information."}</p><Link className="button secondary" href={`${langPath(locale)}/location-booking/`}>{locale === "zh" ? "查看到访指引" : "Plan your visit"}</Link></article>
      </section>

      <section className="section gallery" id="gallery">
        <div className="gallery-heading">
          <div><p className="eyebrow">GALLERY</p><h2>{t.gallery}</h2></div>
          <div className="gallery-controls">
            <div className="gallery-tabs" role="tablist" aria-label={locale === "zh" ? "旅客分类" : "Guest categories"}>
              {galleryGroups[locale].map((group, index) => <button type="button" role="tab" aria-selected={activeGallery === index} className={activeGallery === index ? "active" : ""} onClick={() => setActiveGallery(index)} key={group.title}><span>{group.title}</span><small>{group.en}</small></button>)}
            </div>
            <p className="gallery-description">{galleryGroups[locale][activeGallery].text}</p>
          </div>
        </div>
        <div className="gallery-showcase">
          <figure className="gallery-video">
            <video key={galleryGroups[locale][activeGallery].video} autoPlay muted loop playsInline preload="metadata" poster={galleryGroups[locale][activeGallery].images[0]}><source src={galleryGroups[locale][activeGallery].video} type="video/mp4" /></video>
            <figcaption>{galleryGroups[locale][activeGallery].title}</figcaption>
          </figure>
          <div className="gallery-photos">
            {[...galleryGroups[locale][activeGallery].images.slice(galleryPhotoOffset), ...galleryGroups[locale][activeGallery].images.slice(0, galleryPhotoOffset)].slice(0, 3).map((src, index) => <figure key={src}><Image src={src} alt={`${galleryGroups[locale][activeGallery].title} ${index + 1}`} fill sizes={index === 0 ? "(max-width: 980px) 100vw, 64vw" : "(max-width: 700px) 50vw, 21vw"} /></figure>)}
          </div>
        </div>
      </section>

      <section className="section trust-section" id="trust">
        <div className="trust-heading">
          <p className="eyebrow">GUEST LOVE</p>
          <h2>{t.trustTitle}</h2>
          <p className="trust-subtitle">{t.trustSubtitle}</p>
        </div>
        <div className="trust-grid">
          {t.testimonials.map(([quote, author, location]) => (
            <blockquote key={author} className="trust-card">
              <div className="trust-stars" aria-hidden="true"><Star weight="fill" /><Star weight="fill" /><Star weight="fill" /><Star weight="fill" /><Star weight="fill" /></div>
              <Quotes weight="fill" className="trust-quote-icon" />
              <p>{quote}</p>
              <footer><strong>{author}</strong><span>{location}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section conversion" id="booking">
        <div className="service-booking-panel">
          <div className="service-booking-copy">
            <p className="eyebrow">ONLINE RESERVATIONS</p>
            <h2>{locale === "zh" ? "通过在线客服咨询与预约" : locale === "zh-hant" ? "透過線上客服諮詢與預訂" : "Reserve with Online Support"}</h2>
            <p>{locale === "zh" ? "请选择常用的联系方式，客服将协助确认场次、席位、团队接待与其他需求。" : locale === "zh-hant" ? "請選擇常用的聯絡方式，客服將協助確認場次、席位、團隊接待與其他需求。" : "Choose your preferred channel. Our team will help confirm sessions, seating, group visits and other requests."}</p>
          </div>
          <div className="service-booking-actions">
            <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer"><ChatCircleDots />WhatsApp <small>{whatsappId}</small></a>
            <a className="button secondary" href={customerServiceUrl} target="_blank" rel="noreferrer"><ChatCircleDots />WeChat Support</a>
          </div>
        </div>
        <div className="booking-tabs" role="tablist"><button type="button" role="tab" aria-selected={bookingMode === "guest"} className={bookingMode === "guest" ? "active" : ""} onClick={() => setBookingMode("guest")}>{t.booking}</button><button type="button" role="tab" aria-selected={bookingMode === "group"} className={bookingMode === "group" ? "active" : ""} onClick={() => setBookingMode("group")}>{t.inquiry}</button></div>
        <form className={bookingMode === "guest" ? "mobile-form-active" : ""} onSubmit={submit} id="guest-form" data-form-type="guest-booking"><p className="eyebrow">SEAT RESERVATION</p><h2>{t.booking}</h2><div className="form-grid"><input name="name" required aria-label={locale === "zh" ? "姓名" : "Name"} placeholder={locale === "zh" ? "姓名" : "Name"} /><input name="phone" required aria-label="Phone / WhatsApp" placeholder={locale === "zh" ? "手机 / WhatsApp" : "Phone / WhatsApp"} /><input name="email" required type="email" aria-label={locale === "zh" ? "邮箱" : "Email"} placeholder={locale === "zh" ? "邮箱" : "Email"} /><input name="country" aria-label={locale === "zh" ? "国家或地区" : "Country or region"} placeholder={locale === "zh" ? "国家 / 地区" : "Country / Region"} /><label className="picker-field"><span>{locale === "zh" ? "预约日期" : "Booking Date"}</span><input name="date" required type="date" aria-label={locale === "zh" ? "预约日期" : "Booking date"} onClick={(event) => event.currentTarget.showPicker()} /></label><select name="mealPeriod" required aria-label={locale === "zh" ? "宴席时段" : "Banquet session"} defaultValue=""><option value="" disabled>{locale === "zh" ? "选择午宴或晚宴" : "Choose Lunch or Dinner"}</option><option value="lunch">{locale === "zh" ? "午宴" : "Lunch"}</option><option value="dinner">{locale === "zh" ? "晚宴" : "Dinner"}</option></select><input name="guests" required type="number" min="1" max="160" aria-label={locale === "zh" ? "人数" : "Guests"} placeholder={locale === "zh" ? "人数" : "Guests"} /><select name="package" required aria-label={locale === "zh" ? "套餐类型" : "Package"} defaultValue=""><option value="" disabled>{locale === "zh" ? "套餐类型" : "Package"}</option><option>{locale === "zh" ? "嘉宾体验" : "Guest"}</option><option>{locale === "zh" ? "贵宾体验" : "VIP"}</option><option>SVIP</option></select><textarea name="notes" className="full-field" aria-label={locale === "zh" ? "忌口、过敏或备注" : "Dietary needs or notes"} placeholder={locale === "zh" ? "忌口 / 过敏 / 备注" : "Dietary needs / Allergies / Notes"} /></div><button className="button" type="submit" disabled={submitStatus === "loading"}>{submitStatus === "loading" ? (locale === "zh" ? "正在提交…" : "Submitting…") : t.submitBook}</button></form>
        <form className={bookingMode === "group" ? "mobile-form-active" : ""} onSubmit={submit} id="group-form" data-form-type="group-inquiry"><p className="eyebrow">GROUP INQUIRY</p><h2>{t.inquiry}</h2><div className="form-grid"><input name="company" required aria-label={locale === "zh" ? "旅行社或公司名称" : "Agency or company"} placeholder={locale === "zh" ? "公司 / 旅行社名称" : "Company / Travel Agency"} /><input name="contact" required aria-label={locale === "zh" ? "联系人" : "Contact name"} placeholder={locale === "zh" ? "联系人" : "Contact Name"} /><input name="phone" required aria-label="Phone / WhatsApp" placeholder={locale === "zh" ? "手机 / WhatsApp" : "Phone / WhatsApp"} /><input name="email" required type="email" aria-label={locale === "zh" ? "邮箱" : "Email"} placeholder={locale === "zh" ? "邮箱" : "Email"} /><input name="country" aria-label={locale === "zh" ? "国家或地区" : "Country or region"} placeholder={locale === "zh" ? "国家 / 地区" : "Country / Region"} /><label className="picker-field"><span>{locale === "zh" ? "预计日期" : "Estimated Date"}</span><input name="date" required type="date" aria-label={locale === "zh" ? "预计日期" : "Estimated date"} onClick={(event) => event.currentTarget.showPicker()} /></label><input name="guests" required type="number" min="1" max="160" aria-label={locale === "zh" ? "预计人数" : "Estimated guests"} placeholder={locale === "zh" ? "预计人数" : "Estimated Guests"} /><select name="eventType" required aria-label={locale === "zh" ? "活动类型" : "Event type"} defaultValue=""><option value="" disabled>{locale === "zh" ? "活动类型" : "Event Type"}</option><option>{locale === "zh" ? "旅行团" : "Tour Group"}</option><option>{locale === "zh" ? "商务宴请" : "Business Dinner"}</option><option>{locale === "zh" ? "企业活动" : "Corporate Event"}</option><option>{locale === "zh" ? "海外游客团" : "International Group"}</option><option>{locale === "zh" ? "其他" : "Other"}</option></select><select name="privateBuyout" aria-label={locale === "zh" ? "是否需要包场" : "Private buyout"} defaultValue=""><option value="" disabled>{locale === "zh" ? "是否需要包场" : "Private Buyout?"}</option><option>{locale === "zh" ? "需要" : "Yes"}</option><option>{locale === "zh" ? "不需要" : "No"}</option><option>{locale === "zh" ? "待确认" : "Not Sure"}</option></select><input name="budget" aria-label={locale === "zh" ? "预算范围" : "Budget range"} placeholder={locale === "zh" ? "预算范围" : "Budget Range"} /><textarea name="requirements" className="full-field" aria-label={locale === "zh" ? "活动需求" : "Event requirements"} placeholder={locale === "zh" ? "需求描述" : "Requirements"} /></div><button className="button" type="submit" disabled={submitStatus === "loading"}>{submitStatus === "loading" ? (locale === "zh" ? "正在提交…" : "Submitting…") : t.submitGroup}</button></form>
        {notice && <p className={`notice ${submitStatus}`} role="status">{notice}</p>}
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-intro"><p className="eyebrow">CONTACT & LOCATION</p><h2>{t.contactTitle}</h2><div className="contact-meta"><p><MapPin /><span>{locale === "zh" ? "中国重庆九龙坡区巴国城" : "Baguocheng, Jiulongpo District, Chongqing, China"}</span></p><p><Clock /><span>{locale === "zh" ? "每日 10:00 - 21:00" : "Daily, 10:00–21:00"}</span></p></div><nav className="map-links"><a href="https://maps.app.goo.gl/ZddotMySGkJYsjFh7" target="_blank" rel="noreferrer">Google Maps <ArrowRight /></a><a href="https://j.map.baidu.com/76/_1tc" target="_blank" rel="noreferrer">{locale === "zh" ? "百度地图" : "Baidu Maps"} <ArrowRight /></a></nav></div>
        <div className="contact-panel">
          <div className="contact-list">
            <a href="tel:+8617383017612"><Phone />{locale === "zh" ? "电话：+86 173 8301 7612" : "Phone: +86 173 8301 7612"}</a>
            <a href="mailto:liaorenxi23@gmail.com"><EnvelopeSimple />Email: liaorenxi23@gmail.com</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><ChatCircleDots />WhatsApp: {whatsappId}</a>
            <a href={customerServiceUrl} target="_blank" rel="noreferrer"><ChatCircleDots />WeChat Support</a>
          </div>
          <div className="contact-actions">
            <a className="button" href="#booking">{t.book}</a>
            <a className="button secondary" href="#booking">{t.group}</a>
          </div>
        </div>
      </section>

      <footer id="about"><div className="brand-logo footer-logo"><Image src="/brand-logo.png" alt="礼宴巴国 Liyan Baguo" width={1540} height={539} /></div><p>{locale === "zh" ? "重庆沉浸式巴蜀文化餐秀" : "An immersive Bashu banquet experience in Chongqing"}</p><div><Link href={`${langPath(locale)}/about/`}>{t.nav[4]}</Link><Link href={`${langPath(locale)}/faq/`}>FAQ</Link></div></footer>
      <div className="mobile-cta" aria-label={locale === "zh" ? "快捷联系" : "Quick contact"}><a href="#booking" className="primary">{t.book}</a><CustomerServiceChooser compact isEnglish={locale === "en"} /><a href="tel:+8617383017612">{locale === "zh" ? "电话" : "Call"}</a></div>
    </main>
  );
}
