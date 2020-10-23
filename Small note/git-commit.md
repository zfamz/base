### commit format (header, body, footer)

```git
<type>(<scope>): <subject>
// 空行
<BLANK LINE>
<body>
// 空行
<BLANK LINE>
<footer>
```

#### Type

- feat : 新功能
- fix : bug 修复
- docs : 仅文档修改
- style : 修改格式
- refactor : 重构
- build : 构建流程，外部依赖变更
- perf : 性能优化
- test : 测试相关
- chore : 对构建过程或辅助工具和库的更改
- ci : ci 相关
- revert : 回退

#### Scope

影响范围

#### Subject

是指更改的简洁描述，长度约定在 50 个字符以内，通常遵循以下几个规范：

- 用动词开头，第一人称现在时表述，例如：change 代替 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

#### Body

对本地 commit 的详细描述，可以分成多行。

#### Footer

- 不兼容的改动（ Breaking Changes ）,通常用 BREAKING CHANGE: 开头，后面跟一个空格或两个换行符。剩余的部分就是用来说明这个变动的信息和迁移方法等。
- 关闭 Issue

### example [more](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.8sw072iehlhg)

feat

```git commit
feat($browser): onUrlChange event (popstate/hashchange/polling)

Added new event to $browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

fix

```git commit
fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead

```

style

```git commit
style($location): add couple of missing semi colons

```

feat

```git commit

```
