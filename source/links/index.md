---
title: 友情链接
date: 2026-03-22 20:36:31
---

## 我的朋友们

{% friendcards %}

<style>
/* 友链卡片遮罩覆盖层（方案 B：gallery 风格） */
.user-card .lazy-box.icon {
  position: relative;
}

/* 遮罩层：覆盖圆形头像，默认透明 */
.friend-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  border-radius: 64px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.35s ease;
  pointer-events: none;
  z-index: 2;
}

/* 描述文字：默认透明，hover 时变白 */
.friend-desc {
  color: transparent;
  font-size: 9px;
  font-weight: 500;
  line-height: 1.3;
  text-align: center;
  padding: 2px 5px;
  transition: color 0.35s ease;
  pointer-events: none;
}

/* hover 时遮罩变暗，文字浮现 */
.user-card:hover .friend-cover {
  background: rgba(0, 0, 0, 0.6);
}
.user-card:hover .friend-desc {
  color: #fff;
}
</style>
