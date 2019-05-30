### cmd

```cmd
# 查看端口
netstat -aon|findstr "80"
tasklist|findstr "2448"
```

---

### powershell

```
Start-Process notepad -Verb runas
(Get-WmiObject -query ‘select * from SoftwareLicensingService’).OA3xOriginalProductKey  （查看密钥  VK7JG-NPHTM-C97JM-9MPGT-3V66T）
```
