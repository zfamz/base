<!-- created time 2019-05-08 -->

#### config

```
server {
  # port
  listen       8134;
  # host
  server_name  localhost;
  server_name_in_redirect off;

      #charset koi8-r;

      #access_log  logs/host.access.log  main;

      location / {
        # window 配置
        # root   D:/new/app/ConstructionManagement/dist; 有空格用单引号包裹
        root   html;
        index  index.html index.htm;
        # vue 刷新问题
        try_files $uri $uri/ /index.html;
      }

    # 后面‘斜杠’问题 https://www.jianshu.com/p/c751250a5112
		location /api/ {
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
            # 接口地址
            proxy_pass http://172.16.42.25:7473/;
            proxy_request_buffering off;
            proxy_buffering off;
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

---

#### liunx

```cmd
# reload (nginx/sbin目录)
./nginx -s reload
sh -x ./xxx.sh
```

---

#### windows

- 下载 zip 文件
- 解压直接运行

```
cmd
# help
nginx -h
#
nginx.exe -s [relaod|stop|start]
# 检查配置
nginx -t
nginx -t -c conf\nginx.conf
```

tips：配置环境变量运行，需要加 -p 参数 设置运行路径
