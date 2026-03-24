---
title: 标签
date: 2026-03-22 20:36:24
type: tags
layout: tags
comments: false
---

<style>
/* 标签页整体样式 */
.tags-page {
  text-align: center;
  padding: 1rem;
}

.tags-page h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

/* 标签云容器 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 2rem;
}

/* 单个标签样式 */
.tag-cloud a {
  display: inline-block;
  padding: 8px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  color: #495057;
  border-radius: 30px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* 标签悬停效果 */
.tag-cloud a:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

/* 不同大小的标签（根据文章数量自动调整） */
.tag-cloud a[data-size="1"] { font-size: 12px; }
.tag-cloud a[data-size="2"] { font-size: 14px; }
.tag-cloud a[data-size="3"] { font-size: 16px; }
.tag-cloud a[data-size="4"] { font-size: 18px; }
.tag-cloud a[data-size="5"] { font-size: 20px; }

/* 统计信息 */
.tag-stats {
  text-align: center;
  margin-bottom: 2rem;
  color: #6c757d;
  font-size: 14px;
}

.tag-stats span {
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 20px;
  margin: 0 4px;
}

/* 无标签提示 */
.no-tags {
  text-align: center;
  padding: 3rem;
  color: #adb5bd;
  font-size: 1.2rem;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .tag-cloud a {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: #e2e8f0;
  }
  .tag-cloud a:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  .tag-stats span {
    background: #2d3748;
    color: #e2e8f0;
  }
}
</style>

<div class="tags-page">
  <h1>🏷️ 标签云</h1>
  <div class="tag-stats">
    📊 共 <span id="tagCount">0</span> 个标签
  </div>
  <div id="tag-cloud" class="tag-cloud">
    <div class="no-tags">暂无标签，快去给文章添加标签吧~</div>
  </div>
</div>

<script>
// 获取标签数据
fetch('/tags/index.json')
  .then(res => res.json())
  .catch(() => {
    // 如果 index.json 不存在，尝试从页面获取
    return fetch('/search.json');
  })
  .then(res => res.json())
  .then(data => {
    // 统计标签
    const tagMap = new Map();
    
    if (Array.isArray(data)) {
      // 从文章列表统计标签
      data.forEach(post => {
        if (post.tags) {
          post.tags.forEach(tag => {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
          });
        }
      });
    } else if (data.tags) {
      // 从标签索引获取
      Object.keys(data.tags).forEach(tag => {
        tagMap.set(tag, data.tags[tag].length);
      });
    }
    
    // 转换为数组并排序
    const tags = Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    // 更新标签数量
    document.getElementById('tagCount').innerText = tags.length;
    
    // 生成标签云
    const container = document.getElementById('tag-cloud');
    if (tags.length === 0) {
      container.innerHTML = '<div class="no-tags">✨ 暂无标签，快去给文章添加标签吧~</div>';
      return;
    }
    
    // 计算标签大小（根据数量分布）
    const maxCount = Math.max(...tags.map(t => t.count));
    const minCount = Math.min(...tags.map(t => t.count));
    
    container.innerHTML = tags.map(tag => {
      // 计算大小等级 (1-5)
      let size = 3;
      if (maxCount > minCount) {
        size = 1 + Math.floor((tag.count - minCount) / (maxCount - minCount) * 4);
      }
      
      return `<a href="/tags/${encodeURIComponent(tag.name)}/" data-size="${size}" title="${tag.count} 篇文章">
        ${tag.name} <span style="opacity:0.7; font-size:0.8em;">(${tag.count})</span>
      </a>`;
    }).join('');
  })
  .catch(err => {
    console.error('加载标签失败:', err);
    document.getElementById('tag-cloud').innerHTML = '<div class="no-tags">⚠️ 加载标签失败，请刷新重试</div>';
  });
</script>