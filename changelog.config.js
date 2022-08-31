// changelog配置，commit 规则也在这里进行配置
// 参考文档：https://www.npmjs.com/package/git-cz

module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'perf'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'issues'],
  scopes: [],
  // 翻译了一下描述部分
  types: {
    chore: {
      description: '跟仓库主要业务无关的构建/工程依赖/工具等功能改动（比如新增一个文档生成工具）',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: '更新了文档（比如改了 Readme）',
      emoji: '✏️',
      value: 'docs',
    },
    feat: {
      description: '一个新的特性',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: '修复bug',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: '优化了性能的代码改动',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: '一些代码结构上优化，既不是新特性也不是修 Bug（比如函数改个名字）',
      emoji: '💡',
      value: 'refactor',
    },
    release: {
      description: 'Create a release commit',
      emoji: '🏹',
      value: 'release',
    },
    style: {
      description: '代码的样式美化，不涉及到功能修改（比如改了缩进）',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: '新增或者修改已有的测试代码',
      emoji: '💍',
      value: 'test',
    },
    messages: {
      type: '选择commit类型:\n',
      customScope: '选择此提交影响的范围:',
      subject: '本次 commit 的简短描述:\n',
      body: '本次 commit 的详细描述:\n ',
      breaking: '列出所有更改:\n',
      footer: 'commit关联的Issues, e.g #123:',
    },
  },
};
