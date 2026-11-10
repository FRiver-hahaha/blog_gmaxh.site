/* 开往（Travellings）侧边栏入口
 * 新标签页打开，读者不会离开当前文章
 */
(function () {
  var SELECTOR = '.menu a[href^="https://www.travellings.cn"]';

  function setup() {
    document.querySelectorAll(SELECTOR).forEach(function (link) {
      link.setAttribute('aria-label', '开往-友链接力');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
