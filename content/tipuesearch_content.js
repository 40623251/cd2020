var tipuesearch = {"pages": [{'title': 'About', 'text': 'Course Title: Collaborative Product Design and\xa0 Practice (short name: CD) \n Repository:  https://github.com/mdecourse/cd2020 \n Project:\xa0 https://github.com/mdecourse/cd2020/projects/1 \n Gitter:  https://gitter.im/mdecourse/cd2020 \xa0 \n Web site:  https://mde.tw/cd2020 \xa0 \n Blog:  https://mde.tw/cd2020/blog \xa0 \n Presentation:  https://mde.tw/cd2020/reveal \xa0 \n \n 電腦輔助設計室與協同設計室行事曆 \n 全頁檢視 \n \n 請登入 gm 電子郵箱後, 填寫下列表單: \n 選課學員基本資料 \n 課程回饋表單 \n 協同產品設計實習自評與互評表單 \n', 'tags': '', 'url': 'About.html'}, {'title': 'Grouping', 'text': '亂數分組: \n Base upon the Dart + Python random grouping system and the\xa0 https://github.com/mdecourse/wcms-scrum1 \xa0( https://wcms-scrum1.herokuapp.com/gear_index ), we may be able to create more collaborative product design service. \n Flask Python programs can be deployed at Heroku or self install Ubuntu server. (\xa0 https://mdecp2018.github.io/finalproject-bgx/content/Heroku%20%E8%A8%AD%E5%AE%9A.html )\xa0 \n https://mde.tw/cd2020/downloads/2020spring_cd_2a_list.txt \xa0was taken from\xa0 https://osa.nfu.edu.tw/ \xa0on Feb. 19, 2020. \n The most updated list:\xa0 http://s1.mde.nfu.edu.tw:8000/?semester=1082&courseno=0767 \xa0 \n semester: 1082 \n courseno for 2a:\xa0 0767 \n courseno for 2b: 0780 \n Under https protocol use port 7443, for http use port 8000. \n Please note : since the certificate of s1.mde.nfu.edu.tw is self-signed, when use https to connect to this page, user need to first connect to\xa0 https://s1.mde.nfu.edu.tw:7443/?semester=1082&courseno=0767 \xa0to receive the ssh key to execute the following program. And also pay attention to the rules of\xa0 https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content . \n 學員名單 URL:      \n \n Dart source code for random grouping \n evenGrouping.dart: \n import \'dart:html\';\n \n  InputElement studListUrl = querySelector("#studListUrl");\n  String studUrl;\n  // 將 Label 改為 Textarea, 避免產生過程結果嵌入所在頁面\n  TextAreaElement output = querySelector("#output");\n \nmain() {\n  querySelector("#submit").onClick.listen((e) => grouping());\n}\n \ngrouping() {\n  output.innerHtml = "";\n \n  if (studListUrl.value != "") {\n    studUrl = studListUrl.value;\n  } else {\n    studUrl = \'https://mde.tw/group/downloads/2019fall_cp_1a_list.txt\';\n  }\n \n  // 組序由 1 開始\n  int gth = 1;\n  // 迴圈序號變數\n  int i;\n  int j;\n  int total;\n  int inc;\n  // 每組學員暫存數列\n  var gpList = [];\n  // 全班分組數列\n  var group = [];\n  // 各組人數數列\n  var numList = [];\n  var courseTitle = \'cd2020\';\n \n  HttpRequest.getString(studUrl).then((String resp) {\n    // 利用 trim() 去除字串最後的跳行符號, 之後再利用 split() 根據 \\n 轉為數列\n    var studList = resp.trim().split("\\n");\n    // 數列利用 shuffle() 方法以隨機方法弄亂順序\n    studList.shuffle();\n    total = studList.length;\n    output.text += "全班總計" + total.toString() + " 人\\n";\n    numList = getNumList(studList.length);\n    inc = 0;\n    for (i in numList){\n      // 列印區隔符號\n      output.text += \'=\' * 20 + "\\n";\n      output.text += "group $gth 有 " + i.toString() + " 人: \\n";\n      gpList = [];\n      for (j = 0; j < i; j++){\n        output.text += studList[j+inc] + "\\n";\n        // 在各分組數列中加入將對應的學員學號\n        gpList.add(studList[j+inc]);\n      }\n      gth = gth + 1;\n      inc = inc + j;\n        //output.text += studList[j] + "\\n";\n        // 逐步將各組暫存的分組數列加入全班分組數列中\n      gpList.sort();\n      group.add(gpList);\n    }\n    // 列出全班分組數列\n    output.text += group.toString() + "\\n";\n    // 列出已經排序後的分組名單\n    output.text += \'=\' * 25 + "\\n";\n    output.text += \'以下為排序後的各組成員名單: \\n\';\n    gth = 1;\n    /*\n    404231\n    s4052\n    4062\n    s4072\n    4082\n    5072\n    5083\n    */\n    // 先列出純文字以 \\n 跳行組員資料\n    for (i=0; i < group.length; i++){\n      // 列印區隔符號\n      output.text += \'=\' * 20 + "\\n";\n      output.text += "group $gth \\n";\n      gpList = [];\n      for (j=0; j < group[i].length; j++){\n        output.text += group[i][j] + "\\n";\n      }\n      gth = gth + 1;\n    }\n    \n    gth = 1;\n    // 最後列出超文件以 <br\\> 跳行組員資料, 包含倉儲與網站\n    for (i=0; i < group.length; i++){\n      // 列印區隔符號\n      output.text += \'\\n\' + \'=\' * 30 + "<br \\>";\n      output.text += "group $gth <br \\>";\n      gpList = [];\n      for (j=0; j < group[i].length; j++){\n          if (group[i][j].startsWith(\'4052\') || group[i][j].startsWith(\'4072\')) {\n              output.text += "Repository: <a href=\'https://github.com/s" + \n                                      group[i][j] + "/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a>" + " | Site: <a href=\'https://s" + group[i][j] + \n                                      ".github.io/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a><br \\>";\n          }\n          else {\n              output.text += "Repository: <a href=\'https://github.com/" + \n                                      group[i][j] + "/" + courseTitle +"\'>" + group[i][j] + \n                                      "</a>" + " | Site: <a href=\'https://" + group[i][j] + \n                                      ".github.io/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a><br \\>";\n          }\n      }\n      gth = gth + 1;\n    }\n  });\n}\n \nList getNumList(int total){\n  // total student number\n  // int total = 65;\n  // initial each group expect to be "eachGrp" number of people\n  int eachGrp = 10;\n  // may divide into "grpNum" number of group\n  int grpNum = total ~/ eachGrp;\n  // vacant list\n  var splits = [];\n  // find remainder when total number divid into "grpNum" number of group\n  int remainder = total % grpNum;\n  // number of people in one group by calculation\n  int calGrp = total ~/ grpNum;\n \n  for (int i = 0; i < grpNum; i++) {\n    splits.add(calGrp);\n  }\n  //print(splits);\n \n  for (int i = 0; i < remainder; i++) {\n    splits[i] += 1;\n  }\n  //print(splits);\n  return splits;\n } \n index.html: \n <h1>亂數分組:</h1>\n學員名單 URL: <input type="text" id="studListUrl" size="50" value="https://mde.tw/wcm2020/downloads/2020spring_wcm_1a_list.txt"><br />\n<input type="submit" value="開始分組" id="submit"><br />\n<textarea id="output" cols="80" rows="10"></textarea> \n style.css: \n body {\n  color: white;\n  font-size: 20px;\n}\n\ninput, select, textarea {\nfont-size: 100%;\n} \n get_student.py \n from flask import Flask, request \nfrom flask_cors import CORS\n\nimport requests\nimport bs4\nimport ssl\n\n\'\'\'\nhttps://s1.mde.nfu.edu.tw:7443/?semester=1082&courseno=0767\ncd\n2a 1082/0767\n2b 1082/0780\n\n2a 1072/0777\n2b 1072/0790\n2a 1062/0788\n2a 1062/0802\n\nwcm\n1082/0744\n\n1072/0754\n1062/0765\n\nwcmj\n1082/2418\n\'\'\'\n\napp = Flask(__name__)\nCORS(app)\n\n@app.route(\'/studlist\')\n@app.route(\'/\')\ndef studlist():\n    semester = request.args.get(\'semester\')\n    courseno = request.args.get(\'courseno\')\n    if semester == None:\n        semester = \'1082\'\n    if courseno == None:\n        courseno = \'0744\'\n    \n    url = \'https://osa.nfu.edu.tw/query/studlist_ajax.php\'\n    post_var = {\'pselyr\': semester, \'pseqno\': courseno}\n\n    result = requests.post(url, data = post_var)\n\n    soup = bs4.BeautifulSoup(result.content, \'lxml\')\n    table = soup.find(\'table\', {\'class\': \'tbcls\'})\n    data = []\n    rows = table.find_all(\'tr\')\n    for row in rows:\n        cols = row.find_all(\'td\')\n        cols = [ele.text.strip() for ele in cols]\n        data.append([ele for ele in cols if ele]) # Get rid of empty values\n    output = ""\n    for i in data[2:]:\n        #print(i[0])\n        output +=i[0] + "\\n"\n    return output\n    #return  str(pselyr) + " + " +str(pseqno)\n\n# 即使在近端仍希望以 https 模式下執行\ncontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)\ncontext.load_cert_chain(\'localhost.crt\', \'localhost.key\')\n\n# 取 flaskapp.py 中的 uwsgi 變數設定\nuwsgi = False\nif uwsgi:\n    # 表示程式在雲端執行\n    application = app\nelse:\n    # 表示在近端執行, 以 python3 wsgi.py 執行\n    app.run(host=\'127.0.0.1\', port=5443, debug=True, ssl_context=context)\n \n nginx sites-available/default settings: \n server {\n    listen 8000;\n    server_name s1.mde.nfu.edu.tw;\n    charset utf-8;\n    \n    listen 7443 ssl;\n \n    location /static {\n        alias /home/kmol2019/course_studlist/static/;\n    }\n \n    location / {\n        include uwsgi_params;\n        uwsgi_pass  127.0.0.1:8087;\n    }\n    \n    ssl_certificate /etc/stunnel/localhost.crt;\n    ssl_certificate_key /etc/stunnel/localhost.key;\n    ssl_session_timeout 5m;\n    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;\n    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";\n    ssl_prefer_server_ciphers on;\n    try_files $uri $uri/ =404;\n} \n uwsgi7.ini \n [uwsgi]\nsocket = 127.0.0.1:8087\nuid = kmol2019\ngid = kmol2019\nplugins-dir = /usr/lib/uwsgi/plugins/\nplugin = python3\nmaster = true\nlogto = /var/log/uwsgi/emperor.log\nlogfile-chown = kmol2019:kmol2019\nprocesses = 4\nthreads = 2\nchdir = /home/kmol2019/course_studlist\nwsgi-file = /home/kmol2019/course_studlist/get_student.py \n /etc/systemd/system/cmsimfly.service \n [Unit]\nDescription=uWSGI to serve CMSimfly\nAfter=network.target\n\n[Service]\nUser=kmol2019\nGroup=kmol2019\nWorkingDirectory=/home/kmol2019/uwsgi_ini\nExecStart=/usr/local/bin/uwsgi --emperor /home/kmol2019/uwsgi_ini\n\n[Install]\nWantedBy=multi-user.target', 'tags': '', 'url': 'Grouping.html'}, {'title': '2a', 'text': "group 1  Repository:  40723104  | Site:  40723104 Repository:  40723107  | Site:  40723107 Repository:  40723114  | Site:  40723114 Repository:  40723115  | Site:  40723115 Repository:  40723118  | Site:  40723118 Repository:  40723122  | Site:  40723122 Repository:  40723123  | Site:  40723123 Repository:  40723140  | Site:  40723140 Repository:  40723149  | Site:  40723149 Repository:  40723151  | Site:  40723151 Repository:  40723153  | Site:  40723153 Repository:  40723154  | Site:  40723154 Repository:  40723155  | Site:  40723155  ============================== group 2  Repository:  40623143  | Site:  40623143 Repository:  40723108  | Site:  40723108 Repository:  40723127  | Site:  40723127 Repository:  40723132  | Site:  40723132 Repository:  40723133  | Site:  40723133 Repository:  40723137  | Site:  40723137 Repository:  40723141  | Site:  40723141 Repository:  40723143  | Site:  40723143 Repository:  40723144  | Site:  40723144 Repository:  40723147  | Site:  40723147 Repository:  40723148  | Site:  40723148 Repository:  40723150  | Site:  40723150  ============================== group 3  Repository:  40723103  | Site:  40723103 Repository:  40723110  | Site:  40723110 Repository:  40723112  | Site:  40723112 Repository:  40723120  | Site:  40723120 Repository:  40723125  | Site:  40723125 Repository:  40723126  | Site:  40723126 Repository:  40723128  | Site:  40723128 Repository:  40723130  | Site:  40723130 Repository:  40723139  | Site:  40723139 Repository:  40723142  | Site:  40723142 Repository:  40723145  | Site:  40723145 Repository:  40723146  | Site:  40723146  ============================== group 4  Repository:  40423155  | Site:  40423155 Repository:  40723101  | Site:  40723101 Repository:  40723102  | Site:  40723102 Repository:  40723106  | Site:  40723106 Repository:  40723111  | Site:  40723111 Repository:  40723119  | Site:  40723119 Repository:  40723121  | Site:  40723121 Repository:  40723124  | Site:  40723124 Repository:  40723134  | Site:  40723134 Repository:  40723135  | Site:  40723135 Repository:  40723136  | Site:  40723136 Repository:  40723138  | Site:  40723138 \n Grouping List: \n [['40723104', '40723107', '40723114', '40723115', '40723118', '40723122', '40723123', '40723140', '40723149', '40723151', '40723153', '40723154', '40723155'], ['40623143', '40723108', '40723127', '40723132', '40723133', '40723137', '40723141', '40723143', '40723144', '40723147', '40723148', '40723150'], ['40723103', '40723110', '40723112', '40723120', '40723125', '40723126', '40723128', '40723130', '40723139', '40723142', '40723145', '40723146'], ['40423155', '40723101', '40723102', '40723106', '40723111', '40723119', '40723121', '40723124', '40723134', '40723135', '40723136', '40723138']]", 'tags': '', 'url': '2a.html'}, {'title': '2b', 'text': '============================== group 1  Repository:  40723201  | Site:  40723201 Repository:  40723206  | Site:  40723206 Repository:  40723213  | Site:  40723213 Repository:  40723215  | Site:  40723215 Repository:  40723216  | Site:  40723216 Repository:  40723223  | Site:  40723223 Repository:  40723226  | Site:  40723226 Repository:  40723229  | Site:  40723229 Repository:  40723230  | Site:  40723230 Repository:  40723241  | Site:  40723241 Repository:  40723242  | Site:  40723242 Repository:  40723246  | Site:  40723246 Repository:  40732319  | Site:  40732319  ============================== group 2  Repository:  40523253  | Site:  40523253 Repository:  40623117 \xa0| Site:  40623117 Repository:  40623252  | Site:  40623252 Repository:  40723221  | Site:  40723221 Repository:  40723222  | Site:  40723222 Repository:  40723228  | Site:  40723228 Repository:  40723236  | Site:  40723236 Repository:  40723237  | Site:  40723237 Repository:  40723240  | Site:  40723240 Repository:  40723243  | Site:  40723243 Repository:  40723244  | Site:  40723244 Repository:  40723249  | Site:  40723249 Repository:  40732331  | Site:  40732331  ============================== group 3  Repository:  40623114  | Site:  40623114 Repository:  40723203  | Site:  40723203 Repository:  40723205  | Site:  40723205 Repository:  40723207  | Site:  40723207 Repository:  40723209  | Site:  40723209 Repository:  40723218  | Site:  40723218 Repository:  40723219  | Site:  40723219 Repository:  40723227  | Site:  40723227 Repository:  40723233  | Site:  40723233 Repository:  40723239  | Site:  40723239 Repository:  40723247  | Site:  40723247 Repository:  40739214  | Site:  40739214  ============================== group 4  Repository:  40623115  | Site:  40623115 Repository:  40623144  | Site:  40623144 Repository:  40623251  | Site:  40623251 Repository:  40723204  | Site:  40723204 Repository:  40723210  | Site:  40723210 Repository:  40723212  | Site:  40723212 Repository:  40723225  | Site:  40723225 Repository:  40723232  | Site:  40723232 Repository:  40723234  | Site:  40723234 Repository:  40723238  | Site:  40723238 Repository:  40723245  | Site:  40723245 Repository:  40723250  | Site:  40723250 \n Grouping List: \n [[40723201, 40723206, 40723213, 40723215, 40723216, 40723223, 40723226, 40723229, 40723230, 40723241, 40723242, 40723246, 40732319], [40523253, 40623117, 40623252, 40723221, 40723222, 40723228, 40723236, 40723237, 40723240, 40723243, 40723244, 40723249, 40732331], [40623114, 40723203, 40723205, 40723207, 40723209, 40723218, 40723219, 40723227, 40723233, 40723239, 40723247, 40739214], [40623115, 40623144, 40623251, 40723204, 40723210, 40723212, 40723225, 40723232, 40723234, 40723238, 40723245, 40723250]]', 'tags': '', 'url': '2b.html'}, {'title': 'Grading', 'text': 'Grading percentage: \n Self-evaluation (30%) \n Peer Review (30%) \n Teacher Grading (40%) \n Grading content: \n Attendance, Github commits, website and blog maintenance, and note taking (40%) \n Assignment 1 presentation (Youtube and Reveal.js) (10%) \n Assignment 2 presentation (Youtube and Reveal.js) (10%) \n Assignment 3 presentation (Youtube and Reveal.js) (10%) \n Final Project (Youtube, Reveal.js and pdf report) (30%) \n', 'tags': '', 'url': 'Grading.html'}, {'title': 'KMOL2020', 'text': 'Create Portable Programming System for\xa0Windows 10: \n PortableGit:\xa0 https://git-scm.com/download/win \n MSYS2:\xa0 https://www.msys2.org/ \n Python 3.8.1:\xa0 https://www.python.org/downloads/ \n CMSiMDE:\xa0 https://github.com/mdecourse/cmsimde \n Flask:\xa0 https://github.com/pallets/flask \n lxml:\xa0 https://github.com/lxml/lxml \n bs4:\xa0 https://pypi.org/project/beautifulsoup4/ \n markdown:\xa0 https://github.com/Python-Markdown/markdown \n flask-cors:\xa0 https://github.com/corydolphin/flask-cors \n Pelican:\xa0 https://github.com/getpelican/pelican \n Reveal.js:\xa0 https://github.com/hakimel/reveal.js/ \n Leo Editor:\xa0 https://github.com/leo-editor/leo-editor \n SciTE:\xa0 https://www.scintilla.org/SciTEDownload.html \n Tiny C Compiler:\xa0 https://github.com/TinyCC/tinycc \n Fossil SCM:\xa0 https://www.fossil-scm.org/ \n Jupyterlab:\xa0 https://github.com/jupyterlab/jupyterlab \n Flutter:\xa0 https://github.com/flutter/flutter \n Visual Studio Code:\xa0 https://github.com/microsoft/vscode', 'tags': '', 'url': 'KMOL2020.html'}, {'title': 'Python', 'text': 'Create a Portable Python: \n Install Python 3.8.1 without pip \n PYTHONPATH \n get-pip.py \n start.bat \n @echo off\nset Disk=y\nsubst %Disk%: "data"\n\n%Disk%:\n\nset HomePath=%Disk%:\\home_mdecourse\nset HomeDrive=%Disk%:\\home_mdecourse\nset Home=%Disk%:\\home_mdecourse\nset USERPROFILE=%Disk%:\\home_mdecourse\n\nREM 將系統 Python 程式的 io 設為 utf-8\nset PYTHONIOENCODING="utf-8"\n\nset PYTHONPATH=%Disk%:\\py38\\DLLs;%Disk%:\\py38\\Lib;%Disk%:\\py38\\Lib\\site-packages;\nset PYTHONHOME=%Disk%:\\py38\n\nREM for flutter\nset java_home=%Disk%:\\java\\jdk8u222-b10\nset ANDROID_SDK_home=%Disk%:\\home_mdecourse\nset GRADLE_USER_home=%Disk%:\\home_mdecourse\nset ANDROID_SDK_ROOT=%Disk%:\\android\\sdk\nset ANDROID_Home=%Disk%:\\android\\sdk\\tools\n\nREM for putty\nset GIT_HOME=%CDisk%:\\portablegit\\bin\\\nset GIT_SSH=%Disk%:\\putty\\plink.exe\n\nset path_python=%Disk%:\\py38;%Disk%:\\py38\\Scripts;\nset path_msys2=%Disk%:\\msys64\\mingw64\\bin;\nREM coreutils is for compiling fossil scm\nset path_coreutils=%Disk%:\\coreutils-5.3.0\\bin;%Disk%:\\depends22_x64;\nset path_tcc=%Disk%:\\tcc;\nset path_cmake=%Disk%:\\cmake-3.10.1-win64-x64\\bin;\nset path_nodejs=%Disk%:\\nodejs;%Disk%:\\nodejs\\appdata\\roaming\\npm;\nset path_git=%Disk%:\\portablegit\\bin;\nset path_xming=%Disk%:\\Xming;\nset path_latex=%Disk%:\\Pandoc;%Disk%:\\TinyTeX\\bin\\win32;\nset path_flutter=%Disk%:\\java\\jdk8u222-b10\\bin;%Disk%:\\flutter\\bin;%Disk%:\\Android\\sdk;%Disk%:\\Android\\sdk\\tools;%Disk%:\\Android\\sdk\\tools\\bin;%Disk%:\\Android\\sdk\\platform-tools;%Disk%:\\flutter\\bin\\cache\\dart-sdk\\bin;%Disk%:\\vscode;\nset path_putty=%Disk%:\\putty;\n\npath=%Disk%:;%path_python%;%path_msys2%;%path_tcc%;%path_git%;%path_cmake%;%path_coreutils%;%path_flutter%;%path_putty%;%path_latex%;%path%;\n\nstart /MIN cmd.exe\nstart /MIN cmd.exe\nstart /MIN cmd.exe\nstart /MIN cmd.exe\n\nstart /MIN %Disk%:\\kmolScite\\SciTE.exe\nstart /MIN %Disk%:\\kmolScite\\SciTE.exe\n\nExit \n', 'tags': '', 'url': 'Python.html'}, {'title': 'Microcontroller', 'text': 'Login to your gm email and download\xa0 \n 2019_ArduinoApplied.pdf \n and\xa0 \n 2018_BeginningRoboticsWithRaspberry.pdf \n Arduino Simulator \n https://www.sites.google.com/site/unoardusim/ \n PIC Simulator Labortory \n https://github.com/lcgamboa/picsimlab \n https://lcgamboa.github.io/ \n https://mplabxpress.microchip.com/mplabcloud/ide \n Login to your gm account and  download all Microchip related tools . \n Rasberry Pi \n https://github.com/gavinlyonsrepo/RpiMotorLib \n Python-exemplary \n http://www.python-exemplary.com/ \n', 'tags': '', 'url': 'Microcontroller.html'}, {'title': 'MSYS2', 'text': 'https://www.msys2.org/ \n Y:\\py38\\Lib\\distutils\\distutils.cfg \n [build]\ncompiler=mingw32\n\n[build_ext]\ncompiler=mingw32 \n Reference \n https://github.com/KmolYuan/pyslvs/blob/master/platform/set_pycompiler.bat \n', 'tags': '', 'url': 'MSYS2.html'}, {'title': 'Pyslvs-UI', 'text': 'Compile and install python_solvespace library \n Pyslvs-UI requires  https://github.com/mdecourse/solvespace \xa0python_solvespace pyd\xa0dynamic library of the python branch. \n git clone --recurse-submodules  https://github.com/mdecourse/solvespace.git \xa0 \n cd solvespace \n git checkout python \n cd cython \n python setup.py install \n Compile and install Pyslvs-UI \n git clone --recurse-submodules  https://github.com/mdecourse/pyslvs-UI.git \n cd pyslvs-UI \n python -m pip install -r requirements.txt \n mingw32-make install \n', 'tags': '', 'url': 'Pyslvs-UI.html'}, {'title': 'Topics', 'text': '\n The products of the twenty - first century should be a sustainable service, designed to provide users with a quality of life experience. \n 二十一世紀的產品應該是一種永續服務, 旨在為用戶提供優質的生活體驗. \n KMOLab \n \n Topic 0: From Digital\xa0to Industrial + Engineering Product Design Collaboration \n Login to your gm email account and download \n DigitalProductCollaboration.pdf \n IndustrialAndEngineeringProductDesignCollaboration.pdf \n Can we create an english-english vocabulary collection service? \n https://www.autoitscript.com/forum/files/file/419-dictionary_bigdb/ \n Topic 1: Mechanical Design Process \n Login to your gm email account and download  MechanicalDesignProcess.pdf . \n (Can we build online tools to facilitate these processes?) \n Successful Design \n Building the\xa0Design \n Structural Considerations \n Materials and\xa0Processes \n Topic 2: Mechatronic System Design \n Login to your gm email account and download  MSModelingAndTFApproaches.pdf . \n (Can we build online tools to facilitate these processes?) \n Mechatronic Systems \n Mathematical Modeling \n Transfer Function Approaches \n Login to your gm email account and download  MechatronicDesignCases.pdf . \n DC Motor Velocity and Position Control \n Balancing Robot Control \n Magnetic Levitation System \n Topic 3: Mechatronic Future and Challenges \n Login to your gm email account and download  MechaFutureAndChallenges.pdf . \n Mechatronic Futures \n Mechatronics Disrupted \n Challenges in Mechatronics \n Login to your gm email account and download  MechaEducFutureNeed.pdf . \n Education to meet future need \n Login to your gm email account and  download all reference files .', 'tags': '', 'url': 'Topics.html'}, {'title': 'Mechanical Design', 'text': 'Frontend - backend and design process \n Frontend Dart: \n // 因為要使用超文件表單, 因此導入 html 程式庫\nimport "dart:html";\n\n// 每一個 Dart 程式都從 main() 開始執行\nmain() {\n  // 透過表單, 取得使用者輸入的溫度值, 語法為數字加上 C 或 F\n  InputElement tempInput = querySelector("#temp");\n  querySelector("#submit").onClick.listen((e) => pyconvert(tempInput.value));\n}\n\npyconvert(String data) {\n  // 準備將轉換結果顯示在 output Label 區\n  LabelElement output = querySelector("#output");\n  // 將 data 送到遠端 python flask 程式區\n  request(data);\n} // pyconvert\n\nrequest(String asset) {\n  var response = document.querySelector(\'#response\');\n  var url = \'http://localhost:5000/${asset}\';\n\n  HttpRequest.getString(url, onProgress: (_) => response.text = \'Loading ...\')\n      .then((resp) => response.setInnerHtml(\'<pre>${resp}</pre>\'))\n      .catchError((error) => response.text = \'ERROR !!!: ${error.toString()}\');\n}\n\n/* 以下為 Python Flask 伺服器端的程式碼, 可以接受 Dart 前端送來的字串, 進行溫度轉換運算後, 將結果傳回\nimport flask\n# 導入 flask_cors 模組中的 CORS\n# 目的在讓伺服器可以被遠端的 Dart 程式跨網域擷取資料\nfrom flask_cors import CORS\n\napp = flask.Flask(__name__)\n# 讓應用程式啟動後, 可以跨網域被截取資料\nCORS(app, support_credentials=False)\nglobal data\n\n@app.route(\'/\', methods =[\'POST\', \'GET\'])\ndef root():\n    if flask.request.method == \'POST\': \n        data = flask.request.form[\'data\'] \n        print(data)\n        resp = {"data": data}\n        output = flask.json.dumps(data)\n    else:\n        # 將 Python 中的 dictionary 資料透過 json 格式送出後\n        # 讓遠端的 Dart 程式可以擷取\n        data = {"a": 1, "b": data+"yen", "c": "字串"}\n        output = flask.json.dumps(data)\n    return output\n    \n@app.route(\'/<name>\', methods=[\'POST\', \'GET\'])\ndef convert(name):\n    #name[-1] 為字串最後一個字元\n    # name[:-1] 則為數字\n    if name[-1] is "F" or name[-1] is "f":\n        # 表示要將華氏溫度轉為攝氏\n        return FtoC(name[:-1])\n    else:\n        return CtoF(name[:-1])\n    \n#celsius = 5/9 ( fahrenheit − 32)\n#定義一個 celsius 轉 fahrenheit  函式\ndef CtoF(c):\n    return "攝氏" + c + "度=華氏" + str(round(int(c)*9/5 + 32, 2)) + "度"\n\n#定義一個 celsius 轉 fahrenheit  函式\ndef FtoC(f):\n    return "華氏" + f + "度=攝氏" + str(round((int(f) - 32)*5/9, 2)) + "度"\n\n\nif __name__ == \'__main__\':\n    # 內建的 Flask Web 啟動埠號為 5000\n    app.run()\n*/ \n Backend Python: \n import flask\n# 導入 flask_cors 模組中的 CORS\n# 目的在讓伺服器可以被遠端的 Dart 程式跨網域擷取資料\nfrom flask_cors import CORS\n \napp = flask.Flask(__name__)\n# 讓應用程式啟動後, 可以跨網域被截取資料\nCORS(app, support_credentials=False)\nglobal data\n \n@app.route(\'/\', methods =[\'POST\', \'GET\'])\ndef root():\n    if flask.request.method == \'POST\': \n        data = flask.request.form[\'data\'] \n        print(data)\n        resp = {"data": data}\n        output = flask.json.dumps(data)\n    else:\n        # 將 Python 中的 dictionary 資料透過 json 格式送出後\n        # 讓遠端的 Dart 程式可以擷取\n        data = {"a": 1, "b": data+"yen", "c": "字串"}\n        output = flask.json.dumps(data)\n    return output\n     \n@app.route(\'/<name>\', methods=[\'POST\', \'GET\'])\ndef convert(name):\n    #name[-1] 為字串最後一個字元\n    # name[:-1] 則為數字\n    if name[-1] is "F" or name[-1] is "f":\n        # 表示要將華氏溫度轉為攝氏\n        return FtoC(name[:-1])\n    else:\n        return CtoF(name[:-1])\n     \n#celsius = 5/9 ( fahrenheit − 32)\n#定義一個 celsius 轉 fahrenheit  函式\ndef CtoF(c):\n    return "攝氏" + c + "度=華氏" + str(round(int(c)*9/5 + 32, 2)) + "度"\n \n#定義一個 celsius 轉 fahrenheit  函式\ndef FtoC(f):\n    return "華氏" + f + "度=攝氏" + str(round((int(f) - 32)*5/9, 2)) + "度"\n \n \nif __name__ == \'__main__\':\n    # 內建的 Flask Web 啟動埠號為 5000\n    app.run() \n What can these programs do to the mechanical design process? \n Flutter  mobile frontend and Python backend? \n Learning Python? \n Login to gm account and download \n 2019_ABeginnersGuideToPython3Programming.pdf \n and \n 2019_AdvancedGuideToPython3Programming.pdf \n Learning Dart and Flutter? \n Login to gm account and download\xa0 \n 2020_ QuickStartGuideToDartProgramming.pdf \n and \n 2019_BeginningAppDevelopmentWithFlutter.pdf \n Flutter  mobile frontend, Python backend and  CoppeliaSim  through  remote API ? \n Flutter  mobile frontend,  Cython  backend and  Solvespace  through  Python Geometric Constranin Solver ? \n Learning C++? \n Login to gm account and download  2018_Book_BeginningC17.pdf . \n Also check into  MSYS2  for reference. \n Where can we save the data during a web/mobile frontend and backend based design process? \n Login to gm account and download \n 2019_BuildingRESTAPIsWithFlask.pdf \xa0 \n and \n 2010_TheDefinitiveGuideToSQLite.pdf \n Also check into\xa0 https://github.com/chiamingyen/pygrouf ,\xa0 https://github.com/mdecourse/wcms-scrum1 \xa0and\xa0 https://wcms-scrum1.herokuapp.com/gear_index \xa0for reference. \n Recall application of  Pro/Weblink \n Take  Pro/Weblink  as an example. Javascript is used as the frontend working with a local host Pro/Engineer under the trusted Internet Explorer environment to enable programmable 3d mechanical Part and Assembly processes. \n Download  2002_ProEweblinkUserGuide.pdf \n', 'tags': '', 'url': 'Mechanical Design.html'}, {'title': 'Topic1Author', 'text': 'Login to your gm account and download  2019_DesigningElectronicProductEnclosures.pdf \xa0(where the topic1 material taken from) \n Author’s Credentials \n By listing some of the corporations where I have worked, this should provide some background on where my experience comes from. \n Lincoln Electric Company \n I started in the drafting room running blue prints in 1964. By taking night school classes in drafting, I soon was given the chance to apprentice as a tool and die designer where I got experience in the basic skills of designing jigs and fixtures. Lincoln Electric is "world famous" for their profit sharing program and work ethic. (I would later teach beginning drafting at Chabot College, California, in 1980). \n Lawrence Livermore National Laboratory \n My first job after getting my master’s degree in mechanical engineering (from the University of Arizona, 1977) was in the Material Fabrication Group. Our mission to design and build a lathe capable of 0.000001 inch accuracy provided great experience. Additional experience in the design of experiments for laboratory programs proved invaluable for future work. \n Intel Corporation \n This is my first experience with the design of computer housings for "silicon valley." Intel was just expanding beyond chips and printed circuit board products, and they had plans to get into building computer systems. I’m on the cover of "Intel News" shown trying to measure fan noise of a prototype "tower computer" in 1982. I was very fortunate to experience the tremendous work ethic in the culture at Intel. \n Sytek Corporation \n This is my first design position where I had the responsibility of taking my own design thru all the stages of prototyping, tooling, testing, and manufacturing delivery. We installed our first CAD systems (CADAM) in 1986. \n This is the first company where I assumed some management responsibility and thus saw a more complete picture of where (mechanical) product design fits into a larger picture of the entire product delivery process. \n Trimble Navigation Limited \n This is my first designer position where I designed and documented with a CAD system (AutoCAD). \n My work here spanned nearly 25 years from 1988 thru 2013. We installed our first 3D CAD system (ProEngineer) in 1992. Trimble’s products (portable GPS instruments) are intended to work in outdoor environments, and their customers need these products to function under adverse conditions (shock, vibration, temperature extremes, rain). \n I spent my early years in the Marine Division, moved on to the Survey Division, and became manager of a Mechanical Engineering Group in 1995. While manager, I was responsible for budgeting, resourcing, prioritization, design, and documentation. I also served as (overall) project manager on a number of projects and thus experienced how the "mechanical piece" fits into the overall design of products.   All of the above corporations had different accepted working processes for overall product design and different corporate cultures to operate in. It’s hoped that most of the words written here serve as a valuable contribution to the reader’s design process regardless of the corporate cultures they are in. The above work resume certainly spans a history of both how computers came to be used in the design process and how the industries evolved in their design processes. The design tools and products made for the marketplace will continue to evolve in the future, but we will still need basic mechanical design fundamentals to positively affect the overall product design process. \n', 'tags': '', 'url': 'Topic1Author.html'}, {'title': 'Assignments', 'text': "Assignment 1: \n Due March 25, 2020  for class 2a and  March 26, 2020  for class 2b. \n 1. Describe how\xa0to\xa0do an efficient random grouping for this\xa0course or do the roll calling randomly? \n 2. Describe how to prepare a portable Python programming system for Windows 10 64bit system to allow one the maintain  CMSiMDE  website,  Pelican blog  and  Reveal.js  presentation on  Github ? \n 3. What do you need to know from\xa0 http://www.coppeliarobotics.com/helpFiles/index.html \xa0to implement a four-wheeled robot? \n Assignment 2: \n Due April 22, 2020  for class 2a and  April 23, 2020  for class 2b. \n 1.\xa0According to the material of Topic 0 and Topic 1, can you describe specifically what the mechanical design team need to do for accomplishing Assignment 1's\xa0 four wheeled robot. \n 2. What do you need to know from\xa0 https://cyberbotics.com/doc/guide/index   \xa0to implement a four-wheeled robot? \n W9: Midterm presentation \n Assignment 3: \n Due  May 27, 2020  for class 2a and  May 28, 2020  for class 2b. \n According to the reading of Topic 2 and Topic 3, propose a Mechatronic project by using  CoppeliaSim  or  Webots  and  Onshape . \n Final project: \n Due June 24, 2020. \n Realize\xa0your Mechatronic project and conclude with a presentation video and pdf report.", 'tags': '', 'url': 'Assignments.html'}, {'title': 'Reference', 'text': '', 'tags': '', 'url': 'Reference.html'}, {'title': 'Dart', 'text': 'https://flutter.dev/docs/reference/tutorials \n https://www.raywenderlich.com/4529993-getting-started-with-flutter \n https://www.raywenderlich.com/flutter/ \n https://github.com/SpinlockLabs/github.dart \n https://book.flutterchina.club/ \n https://github.com/CarGuo/gsy_flutter_book \n https://www.youtube.com/playlist?list=PLV2Iw811jLpWdAHToUqTuWYhYbjVfwS80 \n https://flutterbyexample.com/', 'tags': '', 'url': 'Dart.html'}, {'title': 'SQLite', 'text': 'Build iOS Database Apps with Swift and SQLite (2016) \n https://link.springer.com/book/10.1007/978-1-4842-2232-4 \n Introducing SQLite for Mobile Developers (2015) \n https://link.springer.com/book/10.1007/978-1-4842-1766-5 \n The Definitive Guide to SQLite (2010) \n https://link.springer.com/book/10.1007/978-1-4302-3226-1 \n SQLite3 and C: \n Compiled with  MSYS2 \xa0and  SQLite3 : \n gcc sqlite_ex.c -lsqlite3 -o sqlite_ex.exe \n sqlite_ex.c query vocabulary from\xa0 https://github.com/mdecourse/lookupdict/blob/master/webster_vocabulary.sqlite \n sqlite_ex.c source code: \n #include <sqlite3.h>\n#include <stdio.h>\n\nint callback(void *, int, char **, char **);\n\nint main(void) {\n    \n    sqlite3 *db;\n    char *err_msg = 0;\n    \n    int rc = sqlite3_open("webster_vocabulary.sqlite", &db);\n    \n    if (rc != SQLITE_OK) {\n        \n        fprintf(stderr, "Cannot open database: %s\\n", \n                sqlite3_errmsg(db));\n        sqlite3_close(db);\n        \n        return 1;\n    }\n    \n    char *sql = "SELECT * FROM word where word=\'ABORT\'";\n        \n    rc = sqlite3_exec(db, sql, callback, 0, &err_msg);\n    \n    if (rc != SQLITE_OK ) {\n        \n        fprintf(stderr, "Failed to select data\\n");\n        fprintf(stderr, "SQL error: %s\\n", err_msg);\n\n        sqlite3_free(err_msg);\n        sqlite3_close(db);\n        \n        return 1;\n    } \n    \n    sqlite3_close(db);\n    \n    return 0;\n}\n\nint callback(void *NotUsed, int argc, char **argv, \n                    char **azColName) {\n    \n    NotUsed = 0;\n    \n    for (int i = 0; i < argc; i++) {\n\n        printf("%s = %s\\n", azColName[i], argv[i] ? argv[i] : "NULL");\n    }\n    \n    printf("\\n");\n    \n    return 0;\n} \n SQLite3 and Python: \n https://github.com/mdecourse/wcms-scrum1 \n SQLite3 and Dart: \n dart:ffi only for mobile and desktop \n from\xa0 https://www.sqlite.org/download.html \xa0download\xa0C source code as an amalgamation \n use  MSYS2 : \n gcc -shared sqlite3.c -o sqlite3.dll \n to get sqlite3.dll \n use git\xa0sparse-checkout from\xa0 https://github.com/dart-lang/sdk \xa0get \n https://github.com/dart-lang/sdk/tree/master/samples/ffi/sqlite \n cd y:\\tmp mkdir dart_sqlite cd dart_sqlite git init git config core.sparsecheckout true git remote add -f origin https://github.com/dart-lang/sdk.git echo samples/ffi/sqlite >> .git/info/sparse-checkout git pull origin master \n cd y:\\tmp\\ samples\\ffi\\sqlite \n pub get \n copy sqlite3.dll and  webster_vocabulary.sqlite  into\xa0y:\\tmp\\ samples\\ffi\\sqlite\\example \n use SciTE to execute main.dart: \n import "../lib/sqlite.dart";\n\nvoid main() {\n  Database d = Database("webster_vocabulary.sqlite");\n\n  Result result = d.query("select * from word where word=\'ABORT\';");\n  for (Row r in result) {\n    //String name = r.readColumnByIndex(1);\n    String word = r.readColumn("word");\n    String defn = r.readColumn("defn");\n    //print("$name $word $defn");\n    print("單字:$word 解說: $defn");\n  }\n  d.close();\n}\n \n package:js  is for web \n https://github.com/simolus3/moor/blob/master/moor/lib/src/web/sql_js.dart \n References: \n https://pub.dev/packages/f_orm_m8_sqlite \n \n \n', 'tags': '', 'url': 'SQLite.html'}, {'title': 'Fossil SCM', 'text': 'https://www.fossil-scm.org/ \n', 'tags': '', 'url': 'Fossil SCM.html'}, {'title': 'Jupyterlab', 'text': 'https://github.com/jupyterlab/jupyterlab \n', 'tags': '', 'url': 'Jupyterlab.html'}, {'title': 'AI', 'text': 'https://artint.info/2e/html/ArtInt2e.html \n https://github.com/SullyChen/Autopilot-TensorFlow \n https://towardsdatascience.com/how-a-high-school-junior-made-a-self-driving-car-705fa9b6e860 \n https://github.com/UvinduW/RCAutopilot \n', 'tags': '', 'url': 'AI.html'}]};