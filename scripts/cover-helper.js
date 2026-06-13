/**
 * cover-helper.js
 * 从 source/_data/covers.yml 读取封面配置，自动注入到文章 frontmatter 的 cover 字段。
 * 优先级：frontmatter cover > 单篇文章配置（按 slug） > 分类默认配置
 */

'use strict';

hexo.extend.filter.register('before_post_render', function (data) {
  // 不覆盖手动设置的 cover
  if (data.cover) return data;

  // 只处理文章类型
  if (data.layout !== 'post') return data;

  const coversData = hexo.locals.get('data')?.covers;
  if (!coversData) return data;

  // 1. 按文件名（slug）精确匹配单篇文章配置
  if (coversData.post && data.slug) {
    const postCover = coversData.post[data.slug];
    if (postCover) {
      data.cover = postCover;
      return data;
    }
  }

  // 2. 按第一个分类匹配分类默认配置
  if (coversData.category && data.categories && data.categories.length > 0) {
    const primaryCategory = data.categories.data[0]?.name;
    if (primaryCategory) {
      const catCover = coversData.category[primaryCategory];
      if (catCover) {
        data.cover = catCover;
        return data;
      }
    }
  }

  return data;
}, 5);
