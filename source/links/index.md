---
title: 友情链接
date: 2026-03-22 20:36:31
---

## 我的朋友们

{% friendcards %}

<style>
/* ===== 方案 E：卡片放大 + 描述渐显 ===== */

/* 卡片：添加过渡 */
.user-card .card-link {
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.35s ease;
}

/* hover：微放大 + 浮起阴影 */
.user-card:hover .card-link {
  transform: scale(1.06);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

/* 描述容器 */
.friend-desc {
  max-width: 100%;
}

/* 描述文字：国际博客标准 */
.friend-desc span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.45;
  color: var(--text-p3);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease 0.05s,
              transform 0.3s ease 0.05s;
}

/* hover：描述淡入 + 微上浮 */
.user-card:hover .friend-desc span {
  opacity: 1;
  transform: translateY(0);
}
</style>
