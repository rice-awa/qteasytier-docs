---
title: 公共服务器列表
---

### 以下是 QtEasyTier 收集的一些公共服务器列表

**此页面由[凉城听暖](https://blog.lctn.site/)大佬维护**

:::tip
- 数据并非实时更新，可能部分服务器已失效。
- JSON 格式符合 QtEasyTier 公共服务器列表存储的json格式，您可以直接替换或添加到安装目录下的`publuicserver.json`文件中。
:::

此外，您可以在这个[Uptime界面](https://uptime.lctn.site/status/easytier)查看这些公共服务器的运行状态。


<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-button active" data-tab="table-view">表格视图</button>
    <button class="tab-button" data-tab="json-view">JSON格式</button>
  </div>
  
  <div id="table-view" class="tab-content active">
    <div id="loading">加载中...</div>
    <table id="server-table" class="server-table" style="display: none;">
      <thead>
        <tr>
          <th>服务器地址</th>
          <th>贡献者</th>
        </tr>
      </thead>
      <tbody id="server-table-body">
      </tbody>
    </table>
    <div id="error" style="display: none; color: red;">加载失败，请刷新页面重试</div>
  </div>
  
  <div id="json-view" class="tab-content">
    <div class="json-container">
      <pre id="json-content"></pre>
    </div>
  </div>
</div>

<style>
* {
  box-sizing: border-box;
}
.tab-container {
  margin: 20px 0;
}

.tab-buttons {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid var(--border-color, #eaeaea);
}

.tab-button {
  flex: 1;                    /* 让按钮等宽 */
  padding: 10px 20px 0px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color, #666);
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 0;               /* 避免 flex 子元素溢出 */
  white-space: nowrap;
}

.tab-button[data-tab="json-view"] {
  padding: 10px 20px 15px;          /* JSON格式tab比表格视图高5px */
}

.tab-button:hover {
  color: var(--text-color-dark, #333);
}

.tab-button.active {
  color: var(--text-color-dark, #333);
  border-bottom-color: var(--text-color-dark, #333); /* 启用下边框颜色 */
  font-weight: bold;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.server-table {
  width: 100%;
  table-layout: fixed;          /* 固定列宽，由宽度定义分配 */
  border-collapse: collapse;
  font-size: 14px;
}

.server-table th,
.server-table td {
  padding: 10px;
  border: 1px solid var(--border-color, #eaeaea);
  text-align: left;
  vertical-align: middle;       /* 确保垂直居中 */
  word-break: break-word;       /* 兼容性更好的换行 */
}

.server-table th:first-child,
.server-table td:first-child {
  font-family: monospace;       /* 地址列使用等宽字体 */
  width: 70%;                   /* 地址列宽度 70% */
}

.server-table th:last-child,
.server-table td:last-child {
  width: 30%;                   /* 贡献者列宽度 30% */
}

.server-table th {
  background-color: var(--table-header-bg, #f5f5f5);
  font-weight: bold;
  font-family: monospace;       /* 表头字体与内容统一，避免视觉偏移 */
}

.server-table tr:hover {
  background-color: var(--table-hover-bg, #f9f9f9);
}

.json-container {
  background-color: var(--json-bg, #f5f5f5);
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

#json-content {
  margin: 0;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-color, #333);
  white-space: pre-wrap;        /* 自动换行，避免横向滚动条 */
  word-break: break-word;
}

#loading {
  padding: 20px;
  text-align: center;
  color: var(--text-color, #666);
}

#error {
  padding: 20px;
  text-align: center;
  color: var(--error-color, #ff4d4f);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  :root {
    --border-color: #444;
    --text-color: #ccc;
    --text-color-dark: #fff;
    --table-header-bg: #333;
    --table-hover-bg: #444;
    --json-bg: #2d2d2d;
    --error-color: #ff7875;
  }
  
  .server-table th,
  .server-table td {
    border-color: #444;
  }
  
  .server-table th {
    background-color: #333;
  }
  
  .server-table tr:hover {
    background-color: #444;
  }
  
  .json-container {
    background-color: #2d2d2d;
  }
  
  #json-content {
    color: #ccc;
  }
  
  #loading {
    color: #ccc;
  }
  
  .tab-buttons {
    border-bottom-color: #444;
  }
  
  .tab-button {
    color: #ccc;
  }
  
  .tab-button:hover,
  .tab-button.active {
    color: #fff;
    border-bottom-color: #fff;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 加载表格数据
  loadServerData();

  // 为选项卡按钮绑定事件（替代内联 onclick）
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const tabId = this.dataset.tab; // 使用 data-tab 属性获取目标
      switchTab(tabId);
    });
  });
});

function switchTab(tabId) {
  // 隐藏所有内容
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // 移除所有按钮的活跃状态
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // 显示选中的内容
  document.getElementById(tabId).classList.add('active');
  
  // 激活对应的按钮（通过 data-tab 匹配）
  const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  // 如果切换到JSON视图，加载JSON内容
  if (tabId === 'json-view') {
    loadJsonContent();
  }
}

// 从JSON文件加载数据并生成表格
function loadServerData() {
  fetch('/publicserver.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.getElementById('server-table-body');
      const loading = document.getElementById('loading');
      const table = document.getElementById('server-table');
      const error = document.getElementById('error');
      
      tableBody.innerHTML = ''; // 清空表格
      
      data.forEach(server => {
        const row = document.createElement('tr');
        const urlCell = document.createElement('td');
        const contributorCell = document.createElement('td');
        
        urlCell.textContent = server.url;
        contributorCell.textContent = server.contributor;
        
        row.appendChild(urlCell);
        row.appendChild(contributorCell);
        tableBody.appendChild(row);
      });
      
      loading.style.display = 'none';
      table.style.display = 'table';
      error.style.display = 'none';
    })
    .catch(err => {
      console.error('Error loading server data:', err);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('error').style.display = 'block';
    });
}

// 加载JSON内容
function loadJsonContent() {
  const jsonContent = document.getElementById('json-content');
  
  // 避免重复加载
  if (jsonContent.textContent) {
    return;
  }
  
  fetch('/publicserver.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      const formattedJson = JSON.stringify(JSON.parse(text), null, 2);
      jsonContent.textContent = formattedJson;
    })
    .catch(err => {
      console.error('Error loading JSON content:', err);
      jsonContent.textContent = '加载失败，请刷新页面重试';
    });
}
</script>