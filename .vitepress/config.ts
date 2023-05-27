import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Feather",
  description: "Feather开发者手册",
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/feather-icon-256.ico' }]
  ],
  themeConfig: {
    logo: '/feather-icon-256.ico',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '海阔视界文档',
        items: [
          { text: 'JS指南', link: '/docs/hikerview/help_js' },
          { text: '$工具', link: '/docs/$/static_property' }
        ]
      }
    ],

    sidebar: [
      {
        text: '海阔视界开发者手册',
        items: [
          { text: '使用技巧', link: '/docs/hikerview/help_skill' },
          { text: '常用规则', link: '/docs/hikerview/help_rules' },
          { text: '组件样式', link: '/docs/hikerview/help_col_type' },
          { text: 'JS指南', link: '/docs/hikerview/help_js' },
          { text: '资源标识', link: '/docs/hikerview/help_tag' },
          { text: '二级列表', link: '/docs/hikerview/help_film_list_rules' },
          { text: '网页接口', link: '/docs/hikerview/help_web_bridge' },
          { text: '口令标识', link: '/docs/hikerview/help_auto_import' },
          { text: '链接跳转路由', link: '/docs/hikerview/help_link' },
          { text: '开放API接口', link: '/docs/hikerview/help_api' },
        ],
      },
      {
        text: '海阔视界$工具文档',
        items: [
          { text: '静态属性', link: '/docs/$/static_property' },
          { text: '静态方法', link: '/docs/$/static_method' },
          { text: '方法', link: '/docs/$/method' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ReflectionLab/Documents' }
    ],
    search: {
      provider: 'local',
    }
  }
})
