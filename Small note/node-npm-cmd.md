#### nvm - 管理 node 版本

- [nvm windows](https://github.com/coreybutler/nvm-windows/releases)
- liunx 直接 npm 安装

```cmd
nvm list available
nvm install
nvm use version
```

setting.txt 配置文件

```config
root: D:\system\nvm
path: D:\Program Files\nodejs
arch: 64
proxy: none
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

---

#### nvs - 管理 node 版本

- [nvs](https://zhuanlan.zhihu.com/p/63403762)

```cmd
# 安装最新的 LTS 版本
nvs add lts

# 配置为默认版本
nvs link lts

#安装其他版本
nvs add 8

# 查看已安装的版本
nvs ls

# 在当前 Shell 切换版本
nvs use 8

# 配置镜像
nvs remote node https://npm.taobao.org/mirrors/node/
nvs remote

nvs --help

```

---

#### nrm npm registry 管理

- [nrm](https://www.jianshu.com/p/2f532f8f2e19)

```cmd
# install
npm install -g nrm

# show detail
nrm ls

# change registry
nrm use [registry]

nrm -h

```

---
