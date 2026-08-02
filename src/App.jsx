import { useEffect, useRef, useState } from 'react'

const categories = ['品牌设计', 'UI设计', 'IP设计', '活动市集', '文创周边', '其他']

const optimizedImagePath = (source) => `/optimized${source.replace(/\.(?:jpe?g|png)$/i, '.webp')}`

const projects = [
  {
    title: 'PICPALS 匹克球',
    category: '品牌设计',
    image: '/images/picpals-original.jpg',
    href: '#/project/picpals',
    position: 'center',
    layout: 'project-a',
  },
  {
    title: '小满志',
    category: '品牌设计',
    image: '/images/xiaomanzhi-original.jpg',
    href: '#/project/xiaomanzhi',
    position: 'center',
    layout: 'project-b',
  },
  {
    title: '汇小牛',
    category: 'IP设计',
    image: '/projects/huixiaoniu/pages/page-01.jpg',
    href: '#/project/huixiaoniu',
    position: 'center',
    layout: 'project-c',
  },
  {
    title: '暖新巢',
    category: 'IP设计',
    image: '/images/nuanxin-ip-main.jpg',
    href: '#/project/nuanxin-ip',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '海瑞麟 Harry Lin',
    category: 'IP设计',
    image: '/images/ocean-ip-main.jpg',
    href: '#/project/hairuilin',
    position: 'center',
    secondaryOnly: true,
    liftInGrid: true,
  },
  {
    title: '暖新云巢',
    category: 'UI设计',
    image: '/images/ui-nuanxin-main.png',
    href: '#/project/nuanxin-cloud',
    position: 'center',
    layout: 'project-d',
  },
  {
    title: '憓家快修',
    category: 'UI设计',
    image: '/images/ui-huijia-repair.jpg',
    href: '#/project/huijia-repair',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '建发校招官网',
    category: 'UI设计',
    image: '/images/ui-jianfa.png',
    href: '#/project/jianfa-ui',
    position: 'center',
    secondaryOnly: true,
    cropInGrid: true,
  },
  {
    title: '新南方 Web UI',
    category: 'UI设计',
    image: '/images/ui-xinnanfang.jpg',
    href: '#/project/xinnanfang-web',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '憓家高端客群',
    category: 'UI设计',
    image: '/images/ui-huijia-premium.png',
    position: 'center',
    href: '#/project/huijia-premium',
    secondaryOnly: true,
  },
  {
    title: '华泾邻里市集',
    category: '活动市集',
    image: '/images/kv-original.png',
    href: '#/project/huajing-market',
    position: 'center',
    layout: 'project-e',
  },
  {
    title: '次元奇遇x非遗新生',
    category: '活动市集',
    image: '/images/activity-darongcheng.jpg',
    href: '#/project/ciyuan-market',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '汇小牛品牌发布会',
    category: '活动市集',
    image: '/images/activity-huixiaoniu-launch.jpg',
    href: '#/project/huixiaoniu-launch',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '憓家社区家装节',
    category: '活动市集',
    image: '/images/activity-huijia-home-festival.jpg',
    href: '#/project/huijia-home-festival',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '仙霞社区睦邻文化节',
    category: '活动市集',
    image: '/images/activity-xianxia-neighbor-festival.jpg',
    position: 'center',
    secondaryOnly: true,
    wideInGrid: true,
  },
  {
    title: '付航周边产品',
    category: '文创周边',
    image: '/images/object-original.png',
    href: '#/project/fuhang-products',
    position: 'center',
    layout: 'project-f',
  },
  {
    title: '憓家生活全方位生活管理及尊享服务',
    category: '其他',
    image: '/images/other-huijia-life.jpg',
    href: '#/project/huijia-life',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '物业+居家养老解决方案',
    category: '其他',
    image: '/images/other-property-eldercare.jpg',
    href: '#/project/property-eldercare',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '虹桥中央商务区东虹桥片区及程家桥推介',
    category: '其他',
    image: '/images/other-hongqiao-promotion.jpg',
    href: '#/project/hongqiao-promotion',
    position: 'center',
    secondaryOnly: true,
  },
  {
    title: '美天副食品全场景生鲜零售领航指南',
    category: '其他',
    image: '/images/other-meitian-whitepaper.jpg',
    href: '#/project/meitian-whitepaper',
    position: 'center',
    secondaryOnly: true,
    cropToWidescreen: true,
  },
]

const homeContinuationProjects = [
  ['憓家快修', 'home-project-repair', 'center'],
  ['海瑞麟 Harry Lin', 'home-project-hairuilin', '66% center'],
  ['憓家生活全方位生活管理及尊享服务', 'home-project-huijia-life', 'center'],
  ['暖新巢', 'home-project-nuanxin', 'center'],
  ['建发校招官网', 'home-project-jianfa', 'center'],
  ['美天副食品全场景生鲜零售领航指南', 'home-project-meitian', 'center'],
  ['憓家高端客群', 'home-project-premium', 'center'],
  ['仙霞社区睦邻文化节', 'home-project-xianxia', 'center'],
  ['汇小牛品牌发布会', 'home-project-anniversary', 'center'],
].map(([title, homeClass, homePosition]) => ({
  ...projects.find((project) => project.title === title),
  homeClass,
  homePosition,
}))

const picpalsPages = Array.from({ length: 25 }, (_, index) => {
  const pageNumber = index + 1
  const filename = String(pageNumber).padStart(2, '0')
  const src = pageNumber === 5
    ? '/projects/picpals/pages/replacement-05.jpg'
    : pageNumber === 21
      ? '/projects/picpals/pages/replacement-21.jpg'
      : `/projects/picpals/pages/page-${filename}.png`

  return {
    src,
    width: 1920,
    height: pageNumber === 14 ? 2210 : pageNumber === 19 ? 2383 : 1080,
  }
})

const xiaomanzhiPageNames = [
  'cover', '01', '02', '03', '05', '06', '07', '08', '09', '10', '11',
  '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
]

const xiaomanzhiPages = xiaomanzhiPageNames.map((name) => ({
  src: name === 'cover'
    ? '/projects/xiaomanzhi/web/cover.jpg'
    : `/projects/xiaomanzhi/web/page-${name}.jpg`,
  width: 2400,
  height: 1350,
}))

const huajingMarketPageNumbers = [1, ...Array.from({ length: 11 }, (_, index) => index + 22), 40]

const huajingMarketPages = huajingMarketPageNumbers.map((pageNumber) => ({
  src: `/projects/huajing-market/pages/page-${String(pageNumber).padStart(2, '0')}.jpg`,
  width: 2400,
  height: 1350,
}))

const ciyuanMarketPages = Array.from({ length: 6 }, (_, index) => ({
  src: `/projects/ciyuan-market/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: index === 0 ? 8000 : 4800,
  height: index === 0 ? 4500 : 3200,
}))

const huixiaoniuLaunchPages = [
  {
    src: '/projects/huixiaoniu-launch/cover.jpg',
    width: 2048,
    height: 1152,
  },
  ...Array.from({ length: 35 }, (_, index) => ({
    src: `/projects/huixiaoniu-launch/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
    width: 3200,
    height: 1710,
  })),
]

const huijiaHomeFestivalPages = [
  { src: '/projects/huijia-home-festival/pages/page-01.jpg', width: 4000, height: 2250 },
  { src: '/projects/huijia-home-festival/pages/page-02.png', width: 3000, height: 3000 },
  ...Array.from({ length: 4 }, (_, index) => ({
    src: `/projects/huijia-home-festival/pages/page-${String(index + 3).padStart(2, '0')}.png`,
    width: 2560,
    height: 1440,
  })),
  { src: '/projects/huijia-home-festival/pages/page-07.png', width: 2560, height: 1624 },
  { src: '/projects/huijia-home-festival/pages/page-08.png', width: 2560, height: 1624 },
]

const huijiaLifePages = Array.from({ length: 20 }, (_, index) => ({
  src: `/projects/huijia-life/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: 8000,
  height: 4500,
}))

const propertyEldercarePages = Array.from({ length: 19 }, (_, index) => ({
  src: `/projects/property-eldercare/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: 8000,
  height: 4500,
}))

const hongqiaoPromotionPages = Array.from({ length: 31 }, (_, index) => ({
  src: `/projects/hongqiao-promotion/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: 2560,
  height: 1440,
}))

const meitianWhitepaperPages = Array.from({ length: 20 }, (_, index) => ({
  src: `/projects/meitian-whitepaper/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: 2400,
  height: index < 3 ? 1522 : 1601,
}))

const nuanxinCloudPages = [
  { src: '/projects/nuanxin-cloud/pages/page-01.jpg', width: 2400, height: 3136 },
  { src: '/projects/nuanxin-cloud/pages/page-02.jpg', width: 2400, height: 3208 },
  { src: '/projects/nuanxin-cloud/pages/page-03.jpg', width: 2400, height: 1351 },
  { src: '/projects/nuanxin-cloud/pages/page-04.jpg', width: 2400, height: 1351 },
  { src: '/projects/nuanxin-cloud/pages/page-05.jpg', width: 2400, height: 4215 },
]

const huijiaRepairPages = [
  4500, 11116, 4500, 4500, 9677, 7200, 9677, 5844, 4500,
  4500, 10500, 6122, 5851, 7995, 5886, 4500, 4500,
].map((height, index) => ({
  src: `/projects/huijia-repair/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: 8000,
  height,
}))

const jianfaUiPages = [
  1350, 1350, 1350, 1350, 6396, 1350, 1350, 1350, 10386, 11014,
].map((height, index) => ({
  src: `/projects/jianfa-ui/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: 2400,
  height,
}))

const xinnanfangWebPages = [
  { src: '/projects/xinnanfang-web/pages/page-01.jpg', width: 8000, height: 31088 },
]

const huijiaPremiumPages = [
  { src: '/projects/huijia-premium/pages/page-01.jpg', width: 2400, height: 1601 },
  { src: '/projects/huijia-premium/pages/page-02.jpg', width: 2400, height: 1800 },
  { src: '/projects/huijia-premium/pages/page-03.jpg', width: 2400, height: 1800 },
  { src: '/projects/huijia-premium/pages/page-04.jpg', width: 2400, height: 1601 },
  { src: '/projects/huijia-premium/pages/page-05.jpg', width: 2400, height: 3667 },
  { src: '/projects/huijia-premium/pages/page-06.jpg', width: 2400, height: 5622 },
  { src: '/projects/huijia-premium/pages/page-07.jpg', width: 2400, height: 3667 },
]

const huixiaoniuPages = Array.from({ length: 10 }, (_, index) => {
  const pageNumber = index + 1
  const heights = [1350, 1350, 1350, 1350, 4319, 1350, 1350, 1350, 1350, 2435]

  return {
    src: `/projects/huixiaoniu/pages/page-${String(pageNumber).padStart(2, '0')}.jpg`,
    width: 2400,
    height: heights[index],
  }
})

const fuhangProductPages = Array.from({ length: 11 }, (_, index) => ({
  src: `/projects/fuhang-products/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: 2400,
  height: 1350,
}))

const nuanxinIpPages = [
  ...Array.from({ length: 6 }, (_, index) => ({
    src: `/projects/nuanxin-ip/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
    width: 8000,
    height: 4500,
  })),
]

const hairuilinPages = Array.from({ length: 4 }, (_, index) => ({
  src: `/projects/hairuilin/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
  width: 8000,
  height: 4500,
}))

const projectDetails = {
  picpals: {
    title: 'PICPALS 匹克球',
    category: 'Brand Design',
    services: ['品牌策略', '视觉识别'],
    intro: [
      'PICPALS 以匹克球的运动文化为基础，面向都市白领、品质生活追求者与轻社交运动人群，建立兼具复古、潮流和专业感的品牌视觉，让这项易上手的运动成为连接年轻世代的社交语言。',
      '项目以流动曲线凝固挥拍瞬间，将匹克球的节奏转译为鲜明的品牌符号，并以黑、红、亮黄构成识别系统。围绕“联结每一代人的俱乐部”这一概念，视觉进一步延展至球拍、包装、服装与空间，形成完整而统一的品牌体验。',
    ],
    pages: picpalsPages,
  },
  xiaomanzhi: {
    title: '小满志',
    category: 'Brand Design',
    services: ['品牌策略', '视觉识别'],
    intro: [
      '小满志以“药食同源、年轻、自然”为核心，面向关注健康生活方式的年轻消费人群，重新组织养生奶茶的品牌语言。项目将传统食养文化转译为更轻盈、克制且日常的视觉体验，在保留温润东方气质的同时，降低传统养生品牌的距离感。',
      '品牌围绕“一杯轻养小圆满”的主张，以柔和的米白与草木色构建基础色调，结合食材插画、留白版式与温润摄影，延展至包装、产品拍摄和空间场景，形成自然、柔润且具有辨识度的品牌体验。',
    ],
    pages: xiaomanzhiPages,
  },
  huixiaoniu: {
    title: '汇小牛 IP',
    category: 'IP Design',
    services: ['IP形象设计', '品牌视觉'],
    intro: [
      '汇小牛，作为国企徐汇城投旗下的重要品牌，以“为每一次呼唤全力以赴”为坚定标语，深度扎根社区生活服务领域。',
      '在业务范畴上，汇小牛形成了五大核心业务板块，致力于满足居民多样化的生活需求。快修板块涵盖全屋水电、家电、家具维修，凭借专业的技术和高效的响应，快速解决居民家中的各类故障；美居板块涉及局部改造、空气净化等服务，用心打造舒适宜居的居住环境；养老板块推出上门理发、适老化改造等贴心服务，助力老年人享受高品质生活；租房板块提供房屋托管、带看出租、租客管理等一站式服务，让租房变得轻松便捷；保洁板块则专注于家庭保洁，为居民营造干净整洁的家。',
      '凭借着专业的100余人全职维修及管理团队，以及全面而严谨的人员培训体系，汇小牛常年服务于徐汇区众多租赁住房及集中项目公区。其全服务链24小时报修接单，维修板块30分钟快速响应的服务承诺，更是赢得了超10000平台活跃用户的一致好评。未来，汇小牛将继续秉持国企担当，不断优化服务，利用前沿科技赋能，引领行业发展，为社区居民带来更优质的生活服务体验。',
    ],
    pages: huixiaoniuPages,
  },
  'nuanxin-ip': {
    title: '暖新巢',
    category: 'IP Design',
    services: ['IP形象设计', '角色视觉系统'],
    intro: [
      '暖新巢 IP 以社区服务平台温暖、便捷、充满活力的品牌特质为核心，将“暖心服务”的理念转化为具有亲和力与行动感的角色形象。角色以轻盈的蜜蜂意象为灵感，结合服务人员的工作属性，建立鲜明、友好且易于传播的视觉记忆。',
      '设计围绕角色比例、服装装备、表情动作与应用场景进行系统化塑造，并以明亮的黄色作为主要识别色，延展至品牌海报、社区场景与服务触点。通过统一的角色语言与细节规范，让 IP 兼具品牌代表性、生活气息与后续内容拓展能力。',
    ],
    pages: nuanxinIpPages,
  },
  hairuilin: {
    title: '海瑞麟 Harry Lin',
    category: 'IP Design',
    services: ['IP形象设计', '角色视觉系统'],
    intro: [
      '海瑞麟 Harry Lin 是一个以白海参为原型的原创 IP 形象。设计从白海参洁白柔软、带有棘状轮廓的生物特征出发，将独特的海洋形态转化为圆润、亲和且具有治愈感的角色语言，在保留原型辨识度的同时，建立纯净而可爱的视觉性格。',
      '角色系统围绕外形轮廓、身体比例、表情与色彩进行统一塑造，以乳白色为主体，结合柔和的腮红与轻盈的透明感细节，强化温柔、灵动的海洋气质。项目进一步通过造型设定、三视图与场景画面完成形象延展，为后续内容传播及周边应用建立稳定的视觉基础。',
    ],
    pages: hairuilinPages,
  },
  'nuanxin-cloud': {
    title: '暖新云巢',
    category: 'UI Design',
    services: ['多端界面设计', '视觉系统'],
    intro: [
      '暖新巢是一款面向多场景服务的综合性服务平台，为满足平台全链路运营与多元化用户使用需求，本次UI设计覆盖四大核心端口，分别为街镇服务端、商户服务端、后台管理端及用户端，全面适配平台管理人员、合作商户、街镇工作人员及普通终端用户的各类操作与使用场景，搭建完整、闭环的平台服务视觉体系。',
      '在视觉设计层面，本次设计以品牌核心视觉元素为基准，依托品牌专属黄色LOGO，确立黄橙为主的核心配色体系。黄橙色系兼具明亮、温暖、活力的视觉特质，高度契合平台便民服务、普惠大众的核心服务属性，打破传统服务类软件刻板、严肃的视觉观感。同时，结合平台生活化、便民化的服务定位，整体UI设计采用轻量化、年轻化的活泼设计风格，兼顾视觉美观度与操作便捷性。',
    ],
    pages: nuanxinCloudPages,
  },
  'huijia-repair': {
    title: '憓家快修',
    category: 'UI Design',
    services: ['小程序界面更新', '用户体验设计'],
    intro: [
      '憓家快修是一款面向社区居民的家庭维修服务小程序，覆盖日常报修、维修服务选择、订单进度、消息通知与个人中心等核心使用场景。本次界面更新以提升信息获取效率与服务操作体验为目标，重新梳理用户从发现服务、提交需求到跟进结果的完整流程，让家庭维修服务更加清晰、便捷且值得信赖。',
      '视觉设计以深蓝色建立专业、可靠的品牌基调，并通过明亮的蓝色与橙色强化服务入口、状态反馈和关键操作。界面采用清晰的卡片层级、统一的图标系统与更直观的信息排布，在保持社区服务亲和力的同时，提升复杂服务内容的可读性与操作效率，形成一致而完整的小程序视觉体验。',
    ],
    pages: huijiaRepairPages,
  },
  'jianfa-ui': {
    title: '建发校招 Web UI',
    category: 'UI Design',
    services: ['校园招聘网站', 'Web界面设计'],
    intro: [
      '建发校招 Web UI 面向应届毕业生与校园人才，围绕职位发现、企业认知、招聘信息获取和求职转化构建完整的校园招聘网站体验。项目重新梳理校招首页、岗位与项目内容的浏览路径，通过清晰的信息层级与重点入口，帮助年轻用户快速理解企业业务、定位适合的机会并完成求职决策。',
      '视觉设计延续建发品牌的专业基因，以轻盈的蓝白色作为核心基调，并结合立体字形、港口与物流意象、空间化场景和动态感排版，建立更具年轻感与未来感的校园沟通语言。页面在品牌表达与功能效率之间保持平衡，使招聘信息更易阅读，也让企业形象在不同页面中保持统一而鲜明。',
    ],
    pages: jianfaUiPages,
  },
  'xinnanfang-web': {
    title: '新南方留学',
    category: 'UI Design',
    services: ['越南留学报名网站', 'Web界面设计'],
    intro: [
      '新南方留学 Web UI 是一个面向赴越南留学人群的在线信息与报名平台，围绕院校了解、专业选择、招生信息查询和留学申请构建完整的浏览路径。项目将留学服务中的企业介绍、院校资源、申请流程与个人报名信息整合到统一的网站体系中，帮助用户更高效地完成从信息获取到提交申请的关键步骤。',
      '视觉设计以清晰、可信且具有国际感的蓝白色为核心基调，通过大幅校园影像、模块化信息卡片与明确的操作层级组织复杂内容。页面在品牌展示与报名效率之间保持平衡，并以统一的导航、按钮和信息组件贯穿首页、院校详情、专业列表及个人中心，形成简洁、专业且易于使用的留学服务体验。',
    ],
    pages: xinnanfangWebPages,
  },
  'huijia-premium': {
    title: '憓家高端客群',
    category: 'UI Design',
    services: ['高端服务平台', 'APP 界面设计'],
    intro: [
      '憓家高端客群 APP 面向注重品质生活与专属服务体验的用户，通过清晰的套餐选择、服务推荐和会员权益展示，整合家庭保洁、家电维修、宠物照料、植物养护、甜品制作与饮品调制等高品质生活服务。项目重新梳理从浏览套餐、理解权益到订购服务的核心路径，让复杂的服务内容以更直观、从容的方式被理解和使用。',
      '视觉设计以深蓝与暖金构建克制而稳重的高端基调，结合大幅情境影像、清晰的信息层级和留白充足的卡片布局，强化专属、可靠与细致的品牌感受。界面同时覆盖平板与移动端展示，通过统一的导航、服务卡片和内容组件，形成兼顾质感、可读性与操作效率的高端客群服务体验。',
    ],
    pages: huijiaPremiumPages,
  },
  'fuhang-products': {
    title: '付航周边产品',
    category: 'Product Design',
    services: ['IP周边设计', '产品视觉'],
    intro: [
      '付航周边产品以原创IP角色为核心，将具有亲和力的角色形象从平面视觉延展到可被使用和收藏的日常物件。项目围绕钥匙扣、摆件、纸巾盒、装饰画、托盘及生活器物等多个载体，建立统一而富有变化的产品体系，让IP从视觉识别进入真实生活场景。',
      '视觉与材质表达延续温暖、治愈的角色气质，以柔和的木色、奶油色和自然光构建克制的生活化场景，并结合亚克力、木材、织物与金属等不同材质探索角色在尺寸、结构和使用方式上的多种可能。通过产品造型、包装展示与情境摄影的统一设计，形成兼具陪伴感、实用性与收藏价值的周边体验。',
    ],
    pages: fuhangProductPages,
  },
  'huajing-market': {
    title: '华泾邻里市集',
    category: 'KV Design',
    services: ['活动主视觉', '市集生活节'],
    intro: [
      '华泾邻里市集暨第二届憓家生活节以西岸自然艺术公园为场域，将华泾在地文化、社区服务与市集体验整合为一场面向居民的城市生活节。项目围绕“让人气聚起来、消费热起来、氛围浓起来”的目标，通过视觉系统连接非遗文化、邻里互动、美食体验与社区舞台，呈现华泾的温度与烟火气。',
      '视觉以鲜明的蓝色基调与积木式城市图形构建主画面，将市集、生活服务和社区文化转译为年轻、开放且具有节庆感的视觉语言，并进一步延展至入口门头、打卡装置、树池装饰、休息点位、露营区、指引牌与综合服务区，形成贯穿活动现场的完整视觉体验。',
    ],
    pages: huajingMarketPages,
  },
  'ciyuan-market': {
    title: '次元奇遇x非遗新生',
    category: 'KV Design',
    services: ['活动主视觉', '市集空间延展'],
    intro: [
      '次元奇遇x非遗新生是一场融合二次元文化与传统非遗体验的主题市集活动，面向年轻消费人群，通过角色视觉、潮流内容与线下互动场景，让传统文化以更轻松、更具参与感的方式进入当代生活。',
      '视觉设计以柔和明亮的浅色系为基础，将二次元人物、非遗纹样与城市市集元素重新组合，形成兼具幻想感与文化辨识度的主视觉系统。整体延展至活动背景、入口装置、主题展区与现场陈列，在保持统一识别的同时，营造开放、轻盈且适合社交传播的市集氛围。',
    ],
    pages: ciyuanMarketPages,
  },
  'huixiaoniu-launch': {
    title: '汇小牛品牌发布会',
    category: 'KV Design',
    services: ['活动主视觉', '发布会视觉延展'],
    intro: [
      '汇小牛品牌发布会以社区生活服务品牌“汇小牛”的正式亮相为核心，通过周年庆典与品牌发布场景，集中呈现品牌定位、服务体系与面向居民的价值主张。活动围绕品牌认知建立、业务内容传达和现场互动体验展开，让“为每一次呼唤全力以赴”的服务理念被更清晰地感知。',
      '视觉设计延续汇小牛亲和、可靠且富有活力的品牌气质，以品牌蓝与明亮暖色构建主视觉，并结合角色形象、社区生活场景与发布会信息完成系统化延展。画面进一步应用于舞台、屏幕内容、流程展示与现场物料，在统一品牌识别的同时营造具有庆典感和传播力的活动氛围。',
    ],
    pages: huixiaoniuLaunchPages,
  },
  'huijia-home-festival': {
    title: '憓家社区家装节',
    category: 'KV Design',
    services: ['活动主视觉', '线下空间延展'],
    intro: [
      '憓家社区家装节以社区居民的居住焕新需求为核心，将家装咨询、生活服务与线下互动体验集中到社区场景中。项目围绕“装点美好生活”的主题，通过更直观的居家空间展示和亲切的品牌表达，让专业家装服务以轻松、可感知的方式走近居民日常。',
      '视觉以品牌蓝为主色，将立体居家剖面、家具元素与汇小牛角色组合为核心画面，并延展至电视屏幕、咨询摊位及现场装置。统一的空间透视与明亮暖色点缀强化了活动识别，也让不同现场触点保持温暖、活力且完整的视觉体验。',
    ],
    pages: huijiaHomeFestivalPages,
  },
  'huijia-life': {
    title: '憓家生活全方位生活管理及尊享服务',
    category: 'Presentation Design',
    services: ['演示视觉设计'],
    intro: [
      '本项目围绕憓家生活全方位生活管理及尊享服务方案进行系统化美化排版，将品牌介绍、服务体系、专业团队与生活服务场景等信息重新梳理为清晰的演示结构。设计在保留原有方案内容的基础上强化阅读节奏和重点层级，使复杂的服务信息更易理解，也更适合正式提案与现场讲解。',
      '视觉延续憓家品牌的深蓝基调，并以暖金色作为重点信息与品质感的辅助色。页面通过大幅场景影像、模块化信息布局、统一的图标与数据表达建立稳定的演示语言，同时结合发光品牌符号与克制留白，形成专业、沉稳且具有尊享感的方案视觉体验。',
    ],
    pages: huijiaLifePages,
  },
  'property-eldercare': {
    title: '物业+居家养老解决方案',
    category: 'Presentation Design',
    services: ['演示视觉设计'],
    intro: [
      '本项目围绕物业与居家养老融合服务方案进行系统化美化排版，将行业背景、社区养老需求、服务模式、平台能力与落地场景重新梳理为清晰的演示结构。设计通过统一标题层级、图表关系与重点数据表达，让信息量较大的解决方案更便于阅读、汇报与沟通，也使方案的核心价值能够被快速理解。',
      '视觉以沉稳的深蓝色为主基调，结合城市建筑、社区空间与长者生活场景，建立兼具专业度、科技感与人文温度的画面语言。页面运用模块化信息布局、数据卡片、流程图示与橙金色重点标识组织内容，在保持整套方案统一性的同时，强化关键结论与服务优势的视觉记忆。',
    ],
    pages: propertyEldercarePages,
  },
  'hongqiao-promotion': {
    title: '虹桥中央商务区东虹桥片区及程家桥推介',
    category: 'Presentation Design',
    services: ['演示视觉设计'],
    intro: [
      '本项目围绕虹桥中央商务区东虹桥片区及程家桥街道营商环境推介展开，对区域区位、交通优势、产业基础、空间载体与营商服务等信息进行系统化梳理。演示结构从宏观区位逐步推进到片区资源与发展机遇，以清晰的内容层级和重点数据表达服务于招商推介、区域展示及现场讲解。',
      '视觉以航空蓝为主色，并结合生态绿与建筑红构建具有区域辨识度的色彩体系。页面通过虹桥机场、城市建筑与街区场景的大幅影像，配合地图、数据图表和模块化信息排版，呈现东虹桥片区兼具国际交通门户、生态环境与产业活力的综合形象，使整套推介兼具专业度、开放感与城市气质。',
    ],
    pages: hongqiaoPromotionPages,
  },
  'meitian-whitepaper': {
    title: '美天副食品全场景生鲜零售领航指南',
    category: 'Editorial Design',
    services: ['白皮书视觉设计'],
    intro: [
      '本项目围绕美天副食品全场景生鲜零售领航指南进行白皮书视觉设计，对企业发展、业务体系、智慧菜市场、一站式解决方案与服务模式等内容进行系统化梳理。通过清晰的章节结构、跨页节奏和重点信息层级，将复杂的业务内容转化为便于阅读、展示与传播的品牌资料。',
      '视觉以美天品牌玫红色为核心，结合黑、白、灰建立稳重而鲜明的编辑语言。内页运用真实经营场景、数据图表、图标化信息与大幅章节页形成丰富的阅读节奏，并通过统一的跨页网格与留白控制保持整册一致性，使白皮书兼具行业专业度、品牌辨识度与现代零售气质。',
    ],
    pages: meitianWhitepaperPages,
  },
}

function getCurrentView() {
  if (window.location.hash === '#/about') return 'about'
  const projectKey = window.location.hash.replace('#/project/', '')
  return projectDetails[projectKey] ? projectKey : 'home'
}

function getCategoryFromHash() {
  if (!window.location.hash.startsWith('#project?')) return null
  const category = new URLSearchParams(window.location.hash.split('?')[1]).get('category')
  return categories.includes(category) ? category : null
}

function ProjectPages({ project }) {
const assetVersion = '20260721-31'

  const retryImage = (event, source) => {
    const image = event.currentTarget
    if (image.dataset.retried) return

    image.dataset.retried = 'true'
    image.src = `${source}?v=${assetVersion}&retry=${Date.now()}`
  }

  return (
    <div className="pdf-pages" aria-label={`${project.title}项目完整内容`}>
      {project.pages.map((page, index) => (
        <figure
          className="pdf-page-shell"
          key={page.src}
          style={{ aspectRatio: `${page.width} / ${page.height}` }}
        >
          <img
            src={`${optimizedImagePath(page.src)}?v=${assetVersion}`}
            alt={`${project.title}项目第 ${index + 1} 页`}
            decoding="async"
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            width={page.width}
            height={page.height}
            onError={(event) => retryImage(event, optimizedImagePath(page.src))}
          />
        </figure>
      ))}
    </div>
  )
}

function AboutView() {
  return (
    <main className="about-view" id="top">
      <picture>
        <source
          media="(max-width: 760px)"
          srcSet="/optimized/images/about-page-mobile.jpg"
        />
        <img
          className="about-artwork"
          src="/optimized/images/about-page.jpg"
          alt=""
          aria-hidden="true"
          width="11999"
          height="6444"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <div className="about-accessible-copy">
        <section className="about-row about-contact" aria-labelledby="about-contact-title">
          <h1 id="about-contact-title">
            <span aria-hidden="true" />
            联系方式
            <em>Contact</em>
          </h1>
          <div className="about-copy about-contact-copy">
            <p>联系电话：<a href="tel:13681957917">13681957917</a></p>
            <p>Wechat：J2967613478</p>
            <p>Email：<a href="mailto:2967613478@qq.com">2967613478@qq.com</a></p>
          </div>
        </section>

        <section className="about-row about-profile" aria-labelledby="about-profile-title">
          <h2 id="about-profile-title">
            <span aria-hidden="true" />
            自我介绍
            <em>Profile</em>
          </h2>
          <div className="about-copy">
            <p>拥有两年半平面设计经验，包含品牌视觉运营、UI界面设计、活动主视觉KV及线下物料、原创IP形象体系搭建、文创产品。承接空间平面类视觉落地设计，包含导视设计、空间导览地图、企业文化墙等关于平面类的设计。品牌商务PPT设计。精通多类AI生成工具，拥有自己AIGC工作流，赋能设计全流程，将AI能力融入创意构思、效果生成、细节优化全设计链路，提高作品完整性。</p>
            <p>设计是热爱，做到充满热爱。</p>
          </div>
        </section>

        <section className="about-row about-work" aria-labelledby="about-work-title">
          <h2 id="about-work-title">
            <span aria-hidden="true" />
            工作经历
            <em>Work</em>
          </h2>
          <div className="about-copy about-work-copy">
            <p>落地13场全类型活动视觉设计，涵盖动漫主题活动、生活节、品牌推介会、企业年会；完成活动主视觉KV及配套线下线上物料设计。把控主KV核心视觉调性，统一全系列物料视觉体系，解决物料视觉脱节、宣传辨识度不足等问题。</p>
            <p>完成4套IP设计工作，包含全新原创IP打造与存量IP形象迭代升级；规范IP全套视觉延展体系，解决品牌形象辨识度弱、旧IP形象老化、衍生应用适配性差、周边落地视觉不统一等痛点，塑造适配多场景传播的专属品牌卡通形象。</p>
            <p>拥有15套UI设计的项目经验，覆盖APP、小程序、网页、平板多终端。针对B端优化信息层级，解决后台数据繁杂、操作路径冗长问题，提升运营办公效率；优化C端页面动线，降低用户理解成本，解决普通用户上手门槛高、流失率大问题。</p>
            <p>完成7套品牌方案排版设计工作，涵盖品牌推介会、品牌服务介绍、品牌整体介绍等多元场景。梳理图文层级与视觉排版逻辑，解决方案内容杂乱、信息层级模糊、品牌展示调性不统一、商务呈现质感不足等问题，提升品牌宣讲与对外推介的专业度与说服力。</p>
          </div>
        </section>

        <section className="about-row about-projects" aria-labelledby="about-projects-title">
          <h2 id="about-projects-title">
            <span aria-hidden="true" />
            项目经历
            <em>Project</em>
          </h2>
          <div className="about-copy about-project-list">
            <p><time dateTime="2024-07">2024.07</time><span>参与原创字库设计，产出字体《摇醒青年黑》，该字体现已开放免费商用授权，具备成熟落地应用价值。</span></p>
            <p><time dateTime="2025-12">2025.12</time><span>参与极氪线下门店新春全案项目，参与活动新春主题门店落地平面物料设计，兼顾汽车高端品牌调性与新春节日氛围感。</span></p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState(getCategoryFromHash)
  const [navOpen, setNavOpen] = useState(false)
  const [introOpen, setIntroOpen] = useState(false)
  const [view, setView] = useState(getCurrentView)
  const projectListPosition = useRef(null)
  const visibleProjects = activeCategory
    ? projects.filter((project) => project.category === activeCategory)
    : projects.filter((project) => !project.secondaryOnly)

  const showAllProjects = () => {
    setActiveCategory(null)
  }

  const rememberProjectListPosition = () => {
    projectListPosition.current = {
      hash: window.location.hash,
      scrollY: window.scrollY,
    }
  }

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    const handleHashChange = () => {
      setView(getCurrentView())
      setActiveCategory(getCategoryFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.history.scrollRestoration = previousScrollRestoration
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    const savedPosition = view === 'home' && projectListPosition.current?.hash === window.location.hash
      ? projectListPosition.current.scrollY
      : 0
    root.style.scrollBehavior = 'auto'
    window.scrollTo({ top: savedPosition, left: 0 })
    const restoreScrollBehavior = window.requestAnimationFrame(() => {
      window.scrollTo({ top: savedPosition, left: 0 })
      root.style.scrollBehavior = previousScrollBehavior
    })
    setIntroOpen(false)
    document.title = view === 'about'
      ? 'About — LAYEE by Design'
      : projectDetails[view]
        ? `${projectDetails[view].title} — LAYEE by Design`
        : 'LAYEE by Design'

    return () => window.cancelAnimationFrame(restoreScrollBehavior)
  }, [view])

  const detailProject = projectDetails[view]
  const isDetailView = Boolean(detailProject)
  const isAboutView = view === 'about'
  const relatedWorks = detailProject
    ? projects.filter((project) => project.title !== detailProject.title).slice(0, 4)
    : []

  useEffect(() => {
    if (!navOpen) return undefined

    let previousScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > previousScrollY + 4) setNavOpen(false)
      previousScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navOpen])

  const handleProjectNavClick = (event) => {
    event.preventDefault()
    setNavOpen((open) => !open)
  }

  return (
    <>
      <header className="site-header">
        <div className="top-nav">
          <a className="wordmark" href="#top" onClick={showAllProjects}>LAYEE <span>By Design</span></a>
          <nav aria-label="主导航">
            <a
              className="bilingual-link"
              href="#project"
              onClick={handleProjectNavClick}
            >
              <span className="nav-en">project</span>
              <span className="nav-zh">项目</span>
            </a>
            <a className="bilingual-link" href="#/about">
              <span className="nav-en">about</span>
              <span className="nav-zh">关于</span>
            </a>
          </nav>
        </div>

        {navOpen && (
          <nav className="category-nav" aria-label="项目分类">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'active' : ''}
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setNavOpen(false)
                  window.location.hash = `project?category=${encodeURIComponent(category)}`
                }}
                type="button"
              >
                <span aria-hidden="true" />
                {category}
              </button>
            ))}
          </nav>
        )}
      </header>

      {isDetailView ? (
        <main className="project-detail-view" id="top">
          <section className={`project-intro ${introOpen ? '' : 'collapsed'}`} aria-labelledby="project-detail-title">
            <div className="project-intro-meta">
              <h1 id="project-detail-title">{detailProject.title}</h1>

              <dl className="project-intro-meta-content">
                <div>
                  <dt>Category</dt>
                  <dd>{detailProject.category}</dd>
                </div>
                <div>
                  <dt>Services</dt>
                  <dd>{detailProject.services.map((service) => <span key={service}>{service}<br /></span>)}</dd>
                </div>
              </dl>
            </div>

            <div className="project-intro-copy">
              <h2>
                <button
                  className="detail-close"
                  type="button"
                  onClick={() => setIntroOpen((open) => !open)}
                  aria-expanded={introOpen}
                  aria-controls="project-intro-copy-content"
                  aria-label={introOpen ? '收起项目简介' : '展开项目简介'}
                >
                  <span className="detail-close-dot" aria-hidden="true" />
                </button>
                项目介绍
              </h2>
              <div className="project-intro-copy-content" id="project-intro-copy-content">
                {detailProject.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </section>

          <section className="project-pdf" aria-label={`${detailProject.title}项目内容`}>
            <ProjectPages project={detailProject} />
          </section>

          <section className="related-work" aria-labelledby="related-work-title">
            <h2 id="related-work-title">Related work</h2>
            <div className="related-work-grid">
              {relatedWorks.map((project) => (
                <article className="related-work-card" key={project.title}>
                  <a
                    href={project.href ?? '#project'}
                    onClick={project.href ? undefined : showAllProjects}
                  >
                    <div className="related-work-image">
                      <img src={optimizedImagePath(project.image)} alt={`${project.title}项目主图`} loading="lazy" />
                    </div>
                    <p>{project.title}</p>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <footer className="project-footer" aria-label="联系方式">
            <div className="project-footer-brand">LAYEE <span>By Design</span></div>
            <div className="project-footer-item">
              <span className="project-footer-label">咨询</span>
              <span>13681957917</span>
            </div>
            <div className="project-footer-item">
              <span className="project-footer-label">邮箱</span>
              <span>2967613478@qq.com</span>
            </div>
            <div className="project-footer-item">
              <span className="project-footer-label">WeChat</span>
              <span>J2967613478</span>
            </div>
          </footer>
        </main>
      ) : isAboutView ? (
        <AboutView />
      ) : (
        <main id="top">
          <section
            className={`project-section ${activeCategory ? 'project-section-filtered' : 'project-section-home'} ${activeCategory === '品牌设计' ? 'project-section-brand' : ''}`}
            id="project"
            aria-label="项目列表"
          >
            <div className={`project-canvas ${activeCategory ? 'filtered' : ''}`}>
              <div className={activeCategory ? 'project-grid-contents' : 'home-project-layer'}>
                {(activeCategory ? visibleProjects : [...visibleProjects, ...homeContinuationProjects]).map((project, index) => {
                  const image = (
                    <img
                      src={optimizedImagePath(project.image)}
                      alt={`${project.title}项目主图`}
                      style={{ objectPosition: project.homePosition || project.position }}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                    />
                  )

                  return (
                    <article
                      className={`project-card ${activeCategory ? '' : project.homeClass || project.layout} ${project.liftInGrid ? 'project-lifted' : ''} ${project.cropInGrid ? 'project-cropped' : ''} ${project.cropToWidescreen ? 'project-widescreen' : ''} ${project.wideInGrid ? 'project-wide' : ''}`}
                      key={project.title}
                    >
                      {project.href ? (
                        <a
                          className="project-entry"
                          href={project.href}
                          onClick={rememberProjectListPosition}
                          aria-label={`查看${project.title}完整项目`}
                        >
                          <div className="project-image">
                            {image}
                          </div>
                          {activeCategory && <p className="project-title">{project.title}</p>}
                        </a>
                      ) : (
                        <>
                          <div className="project-image">{image}</div>
                          {activeCategory && <p className="project-title">{project.title}</p>}
                        </>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  )
}
