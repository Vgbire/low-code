## 功能

1. 自定义 Form 组件

- 支持配置字段、表单类型、拖拽、支持 Form.Item label、name、校验等字段配置
  <img width="1376" alt="image" src="https://github.com/Vgbire/low-code/assets/32129111/0345419a-526b-4a47-99ba-9508c343b865">

2. 代码预览、导出
   <img width="1493" alt="image" src="https://github.com/Vgbire/low-code/assets/32129111/75a482a9-eeb1-4e10-866d-2968686be1c6">
3. 自定义 Table、Modal 组件（Table 组件支持 render、title、dataIndex 等属性的配置）
   <img width="1503" alt="image" src="https://github.com/Vgbire/low-code/assets/32129111/945982c9-cd54-4923-b1ca-17d757ca723e">
   <img width="1510" alt="image" src="https://github.com/Vgbire/low-code/assets/32129111/9efe0e92-5b7e-4da5-a3d8-d7535b08475c">

## 规范

- 文件夹命名使用短横线命名
- 组件使用帕斯卡命名
- 如果文件夹是 index 的组件，则文件名也用帕斯卡

## 使用

```shell
# 安装依赖
npm install

# 启动项目
nx serve low-code

# 构建项目
nx build low-code

# 构建storybook
nx build-storybook ui

# 查看依赖关系
nx graph
```
