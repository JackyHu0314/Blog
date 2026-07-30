export const projects = [
  {
    id: 4,
    title: { zh: '图像风格迁移', en: 'Neural Style Transfer' },
    description: {
      zh: '使用 PyTorch 与 VGG19 实现 Neural Style Transfer，并扩展至 Fast Style Transfer。',
      en: 'Neural Style Transfer and Fast Style Transfer implemented with PyTorch and VGG19.',
    },
    date: { zh: '2026 年 5 月', en: 'May 2026' },
    tags: ['Python', 'PyTorch', 'VGG19', 'Computer Vision', 'Style Transfer'],
    link: 'https://github.com/JackyHu0314/Neural-Style-Transfer',
  },
  {
    id: 3,
    title: { zh: '中文外卖评论情感分析', en: 'Chinese Waimai Sentiment Analysis' },
    description: {
      zh: '使用 PyTorch 与中文 RoBERTa / BERT 完成外卖评论情感分类，包含训练、评估与错例分析。',
      en: 'Chinese sentiment classification with PyTorch and RoBERTa/BERT, including training, evaluation, and error analysis.',
    },
    date: { zh: '2026 年 4 月', en: 'April 2026' },
    tags: ['Python', 'PyTorch', 'Transformers', 'RoBERTa', 'NLP'],
    link: 'https://github.com/JackyHu0314/cn-transformer-sentiment',
  },
  {
    id: 2,
    title: { zh: 'MNIST CNN 手写数字识别', en: 'MNIST CNN Digit Recognition' },
    description: {
      zh: '使用 PyTorch 训练轻量 CNN 完成 MNIST 分类，并支持本地图片推理。',
      en: 'A lightweight PyTorch CNN for MNIST classification and local-image inference.',
    },
    date: { zh: '2026 年 3 月', en: 'March 2026' },
    tags: ['Python', 'PyTorch', 'torchvision', 'CNN', 'MNIST'],
    link: 'https://github.com/JackyHu0314/mnist-cnn-digit-recognition',
  },
  {
    id: 1,
    title: { zh: '个人博客', en: 'Personal Blog' },
    description: {
      zh: '使用 React 19、Vite 与 Tailwind CSS 构建，包含双语、主题、搜索、音乐空间和自建评论区。',
      en: 'Built with React 19, Vite, and Tailwind CSS, with bilingual content, themes, search, music, and a self-hosted comment system.',
    },
    date: { zh: '2026 年 3 月', en: 'March 2026' },
    tags: ['React 19', 'Vite 8', 'Tailwind CSS v4', 'React Router 7'],
    link: 'https://github.com/JackyHu0314/Blog',
  },
]
