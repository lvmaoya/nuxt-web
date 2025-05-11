/*
 * @Author: sun
 * @Date: 2022-12-23 21:10:05
 * @LastEditTime: 2023-01-07 17:20:53
 * @Description: Do not edit
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
import prismjs from 'vite-plugin-prismjs'

export default defineNuxtConfig({
  css: ["~/assets/css/normalize.css", "~/assets/css/reset.css", "~/assets/css/flex.css"],

  app: {
    buildAssetsDir: "/hello/",
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
        { name: "description", content: "书写记录日常所思所感，技术成长" },
        {
          name: "keywords",
          content: "lvmaoya,lumoyoo,个人博客",
        },
        {
          "http-equiv": "Content-Security-Policy",
          content: "upgrade-insecure-requests",
        },
      ],
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
        },
      ],
      style: [],
      script: [
        { src: "/cat/l2dwidget-client.js", async: true },
        { src: "/icon/iconfont.js", async: true },
        { src: "/clarity/index.js", async: true },
      ],
      title: "lvmaoya",
    },
    rootId: "SJX",
    keepalive: true,
  },

  plugins: [{ src: "~/plugins/editor.client.js", mode: "client" }],

  // 解决重复依赖项问题
  vite: {
    resolve: {
      dedupe: ['vue-router']
    },
    plugins: [
      prismjs({
        // 添加支持的高亮的语言, 如果需要支持全部的话改成这样:  languages: "all"
        languages: ['cpp',
          'javascript',
          'bash',
          'dart',
          'sql',
          'css',
          'html',
          'java',
          'json',
          'sass',
          'scss',
          'c',
          'log',
          'swift',
          'md',
          'nginx',
          'yaml',
          'xml',
          'shell',
          'ts'
        ],
        // 配置prism插件 toolbar是后面两个插件依赖的插件.
        // show-language: 显示语言名。
        // copy-to-clipboard: 添加复制代码功能。
        plugins: ['toolbar', 'show-language', 'copy-to-clipboard'],
        // 主题名称,支持的主题可以在 node_moduels中安装此库的目录下寻找。
        theme: "tomorrow",
        css: true
      })
    ]
  },
  modules: [
    'nuxt-lenis'
  ],
  compatibilityDate: "2025-04-25"
});