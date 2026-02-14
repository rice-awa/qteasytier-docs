import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://qtet.070219.xyz",
  integrations: [
    starlight({
      title: "QtEasyTier",
      favicon: "/favicon.ico",
      logo: {
        src: "./src/assets/logo.png",
      },
      //routeMiddleware: "./src/routeData.ts",
      defaultLocale: "root", // 可选
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN", // lang 是 root 语言必须的
        },
      },

      // 导航栏配置
      sidebar: [
        { slug: "docs-home" },
        {
          label: "使用说明",
          items: [
            "instructions/install",
            "instructions/simple-using",
            "instructions/oneclick",
          ],
        },
        {
          label: "服务器指南",
          items: [
            "servers/server-instruction",
            "servers/public-servers-list",
            "servers/deploy-personal",
            "servers/deploy-public",
            "servers/nat-traversal",
          ],
        },
        {
          label: "部分使用场景",
          items: ["using/mc"],
        },
        {
          label: "其他",
          items: ["other/donate", "other/disclaimer"],
        },
      ],
    }),
  ],
});
