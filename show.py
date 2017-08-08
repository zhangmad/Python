#!/usr/bin/env python3
# -*- coding: utf-8 -*-


#from urllib import request, parse
#from bs4 import BeautifulSoup
#import re, ssl
import pymysql, time, datetime

domain = ('sina.com.cn','leju.com')
site = ('esf','zufang','m')
url = (
        'http://www.baidu.com/s?wd=',
        'http://www.so.com/s?q=',
        'http://www.sogou.com/web?query=',
        'http://so.m.sm.cn/s?q='
        )

conn = pymysql.connect(
    host = '127.0.0.1',
    port = 3306,
    user = 'test',
    password = '1234abcd',
    db = 'test',
    charset = 'utf8'
    )

date_end = time.localtime()

#cursor = conn.cursor()
#cursor_dict = conn.cursor(cursor = pymysql.cursors.DictCursor)

#cursor.close()
#conn.close()


while 1:
    s=input("input the date number:")
    try:
        if s=="" or s=='0':
            print("input must not be empty or 0.") 
            #raise Exception("input must not be empty.")
        else:
            date_num=int(s)
            break
    except ValueError as err:  
        print(err)  
#    finally:  
#        print("Goodbye!")

#print(date_start)
print(date_num)
print(date_end)

date_end_temp = time.localtime()[0:3]
print(date_end_temp)
d2 = datetime.date(date_end_temp)
d = datetime.timedelta(days = date_num)
d1 = d2 + d

print(d2,'===',d,'===',d1)







