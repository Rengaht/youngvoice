#!/usr/bin/python
#coding:utf-8
import io
import json
import codecs

filename='keyword.txt'
text=io.open(filename,'r',encoding='utf-8').read()
# text=text.encode('utf8')
key=text.split('\n')
# print(key)
data={}
data['keyword']=key

with codecs.open('keyword.json','w',encoding='utf-8') as out_:
	out_.write(json.dumps(data,ensure_ascii=False))
# print(data)
# out_.write(data);