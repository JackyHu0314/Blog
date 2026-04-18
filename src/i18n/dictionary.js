export const dict = {
  zh: {
    nav: {
      journal: '随记',
      about: '关于我',
      projects: '项目',
      research: '科研',
      search: '搜索',
    },
    theme: {
      light: '亮色',
      dark: '暗色',
    },
    lang: {
      label: '语言',
      zh: '中文',
      en: 'EN',
    },
    landing: {
      greeting: '你好，我是 Jacky',
      subtitle: '欢迎来到我的小世界 — 记录生活、学业与科研的点滴',
      enter: '进入博客 →',
      entering: '进入中…',
    },
    journal: {
      title: '随记',
      subtitle: '记录情感、学业、科研的点滴思考',
      categories: {
        全部: '全部',
        情感: '情感',
        学业: '学业',
        科研: '科研',
        生活: '生活',
        技术: '技术',
      },
    },
    about: {
      title: '关于我',
      tagline: '学生 / 开发者',
      intro: '简介',
      introBody:
        '你好，我是 Jacky，西安交通大学在读生，主修数学。目前主要关注人工智能（Embodied AI）与机器人技术，日常喜欢折腾 Linux 服务端与网络基础设施。',
      interests: '兴趣',
      interestsBody: '编程、深度学习、建网站、阅读、摄影、运动、听音乐。喜欢有趣的人，相信技术可以让世界变得更美好。',
      skills: '技能',
      contact: '联系',
      contactHint: '悬停卡片即可唤醒 — 微信 / QQ 卡片翻转显示二维码',
      wechatHint: '扫一扫，加我微信',
      qqHint: '扫一扫，加我 QQ',
    },
    projects: {
      title: '项目',
      subtitle: '我的个人项目与作品',
      viewDetail: '查看详情 →',
    },
    research: {
      title: '科研',
      subtitle: '我的研究方向与学术探索',
      status: {
        进行中: '进行中',
        已完成: '已完成',
        规划中: '规划中',
      },
    },
  },
  en: {
    nav: {
      journal: 'Journal',
      about: 'About',
      projects: 'Projects',
      research: 'Research',
      search: 'Search',
    },
    theme: {
      light: 'Light',
      dark: 'Dark',
    },
    lang: {
      label: 'Language',
      zh: '中文',
      en: 'EN',
    },
    landing: {
      greeting: "Hi, I'm Jacky",
      subtitle: 'Welcome to my little world — notes on life, study, and research',
      enter: 'Enter →',
      entering: 'Entering…',
    },
    journal: {
      title: 'Journal',
      subtitle: 'Fragments on feelings, study, and research',
      categories: {
        全部: 'All',
        情感: 'Feelings',
        学业: 'Study',
        科研: 'Research',
        生活: 'Life',
        技术: 'Tech',
      },
    },
    about: {
      title: 'About Me',
      tagline: 'Student / Developer',
      intro: 'Intro',
      introBody:
        "Hi, I'm Jacky, a student at Xi'an Jiaotong University majoring in Mathematics. I focus on AI (Embodied AI) and robotics, and enjoy tinkering with Linux servers and network infrastructure.",
      interests: 'Interests',
      interestsBody: 'Programming, deep learning, web development, reading, photography, sports, and listening to music. I enjoy meeting interesting people and believe technology makes the world better.',
      skills: 'Skills',
      contact: 'Contact',
      contactHint: 'Hover to wake — WeChat / QQ cards flip to reveal QR codes',
      wechatHint: 'Scan to add me on WeChat',
      qqHint: 'Scan to add me on QQ',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Personal projects and work',
      viewDetail: 'View details →',
    },
    research: {
      title: 'Research',
      subtitle: 'Research directions and explorations',
      status: {
        进行中: 'In progress',
        已完成: 'Completed',
        规划中: 'Planned',
      },
    },
  },
}

export function pick(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value.zh ?? value.en ?? ''
}
