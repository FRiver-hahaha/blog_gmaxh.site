---
title: 友情链接
date: 2026-03-22 20:36:31
---

## 我的朋友们

{% friendcards %}

<style>
/* 友链卡片描述文字样式 */
.friend-desc {
  display: block;
  font-size: 0.8rem;
  color: var(--text-p2);
  margin-top: 2px;
  line-height: 1.3;
  /* 默认隐藏，hover 时显示 */
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
}
.user-card:hover .friend-desc {
  max-height: 3em;
  opacity: 1;
  margin-top: 4px;
}
</style>
