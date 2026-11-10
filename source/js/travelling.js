/* 开往（Travellings）侧边栏入口
 * 1. 把主题菜单里的 title 转成 data-tip，交给 CSS 画气泡（避免和浏览器原生 tooltip 重复）
 * 2. 新标签页打开，读者不会离开当前文章
 */
(function () {
  var SELECTOR = '.menu a[href^="https://www.travellings.cn"]';

  function setup() {
    document.querySelectorAll(SELECTOR).forEach(function (link) {
      var tip = link.getAttribute('title') || '开往';

      link.setAttribute('data-tip', tip);
      link.setAttribute('aria-label', '开往-友链接力');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.removeAttribute('title');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
