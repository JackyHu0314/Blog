export const projects = [
  {
    id: 4,
    title: { zh: '图像风格迁移', en: 'Neural Style Transfer' },
    description: {
      zh: '基于 PyTorch 和预训练 VGG19 的图像风格迁移项目，实现经典优化式 Neural Style Transfer，并扩展到 Fast Style Transfer。项目围绕内容损失、风格损失、Gram 矩阵和图像优化流程展开，用深度学习把内容图像转换为指定艺术风格。',
      en: 'An image style-transfer project built with PyTorch and pretrained VGG19. It implements classic optimization-based Neural Style Transfer and extends to Fast Style Transfer, covering content loss, style loss, Gram matrices, and image optimization.',
    },
    date: { zh: '2026 年 5 月', en: 'May 2026' },
    tags: ['Python', 'PyTorch', 'VGG19', 'Computer Vision', 'Style Transfer'],
    link: 'https://github.com/JackyHu0314/Neural-Style-Transfer',
  },
  {
    id: 3,
    title: { zh: '中文外卖评论情感分析', en: 'Chinese Waimai Sentiment Analysis' },
    description: {
      zh: '一个中文 NLP 迁移学习项目，使用 PyTorch + Hugging Face Transformers 加载中文 RoBERTa / BERT，为外卖评论训练正负情感分类模型。除了训练和预测，也包含测试集评估、错例导出和混合情绪分析。',
      en: 'A Chinese NLP transfer-learning project using PyTorch and Hugging Face Transformers to fine-tune Chinese RoBERTa/BERT for positive/negative waimai review classification. It includes training, prediction, test-set evaluation, mistake export, and mixed-sentiment analysis.',
    },
    date: { zh: '2026 年 4 月', en: 'April 2026' },
    tags: ['Python', 'PyTorch', 'Transformers', 'RoBERTa', 'NLP'],
    link: 'https://github.com/JackyHu0314/cn-transformer-sentiment',
  },
  {
    id: 2,
    title: { zh: 'MNIST CNN 手写数字识别', en: 'MNIST CNN Digit Recognition' },
    description: {
      zh: '基于 PyTorch 实现的手写数字识别练习项目，使用轻量级 CNN 在 MNIST 数据集上完成 0-9 分类，并支持命令行预测本地图片。项目完整跑通了数据加载、预处理、训练、保存权重和推理流程。',
      en: 'A PyTorch handwriting recognition project that trains a lightweight CNN on MNIST for 0-9 digit classification and supports command-line prediction for local images. It walks through data loading, preprocessing, training, checkpoint saving, and inference.',
    },
    date: { zh: '2026 年 3 月', en: 'March 2026' },
    tags: ['Python', 'PyTorch', 'torchvision', 'CNN', 'MNIST'],
    link: 'https://github.com/JackyHu0314/mnist-cnn-digit-recognition',
  },
  {
    id: 1,
    title: { zh: '个人博客', en: 'Personal Blog' },
    description: {
      zh: '这个博客本身也是我持续迭代的项目：基于 Vite + React 19 + Tailwind CSS v4 构建，支持中英双语切换、亮色 / 暗色主题、随记、项目、科研、关于页面、活跃度热力图和站点统计。',
      en: 'This blog is also an ongoing project of mine: built with Vite + React 19 + Tailwind CSS v4, with bilingual switching, light/dark themes, Journal, Projects, Research, About pages, an activity heatmap, and site stats.',
    },
    date: { zh: '2026 年 3 月', en: 'March 2026' },
    tags: ['React 19', 'Vite 8', 'Tailwind CSS v4', 'React Router 7'],
    link: 'https://github.com/JackyHu0314/Blog',
  },
]
