# 小程序：日报
这是一个在钉钉小程序中使用 [rest-api-client-dingtalk-mp](https://github.com/kintone/rest-api-client-dingtalk-mp) 来连接kintone的例子。<br>
包括了对kintone记录的添加、阅览，图片的上传和下载等。

# 如何使用
### 1. 请先安装以下工具
[nodejs](https://nodejs.org/en/download/)<br>
[钉钉开发者工具](https://ding-doc.dingtalk.com/doc#/kn6zg7/zunrdk)<br>

### 2. 请把整个资源库clone或下载到本地。

### 3. 创建kintone的应用
资源库根目录下的 “日报.zip” 文件是一个kintone应用的模板文件。<br>
请导入它，在kintone中创建一个新应用。参考：[通过导入模板文件创建应用](https://help.cybozu.cn/k/zh/user/create_app/app_csv/add_app_template_file.html)

### 4. 导入钉钉小程序项目
资源库根目录下的 DailyReport 目录是一个钉钉小程序项目的目录。<br>
<br>
**4.1 安装依赖**<br>
进入 DailyReport 目录，执行以下命令
```bash
npm install
```
**4.2 修改kintoneConfig.js**<br>
根据实际情况，修改 DailyReport/common/kintoneConfig.js 文件中的 domain、username、password 和 appId 字段。<br>
```javascript
  baseUrl: 'https://xxx.cybozu.cn', //kintone的base Url
  username: 'xxx', // kintone的用户名
  password: 'xxx', // 登录密码
  appId: 'xxx', // "日报"应用的ID
```
**4.3 修改dingTalkConfig.js**<br>
根据实际情况，修改 DailyReport/common/dingTalkConfig.js 文件中的 appkey、appsecret和 userid 字段。<br>
```javascript
  appkey: 'xxx', // 用来生成访问钉钉的access_token
  appsecret: 'xxx', // 用来生成访问钉钉的access_token
  userid: 'xxx', // 钉钉上的用户id
```
**4.4 导入**<br>
以 DailyReport 目录作为小程序项目的目录，在钉钉开发者工具中导入它。<br>
![](./img/import.png?raw=true)<br>
<br>
在开发工具中选择与钉钉后台创建的日报小程序绑定<br>
![](./img/bind.png?raw=true)<br>
![](./img/ding.png?raw=true)<br>
<br>

### 5. 在钉钉开发者平台设置
**5.1 设置安全域名**<br>
根据实际情况设置kintone的域名地址和钉钉api域名地址<br>
![](./img/domain.png?raw=true)<br>

**5.2 设置服务器公网出口IP名单**<br>
将当前运行代码的电脑的公网ip设置到这里<br>
![](./img/ip.png?raw=true)<br>

**5.3 设置接口权限**<br>
设置获取用户信息和考勤的接口权限<br>
![](./img/access1.png?raw=true)<br>
![](./img/access2.png?raw=true)<br>




# License
MIT License

# Copyright
Copyright(c) Cybozu, Inc.