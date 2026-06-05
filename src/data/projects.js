export const projects = [
  {
    id: 1,
    title: { zh: '个人博客', en: 'Personal Blog' },
    description: {
      zh: '基于 Vite + React 19 + Tailwind CSS v4 搭建的个人博客，支持中英双语切换、亮色/暗色主题，暗色模式带星空粒子特效。包含日志、项目、科研、关于等多个页面，并结合 AI 辅助开发工作流进行迭代。',
      en: 'Personal blog built with Vite + React 19 + Tailwind CSS v4. Features bilingual (zh/en) switching, light/dark themes with a starfield particle effect in dark mode, and multiple pages including Journal, Projects, Research, and About. Iterated with an AI-assisted development workflow.',
    },
    tags: ['React 19', 'Tailwind CSS v4', 'Vite', 'AI-assisted'],
    link: 'https://github.com/JackyHu0314/Blog',
  },
  {
    id: 2,
    title: { zh: 'MNIST CNN 手写数字识别', en: 'MNIST CNN Digit Recognition' },
    description: {
      zh: '基于 PyTorch 实现的手写数字识别项目，使用卷积神经网络在 MNIST 数据集上训练模型，并支持对本地图片进行数字预测。项目完整覆盖数据加载、模型训练、测试评估、权重保存和命令行推理流程。',
      en: 'Handwritten digit recognition project built with PyTorch. It trains a convolutional neural network on MNIST and supports local image prediction, covering data loading, training, evaluation, model checkpointing, and command-line inference.',
    },
    tags: ['Python', 'PyTorch', 'CNN', 'MNIST'],
    link: 'https://github.com/JackyHu0314/mnist-cnn-digit-recognition',
  },
  {
    id: 3,
    title: { zh: '中文外卖评论情感分析', en: 'Chinese Sentiment Analysis' },
    description: {
      zh: '一个用于练习 Transformer 迁移学习的中文情感分析项目。项目使用 PyTorch 与 Hugging Face Transformers 训练中文 RoBERTa / BERT 二分类模型，包含数据准备、训练、预测、测试集评估和错例分析。',
      en: 'Chinese sentiment analysis project for practicing Transformer transfer learning. It uses PyTorch and Hugging Face Transformers to train a Chinese RoBERTa / BERT binary classifier, with data preparation, training, prediction, test evaluation, and mistake analysis.',
    },
    tags: ['Python', 'PyTorch', 'Transformers', 'NLP'],
    link: 'https://github.com/JackyHu0314/cn-transformer-sentiment',
  },
]
