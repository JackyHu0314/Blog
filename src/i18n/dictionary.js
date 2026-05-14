export const dict = {
  zh: {
    nav: {
      journal: '随记',
      about: '关于我',
      projects: '项目',
      research: '研究兴趣',
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
      subtitle: '欢迎来到我的小世界 — 记录生活、学业与学习轨迹',
      enter: '进入博客 →',
      entering: '进入中…',
    },
    journal: {
      title: '随记',
      subtitle: '记录情感、学业和成长中的点滴思考',
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
        '你好，我是 Jacky，西安交通大学在读生，主修数学。平时关注深度学习、Web 开发和一些基础设施方向，也在持续学习如何把想法做成作品。',
      interests: '兴趣',
      interestsBody: '编程、深度学习、建网站、阅读、摄影、打球、听音乐。喜欢有趣的人，也喜欢把零散想法慢慢做成可以运行的东西。',
      skills: '技术栈',
      contact: '联系',
      contactHint: '欢迎交流。',
      wechatHint: '扫一扫，加我微信',
      qqHint: '扫一扫，加我 QQ',
    },
    projects: {
      title: '项目',
      subtitle: '我的个人项目与作品',
      viewDetail: '查看详情 →',
    },
    research: {
      title: '研究兴趣',
      subtitle: '当前学习主线与后续关注方向',
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
      research: 'Interests',
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
        "Hi, I'm Jacky, a Mathematics student at Xi'an Jiaotong University. I focus on deep learning, web development, and infrastructure, and I keep learning how to turn ideas into real projects.",
      interests: 'Interests',
      interestsBody: 'Programming, deep learning, web development, reading, photography, basketball, and music. I enjoy turning scattered ideas into things that actually run.',
      skills: 'Tech Stack',
      contact: 'Contact',
      contactHint: 'Always open to conversation.',
      wechatHint: 'Scan to add me on WeChat',
      qqHint: 'Scan to add me on QQ',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Personal projects and work',
      viewDetail: 'View details →',
    },
    research: {
      title: 'Research Interests',
      subtitle: 'Current learning track and future directions',
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
