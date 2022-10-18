# nuxt 组件缓存模块

> 用于开启 Nuxt2 的组件缓存能力

## 使用
`vue-server-renderer` 本身支持组件级别的缓存，但需要开发者自行提供缓存对象，并对代码进行一定修改

1. 启用 `@x-drive/nuxt-component-cache`
    1. 按照 `@x-drive/nuxt-component-cache`, 使用包管理工具或者直接在 `package.json` `dependencies` 字段中新增 `@x-drive/nuxt-component-cache`
    1. 在 `nuxt.config` 中启用
1. 在希望启用缓存的组件上提供 `serverCacheKey` 方法，具体请查看文档 [Component-level Caching](https://v2.ssr.vuejs.org/guide/caching.html#component-level-caching)

## 参数

- `max` 最大缓存数量, 默认 `2000`
- `maxAge` 缓存时间, 默认 `30 分钟`
- `enable` 是否启用缓存
- `silent` 是否是静默模式