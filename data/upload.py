#!/usr/bin/python
#coding:utf-8

import io
import json
import codecs
import requests
import os
# import time
# _year='2018'
arr=['2011','2012','2013','2014','2015','2017','2018']
# arr=['2011']
for _year in arr:
	filename=(_year+'.csv')
	text=io.open(filename,'r',encoding='utf-8').read()
	# text.encode('utf8')
	lines=text.split(_year+',')
	# print(key)


	for line in lines:
		# try:
		# print(line)
		line=line.replace('"','');
		col=line.split(',')
		if len(col)<2:
			print('skip: '+line)
			os.system("pause")
			continue
		# print(col)
		# os.system("pause")

		# _year=
		# print(col[0])
		str_=col[0]
	
		_type='photo'
		if str_=="文字":
			_tpye='text'
		if str_=="短片":
			_type='video'


		_title=col[1]
		_author=col[2]
		
		if len(col)<3:
			continue
		_keyword=col[3]

		_text=''
		if len(col)>4:
			_text=col[4]

		_file=''
		if len(col)>5:
			_file=col[5]

		_data={'year':_year,'type':_type,'author':_author,'title':_title,'keyword':_keyword,'text':_text,'file':_file}
		# print(_data)
		# os.system("pause")

		r=requests.post("http://127.0.0.1/youngvoice/upload/data.php",data=_data)
		# print(r.text)
	# os.system("pause")
	# except Exception as e:
	# 	print(e)


# with codecs.open('keyword.json','w',encoding='utf-8') as out_:
# 	out_.write(json.dumps(data,ensure_ascii=False,encoding='utf-8'))


# _data={'year':_year,'type':'test','author':'test','title':'test','keyword':'test','text':'test','file':'test'}
# r=requests.post("http://127.0.0.1/youngvoice/upload/data.php",data=_data)
# print(r.text)