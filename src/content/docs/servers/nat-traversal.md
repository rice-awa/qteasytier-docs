---
title: "内网穿透搭建服务器"
---

## 内网穿透技术

内网穿透是指将位于内网中的服务器的某些端口通过某种技术手段，映射到公网上，使得公网中的客户端可以访问到内网中的服务器。

目前常用的技术有`Frp`、`Ngrok`等，它们通过在公网服务器上搭建代理服务，将公网流量转发到内网中的服务器，实现内网穿透。当然，如果您的NAT类型为**NAT1**（完全锥形NAT），则可以使用`STUN`协议实现内网穿透。

:::tip
NAT1（完全锥形NAT）是指NAT设备对所有来自同一内网IP的流量，都映射到同一个公网IP和端口。这样外部设备只需要知道公网IP和端口，就可以访问到内网中的服务器，这是STUN协议的基础。
:::

下面，我们分别介绍这两种技术的搭建过程，代理服务器以`Frp`为例, STUN穿透以`Lucky`工具为例。

## 使用Frp搭建服务器节点

======文档建设中======

## 使用Stun搭建服务器节点

本部分内容基于[Lucky](https://lucky666.cn/)或其他STUN内网穿透软件实现，以下以Lucky为例。

### 功能介绍
STUN（Session Traversal Utilities for NAT）内网穿透技术可以帮助解决因NAT（Network Address Translation）技术所带来的网络连接问题。STUN技术允许**NAT1**用户获取公网端口，通过路由端口转发或者LUCKY内置转发，将内网服务端口暴露到外网，从而实现内网穿透的目的。

### 使用前需知
STUN功能提供的端口穿透仅用于体验，无法保证端口变化的频率。请注意，对于与STUN稳定性相关的问题，无法提供技术支持。同时，我们也不提供任何关于如何访问内网的无公网v4方案。

> STUN内网穿透基础使用说明详见[STUN内网穿透](https://lucky666.cn/docs/modules/stun)

### 实现步骤
1. 成功实现STUN内网穿透
2. 通过动态域名(DDNS)绑定家庭宽带公网Ipv4地址
3. 获取STUN内网穿透端口变化
   - （不推荐）[使用邮件通知端口变化情况](https://www.bilibili.com/read/cv34705222/?from=readlist&opus_fallback=1)
   - （推荐）[使用lucky-DDNS配置传递IP及端口变化](https://www.bilibili.com/read/cv41904858/?from=readlist&opus_fallback=1)
   - 通过HTML网页、使用Cloudflare的重定向规则等方法通知端口变化情况
4. 通过DNS的TXT记录传递IP及端口
   - 记录名称：要更新的域名
   - 选择记录类型：TXT
   - 记录内容：填写要添加到TXT记录中的内容 如：tcp://{STUN_规则名_ADDR}
> 优点：简单易行
> 缺点：DNS记录在全球范围内的传递需要时间，根据各地运营商DNS同步策略而定，一般不超过30分钟。