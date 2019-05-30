#### 打开新的窗口

```js
openWin() {
  let url = 'http://www.godcz.com';                             //转向网页的地址;
  let name = 'add';                            //网页名称，可为空;
  let iWidth = 1050;                          //弹出窗口的宽度;
  let iHeight = 750;                         //弹出窗口的高度;
  //获得窗口的垂直位置
  let iTop = (window.screen.availHeight - 30 - iHeight) / 2;
  //获得窗口的水平位置
  let iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
  window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
  // window.open("AddScfj.aspx", "newWindows", 'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
}
```

####　下载

```js
// 下载
  download(url) {
    return request({
      timeout: 60000,
      url: url,
      method: 'get',
      responseType: 'blob'
    });
  }
  download(alink).then(res => {
    this.loading.close();
    const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob);
    downloadElement.href = href;
    let filename = 'filename.xlsx';
    downloadElement.download = filename;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  });
```
