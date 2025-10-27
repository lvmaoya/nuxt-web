<template>
  <div class="inner">
    <div class="privacy-policy-content">
      <h1>隐私政策</h1>
      <p>
        本隐私政策适用于您使用本站的网页及相关服务。我们致力于以清晰、透明的方式说明我们如何收集、使用和保护您的信息。
      </p>

      <h2>我们收集的信息</h2>
      <ul>
        <li>访问日志（页面路径、来源链接、访问时间）。</li>
        <li>设备与浏览器信息（User-Agent、设备类型、屏幕分辨率）。</li>
        <li>交互数据（点击、滚动、停留时长等用于可用性分析的数据）。</li>
        <li>
          网络信息（IP
          可能用于安全与防滥用；在分析中可能进行匿名化或掩码处理）。
        </li>
      </ul>

      <h2>我们如何使用信息</h2>
      <ul>
        <li>网站性能监控与内容优化。</li>
        <li>统计分析以改进功能与用户体验。</li>
        <li>安全防护与故障排查。</li>
      </ul>

      <h2>Cookie 与本地存储</h2>
      <p>
        本站及第三方服务可能使用 Cookie
        或本地存储来记住您的偏好、维持会话以及进行匿名性统计分析。您可在浏览器设置中清除或关闭
        Cookie；禁用后，部分功能可能受到影响。
      </p>

      <h2>第三方服务</h2>
      <p>为实现统计与优化，本站集成以下第三方服务：</p>
      <ul>
        <li>
          Google Tag
          Manager（GTM）：用于管理第三方脚本，不直接识别您的个人身份。隐私政策：
          <a
            href="https://policies.google.com/privacy?hl=zh-CN"
            target="_blank"
            rel="noopener"
            >Google 隐私政策</a
          >
        </li>
        <li>
          Microsoft
          Clarity：用于行为分析与可用性优化，可能收集匿名化的交互数据。隐私声明：
          <a
            href="https://privacy.microsoft.com/zh-cn/privacystatement"
            target="_blank"
            rel="noopener"
            >Microsoft 隐私声明</a
          >
        </li>
      </ul>
      <p>
        我们不会出售您的个人信息；仅在法律要求或为保护本站及用户安全时披露必要信息。
      </p>

      <h2>数据保留</h2>
      <p>
        我们会在实现上述目的所需的期限内保留数据；超过期限的数据可能被汇总、匿名化或删除。
      </p>

      <h2>您的权利</h2>
      <ul>
        <li>查询与访问：您可联系我们了解与您相关的数据的总体情况。</li>
        <li>
          更正与删除：在法律允许范围内，您可申请更正或删除与您相关的数据。
        </li>
        <li>
          选择与控制：您可通过浏览器设置或反跟踪选项限制或拒绝分析性跟踪。
        </li>
      </ul>

      <h2>未成年人保护</h2>
      <p>
        本站并非面向未成年人。如您为监护人并认为未成年人向我们提供了信息，请尽快与我们联系以进行处理。
      </p>

      <h2>政策更新</h2>
      <p>
        我们可能不时更新本政策，并在页面显著位置提示。最后更新日期：2025年10月27日。
      </p>

      <h2>联系我们</h2>
      <p>
        如您对本政策有任何问题或请求，请通过页面底部的联系方式与我们取得联系。
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.inner {
  border-bottom: 1px solid var(--primary-border-color);
  padding-bottom: 50px;
  margin-bottom: 258px !important;
}
.privacy-policy-content {
  padding-top: 150px;
  background-color: #fff;
  position: relative;
  z-index: 21;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  ul {
    li {
      list-style-position: inside;
    }
  }
}
</style>
