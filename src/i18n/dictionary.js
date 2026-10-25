export const dict = {
  zh: {
    nav: {
      journal: 'Journal',
      music: 'Music',
      about: 'About',
      projects: 'Projects',
      research: 'Research',
      links: 'Links',
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
      subtitle: '一些想法，一些情绪。写下来，就没那么乱了。',
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
      title: 'About',
      tagline: 'Mathematics / WAM · VLA',
      intro: 'Profile',
      introBody:
        '读数学，也做一点 AI。偶尔在这里写点东西。',
      interests: 'Interests',
      interestsBody: '编程、深度学习、阅读、摄影、篮球和音乐。',
      skills: 'Stack',
      contact: '联系',
      contactHint: '想聊聊的话，随时找我。',
      wechatHint: '扫一扫，加我微信',
      qqHint: '扫一扫，加我 QQ',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Selected work.',
      viewDetail: '查看详情 →',
    },
    research: {
      title: 'Research',
      subtitle: 'Robot Learning · WAM / VLA',
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
      music: 'Music',
      about: 'About',
      projects: 'Projects',
      research: 'Research',
      links: 'Links',
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
      subtitle: 'Thoughts and moods, written down so they feel a little less messy.',
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
      tagline: 'Mathematics / WAM · VLA',
      intro: 'Profile',
      introBody:
        "Studying math, doing a bit of AI. I write here now and then.",
      interests: 'Interests',
      interestsBody: 'Programming, deep learning, reading, photography, basketball, and music.',
      skills: 'Stack',
      contact: 'Contact',
      contactHint: 'Want to talk? Reach out anytime.',
      wechatHint: 'Scan to add me on WeChat',
      qqHint: 'Scan to add me on QQ',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Selected work.',
      viewDetail: 'View details →',
    },
    research: {
      title: 'Research',
      subtitle: 'Robot Learning · WAM / VLA',
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
