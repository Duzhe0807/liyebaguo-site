# 礼宴巴国海外 SEO 执行与运营交付
日期：2026-09-06。范围：gongyanshow.com 正式展示站。各平台文案为交付草稿，未登录或修改 Google Business、Trip.com、Klook 或社交账号。

## 品牌与首页
- 正式品牌：Liyan Baguo；中文：礼宴巴国。
- 国际体验名称：Banquet of Ba Kingdom。
- 首页 Title：Liyan Baguo | Banquet of Ba Kingdom in Chongqing
- 首页 Description：Experience Liyan Baguo, Chongqing's immersive Banquet of Ba Kingdom, with traditional cuisine, live performances and costumes. Plan your visit and book.
- 首页 H1：Banquet of Ba Kingdom Chongqing Immersive Dinner Show（两行，只有一个 H1）。
- 主要 CTA：Book Your Experience，进入官方客服预约区。
- 次 CTA：Explore the Banquet，进入产品专题页。
- 完整英文首页正文、H2/H3、各页面实际 Title/Description/H1 和 Schema 见同目录 ENGLISH-CONTENT-INVENTORY.md。

## 页面、关键词与意图
采用现有 /en/ 语言前缀。Brief 中无语言前缀的五个 slug 对应 /en/ 下的新页面；不另建一套相同内容的无前缀页面。

| URL | 核心关键词 | 搜索意图 |
| --- | --- | --- |
| /en/ | Liyan Baguo; Banquet of Ba Kingdom; Chongqing | 品牌总入口与体验概览 |
| /en/banquet-of-ba-kingdom/ | Banquet of Ba Kingdom; Ba Kingdom Banquet | 理解具体产品包含什么 |
| /en/chongqing-palace-banquet/ | Chongqing Palace Banquet; Chinese Palace Banquet Chongqing | 宫宴形式、接待场景与套餐决策 |
| /en/chongqing-dinner-show/ | Chongqing Dinner Show; Chongqing evening activities | 餐秀体验与午晚宴行程安排 |
| /en/chongqing-hanfu-experience/ | Chongqing Hanfu Experience; Chinese costume experience | 服装参与方式、准备时间与包含项目 |
| /en/ba-yu-culture/ | Ba-Yu culture; Bayu culture; Chongqing culture | 地域文化与项目的关联 |
| /en/experience/ | Liyan Baguo visitor journey; banquet experience | 具体到访流程 |
| /en/banquet-menu/ | Chongqing banquet menu; Liyan Baguo menu | 菜品与饮食需求 |
| /en/costume-experience/ | Liyan Baguo costume packages; SVIP costume | 服装配套的具体操作说明 |
| /en/show-times-prices/ | Chongqing dinner show tickets; Liyan Baguo prices | 场次、票价、座位与购买前决策 |
| /en/location-booking/ | Liyan Baguo location; directions; booking | 导航和联系 |
| /en/faq/ | Liyan Baguo FAQ; Banquet of Ba Kingdom questions | 解决预订前疑问 |
| /en/about/ | About Liyan Baguo | 品牌身份与创作方式 |

专题页介绍类别；现有详情页回答具体服务与操作，避免复制正文或只替换关键词。

## 内部链接
首页 → 五个专题；产品、宫宴和餐秀专题 → 体验 / 场次票价 / 地址预约。
华服专题 → 具体服装服务 / SVIP 票种 / 客服。
文化专题 → 品牌故事 / 菜单 / 宫宴专题。
每个专题有横向推荐与预约 CTA。FAQ 从首页和详情导航均可到达。
英文独有专题切换到其他语言时，进入该语言的体验概览；不声明不存在的翻译页为 hreflang。

## 技术修复清单
- 首页原有两个 H1，改为一个可见 H1。
- 原始 HTML 的 lang 从统一 zh-CN 改为构建时按语言输出。
- 现有 40 个语言页面均保留自引用 canonical，互相声明语言版本，并添加对应英文页面为 x-default。
- 五个英文专题独立 canonical，不复制到未翻译语言。
- 新网站地图通过路由数据构建，包含 45 个公开内容页面；不伪造 lastmod。
- 所有内容页使用真实存在的分享图片，统一 Open Graph / Twitter 卡片及品牌名。
- 修复原 Schema 图片不存在、品牌实体名称不统一的问题。
- 删去 Schema 内缺乏核验依据的坐标和经营时段，不将例行场次伪造成有具体日期的 Event。
- 首页与详情 FAQ 使用同一份可见问答生成结构化数据。
- Breadcrumb 的每级均给出页面 URL；JSON-LD 转义小于号。
- 新英文长文案适配手机首屏和详情页，处理固定高度遮挡及标题不换行。
- 未核验评论不再以真实评价、五星展示；待加入可追溯评价后再发布。
- 邮件表单明确告知需要在邮件应用中发送，不再声称打开邮件应用就代表服务器收到咨询。
- 现有真实票价保留；英文标明 CNY、每人计价，购买后需联系客服安排座位号。

## 结构化数据与数据边界
Organization：Liyan Baguo 为主名；中文和旧拼写放 alternateName；主域下固定 @id。
LocalBusiness / TouristAttraction：关联品牌组织，使用现有巴国城地址、电话和图片。Google Maps 链接使用 hasMap，不随意声明第三方产品为同一实体。
WebSite：首页描述网站实体与语言。
WebPage：五个新专题的名称、简介、语言、归属实体。
Service：产品专题描述 Banquet of Ba Kingdom 服务。没有伪造库存、评分或评论。
FAQPage：仅收录页面实际显示的问答。
BreadcrumbList：详情页与专题页显示路径对应。
Product / Event / Offer：本次不强行添加。正式站仍以客服确认日期和套餐，没有逐场日期、库存和可独立核验的购票页面。以后接入真实售票数据后，按每场唯一 URL 输出 Event、带时区日期、实时 Offer 和取消状态。

## FAQ 覆盖
英文首页与 FAQ 覆盖品牌是什么、产品是什么、110 分钟时长、午晚宴到场时间、是否含餐、英语游客、家庭、线上预约、服装、菜品、地址交通、提前预约、团队咨询。问答原文见内容清单。
午宴：游园 11:30–12:10，餐秀 12:30–约14:20。
晚宴：游园 18:00–18:40，餐秀 19:00–约20:50。
均为重庆时间 UTC+8，场次以指定日期确认结果为准。

## 图片优化与后续素材
已有 sleeve-dance.jpg、audience-ritual.jpg 等描述性文件名保留，不为改名制造重复图片。
Alt 描述照片实际内容和地点；舞台服装不暗示一定可供客人租借。不同图片使用不同描述。
新素材推荐：liyan-baguo-chongqing-banquet-hall.webp、banquet-of-ba-kingdom-welcome-ceremony.webp、liyan-baguo-traditional-costume-guests.webp。
上传需确认图片授权、拍摄内容和客人肖像许可；保持主体清晰并给出宽高，正文图延迟加载。
白色透明品牌图不适合作为所有社交分享主图，当前改用宴席现场实拍。

## 30 个内容选题
以下为选题，不是已发布文章；地理交通、历史、排名和第三方场馆开放信息需写作时查证，不批量生成无依据的“最佳”榜单。

1. What Is the Banquet of Ba Kingdom? → 产品页
2. A First-Time Visitor's Guide to Liyan Baguo → 体验流程
3. Lunch or Dinner? Choosing Your Liyan Baguo Session → 票价页
4. What to Expect at a Chongqing Cultural Dinner Show → 餐秀专题
5. Palace-Style Banquets Explained for International Visitors → 宫宴专题
6. Planning a Family Cultural Outing in Chongqing → FAQ / 餐秀
7. How to Book Liyan Baguo from Overseas → 预约
8. Guest, VIP and SVIP: Understanding the Inclusions → 票价
9. What to Wear to a Cultural Banquet in Chongqing → 华服
10. Preparing for Your First Hanfu Experience → 华服
11. Costume, Headwear and Styling: Questions to Ask Before Booking → 华服详情
12. Photographing Your Chongqing Banquet Visit Respectfully → 华服 / FAQ
13. A Guide to Dietary Requests at Liyan Baguo → 菜单
14. Sichuan and Chongqing Flavours: A Visitor's Introduction → 菜单，饮食史核验
15. How Food and Performance Work Together at a Dinner Show → 餐秀
16. What Does Ba-Yu Culture Mean? → 文化专题，历史核验
17. Ba, Shu and Chongqing: Understanding the Names → 文化专题，史料核验
18. The Ancient Ba Kingdom: A Reading Guide for Travellers → 文化专题，博物馆/学术史料
19. Music, Dance and Ceremony at Liyan Baguo → 体验
20. Contemporary Cultural Shows and Historical Reenactments → 文化专题
21. Planning Evening Activities in Chongqing with Children → 餐秀，地点核验
22. Cultural Experiences to Include in a Chongqing Trip → 文化 / 产品，比较来源核验
23. A Chongqing Cultural Day: Planning Around a Lunch Banquet → 午宴
24. Building a Chongqing Evening Around a Dinner Show → 晚宴
25. How to Get to Baguocheng for Your Banquet Visit → 地址，动态路线核验
26. Chongqing in Two Days: Adding a Cultural Meal to Your Plan → 餐秀，行程核验
27. Chongqing in Three Days: Food, Culture and Performance → 产品，行程核验
28. Planning a Travel Agency Group Visit to Liyan Baguo → 团队咨询
29. Questions to Ask When Booking a Private Cultural Banquet → 宫宴 / 团队
30. A Practical Chongqing Travel Checklist for First-Time Visitors → 地址 / FAQ，支付交通核验

## Google Business Profile
建议真实名称：Liyan Baguo 礼宴巴国，需与招牌和商家资料一致。
英文介绍：
Liyan Baguo presents the Banquet of Ba Kingdom, an immersive cultural dining experience in Chongqing, China. Located in Baguocheng, Jiulongpo District, the experience brings together regional cuisine, live performances, ceremonial hospitality and traditional Chinese costume options. Lunch and dinner sessions are available for travellers, families and groups. Contact the official team to confirm session availability, package inclusions, dietary requests and seating arrangements before your visit.
发布前核对地址、地图坐标、营业时间、联系电话、商家所有权及该地区平台支持情况。

## Trip.com
标题：Chongqing Banquet of Ba Kingdom – Palace Banquet & Dinner Show
介绍：
Discover Liyan Baguo's Banquet of Ba Kingdom in Chongqing. Enjoy a regional meal with live performance and ceremonial interaction, with lunch and dinner sessions available. Compare Guest, VIP and SVIP ticket inclusions, and ask about traditional costume options. The banquet show lasts approximately 110 minutes; allow extra time for garden activities and preparation. Confirm your selected date, dietary needs and seat arrangements before visiting.
上架时另列每个 SKU 的包含/不含项目、儿童条件、日期、退改规则、兑票流程与 CNY 价格，保持官网一致。

## Klook
标题：Liyan Baguo: Chongqing Banquet of Ba Kingdom
介绍：
Make a cultural meal part of your Chongqing trip at Liyan Baguo. The Banquet of Ba Kingdom combines regional cuisine, music, dance and ceremonial hospitality in Baguocheng. Choose lunch or dinner and the ticket category that suits your visit. Selected packages include traditional costume and headwear. Share any language or dietary requirements before booking, and contact the team after purchase to arrange your seat number.
不要把所有票种描述成含妆造或专业摄影；上架前核对平台格式及退改展示。

## 社交简介
Instagram Name：Liyan Baguo | Banquet of Ba Kingdom
Instagram Bio：
Chongqing palace banquet & cultural dinner show.
Cuisine · Live performance · Costume options
Lunch & dinner. Plan your visit ↓

TikTok Bio：
Banquet of Ba Kingdom, Chongqing. Food, live show & costume. Book below.
平台字数限制以实际编辑器为准。

YouTube Channel Description：
Welcome to Liyan Baguo, home of the Banquet of Ba Kingdom in Chongqing, China. Discover regional cuisine, live cultural performances, ceremonial hospitality and traditional Chinese costume experiences. Explore the banquet setting, learn how to plan a lunch or dinner visit, and find information for international travellers, families and private groups. Visit our official website for current session times, ticket inclusions, directions and booking contacts.
所有社交链接先使用 https://gongyanshow.com/en/#booking，分析参数可在实际运营时统一增加。

## Linktree / Link-in-bio
标题：Liyan Baguo
说明：Banquet of Ba Kingdom · Chongqing
1. Book the Banquet → https://gongyanshow.com/en/#booking
2. Official Website → https://gongyanshow.com/en/
3. Experience & Show → https://gongyanshow.com/en/experience/
4. Menu & Dining Experience → https://gongyanshow.com/en/banquet-menu/
5. Costume Experience → https://gongyanshow.com/en/chongqing-hanfu-experience/
6. Location & Directions → https://gongyanshow.com/en/location-booking/
7. Trip.com → 待提供正式产品链接
8. Klook → 待提供正式产品链接
9. Contact Us → https://gongyanshow.com/en/#contact
10. Instagram / TikTok / YouTube → 待提供正式账号链接
当前不添加“Book & Pay Securely”或 Stripe 支付按钮，因为正式展示站没有在本次工作中验证可直接支付的流程。

## 上线后的运营动作
本地验证：生产构建和 TypeScript 检查通过。45 个内容页没有重复 Title，每页一个 H1；canonical、语言标签、hreflang 目标和可见 FAQ 一致性通过检查。网站地图包含45页。英文13页完成390px与1440px共26种布局检查；另检查320px专题页。验证了专题转韩语、预约锚点和FAQ展开。仓库没有配置 lint 命令，因此不声称 lint 已通过。

1. 在已验证所有权的 Google Search Console 提交 https://gongyanshow.com/sitemap.xml，检查英文首页和五个新专题。网站上线不等于 Google 已收录。
2. 按品牌词、宫宴词、餐秀词、华服词分别观察英文页面展示、点击、CTR 和转化，不用固定排名承诺。
3. 确认正式 Google Maps 地点、完整地址/门牌、营业时段，之后再补充准确坐标及 openingHours。
4. 提供真实且获授权的评价原文、来源网址和图片；确认后才加入评价区。
5. 提供 OTA 和社交账号正式网址，核验属于同一官方实体后再加 sameAs。
6. 退改规则需统一所有渠道；“选座后24小时”究竟以演出开始还是选座确认时刻为参照，需给出明确口径，避免英文误译。
7. 逐步把高质量选题写成有来源、有实际帮助的指南。未核验历史、旅行时间、签证、支付方式不写成确定事实。
8. 以后上线售票系统时，交易页/订单页/后台另行检查索引策略；不能仅靠 robots.txt 保护私密信息。

## AI / GEO 与来源
优先保证公开 HTML 可读、名称明确、事实一致、主题页有具体答案和有用内部链接。不要声称某个文件或 Schema 可以保证被 ChatGPT、Google AI 或其他平台推荐。
本轮不新增 llms.txt；Google Search 的 AI 功能仍以基本 SEO、可抓取内容及内容质量为基础。
FAQ 数据用于清晰表达可见问答，不承诺旅游网站获得 FAQ 富结果。
正式有日期的场次页建立后再使用 Event，并维护取消和改期状态。

参考：
- Google 多语言与 hreflang：https://developers.google.com/search/docs/specialty/international/localized-versions
- Canonical：https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- AI 搜索优化：https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- 结构化数据规范：https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Event：https://developers.google.com/search/docs/appearance/structured-data/event
- FAQ 展示范围：https://developers.google.com/search/blog/2023/08/howto-faq-changes
