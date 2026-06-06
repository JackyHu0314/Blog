export const projects = [
  {
    id: 6,
    title: { zh: 'Mario 强化学习元学习', en: 'Mario RL Meta-Learning' },
    description: {
      zh: '一个 Super Mario Bros 强化学习项目，使用 PPO 和 Reptile 风格元学习从零训练模型，把不同关卡视为不同任务，观察初始化参数在新关卡上的快速适应能力。项目已跑通训练、评估、续训、遗忘度记录和实验图表整理。',
      en: 'A Super Mario Bros reinforcement-learning project that trains models from scratch with PPO and Reptile-style meta-learning. It treats Mario levels as separate tasks and evaluates fast adaptation on unseen levels, with training, evaluation, continued training, forgetting measurement, and experiment charts.',
    },
    date: { zh: '2026 年 5 月', en: 'May 2026' },
    tags: ['Python', 'PyTorch', 'PPO', 'Reptile', 'Reinforcement Learning'],
    link: 'https://github.com/JackyHu0314/-Mario-RL-Meta-Learning',
  },
  {
    id: 4,
    title: { zh: '图像风格迁移', en: 'Neural Style Transfer' },
    description: {
      zh: '基于 PyTorch 和预训练 VGG19 的图像风格迁移项目，实现经典优化式 Neural Style Transfer，并扩展到 Fast Style Transfer。当前已完成内容 / 风格损失、Gram 矩阵和图像优化流程，能够输出指定风格的迁移结果。',
      en: 'An image style-transfer project built with PyTorch and pretrained VGG19. It implements optimization-based Neural Style Transfer and extends to Fast Style Transfer, with content/style loss, Gram matrices, image optimization, and generated style-transfer outputs.',
    },
    date: { zh: '2026 年 5 月', en: 'May 2026' },
    tags: ['Python', 'PyTorch', 'VGG19', 'Computer Vision', 'Style Transfer'],
    link: 'https://github.com/JackyHu0314/Neural-Style-Transfer',
  },
  {
    id: 3,
    title: { zh: '中文外卖评论情感分析', en: 'Chinese Waimai Sentiment Analysis' },
    description: {
      zh: '一个中文 NLP 迁移学习项目，使用 PyTorch + Hugging Face Transformers 加载中文 RoBERTa / BERT，为外卖评论训练正负情感分类模型。当前已包含训练、预测、测试集评估、错例导出和混合情绪分析，能形成完整的实验闭环。',
      en: 'A Chinese NLP transfer-learning project using PyTorch and Hugging Face Transformers to fine-tune Chinese RoBERTa/BERT for waimai sentiment classification. It includes training, prediction, test-set evaluation, mistake export, mixed-sentiment analysis, and a complete experiment loop.',
    },
    date: { zh: '2026 年 4 月', en: 'April 2026' },
    tags: ['Python', 'PyTorch', 'Transformers', 'RoBERTa', 'NLP'],
    link: 'https://github.com/JackyHu0314/cn-transformer-sentiment',
  },
  {
    id: 2,
    title: { zh: 'MNIST CNN 手写数字识别', en: 'MNIST CNN Digit Recognition' },
    description: {
      zh: '基于 PyTorch 实现的手写数字识别练习项目，使用轻量级 CNN 在 MNIST 数据集上完成 0-9 分类，并支持命令行预测本地图片。当前已跑通数据加载、预处理、训练、保存权重和推理流程，是后续视觉项目的基础练习。',
      en: 'A PyTorch handwriting recognition project that trains a lightweight CNN on MNIST for 0-9 digit classification and supports command-line prediction for local images. It covers data loading, preprocessing, training, checkpoint saving, and inference as a foundation for later vision projects.',
    },
    date: { zh: '2026 年 3 月', en: 'March 2026' },
    tags: ['Python', 'PyTorch', 'torchvision', 'CNN', 'MNIST'],
    link: 'https://github.com/JackyHu0314/mnist-cnn-digit-recognition',
  },
  {
    id: 1,
    title: { zh: '个人博客', en: 'Personal Blog' },
    description: {
      zh: '这个博客本身也是我持续迭代的项目：基于 Vite + React 19 + Tailwind CSS v4 构建，支持中英双语切换、亮色 / 暗色主题、随记、项目、研究兴趣、关于页面、活跃度热力图和站点统计。',
      en: 'This blog is also an ongoing project of mine: built with Vite + React 19 + Tailwind CSS v4, with bilingual switching, light/dark themes, Journal, Projects, Research Interests, About pages, an activity heatmap, and site stats.',
    },
    date: { zh: '2026 年 3 月', en: 'March 2026' },
    tags: ['React 19', 'Vite 8', 'Tailwind CSS v4', 'React Router 7'],
    link: 'https://github.com/JackyHu0314/Blog',
  },
]
