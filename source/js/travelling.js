/* 左侧栏菜单的 tooltip
 * 把主题菜单里的 title 转成 data-tip，交给 CSS 画气泡：
 * 1. 避免浏览器原生 tooltip 和自定义气泡同时出现
 * 2. 触屏/读屏仍能通过 aria-label 读到菜单名
 * 3. 开往（外链）顺带补上新标签页打开与安全属性
 */
(function () {
  var MENU_LINK = '.menu a.ui-collection__item';
  var TRAVELLING = 'https://www.travellings.cn';

  function setup() {
    document.querySelectorAll(MENU_LINK).forEach(function (link) {
      var tip = link.getAttribute('title') || link.textContent.trim();
      if (!tip) {
        return;
      }

      link.setAttribute('data-tip', tip);
      link.setAttribute('aria-label', tip);
      link.removeAttribute('title');

      if (link.href.indexOf(TRAVELLING) === 0) {
        link.setAttribute('aria-label', '开往-友链接力');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
