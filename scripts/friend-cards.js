/**
 * friend-cards.js
 * 自定义 Hexo tag: {% friendcards %}
 * 从 source/_data/links/*.yml 读取友链数据，渲染带描述（hover 显示）的友链卡片。
 * 复用 Stellar 主题的 .grid-cell.user-card 样式。
 */

'use strict';

module.exports = ctx => function (args) {
  const links = ctx.theme.config.links || {};
  const defaultAvatar = ctx.theme.config.default?.avatar || '';
  const defaultLoading = ctx.theme.config.default?.loading || '';

  // 收集所有 links 分组下的条目
  let items = [];
  for (const [group, list] of Object.entries(links)) {
    if (Array.isArray(list)) {
      items = items.concat(list);
    }
  }

  if (items.length === 0) {
    return '<p>暂无友链数据。</p>';
  }

  let html = '<div class="tag-plugin users-wrap"><div class="grid-box">';

  for (const item of items) {
    if (!item.url || !item.title) continue;

    const avatar = item.avatar || item.icon || defaultAvatar;
    const desc = item.description || '';

    html += '<div class="grid-cell user-card">';
    html += `<a class="card-link" target="_blank" rel="external nofollow noopener noreferrer" href="${item.url}">`;

    // 头像区域
    html += '<div class="lazy-box icon">';
    html += `<img class="lazy" data-src="${avatar}" onerror="javascript:this.removeAttribute('data-src');this.src='${defaultAvatar}';"/>`;
    html += `<div class="lazy-icon" style="background-image:url('${defaultLoading}');"></div>`;
    html += '</div>';

    // 名称
    html += '<div class="name">';
    html += `<span>${item.title}</span>`;
    html += '</div>';

    // 描述（hover 时渐显）
    if (desc) {
      html += '<div class="friend-desc">';
      html += `<span>${desc}</span>`;
      html += '</div>';
    }

    html += '</a>';
    html += '</div>';
  }

  html += '</div></div>';
  return html;
};

hexo.extend.tag.register('friendcards', module.exports(hexo), { ends: false });
