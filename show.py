#!/usr/bin/env python3
# -*- coding: utf-8 -*-


#from urllib import request, parse
#from bs4 import BeautifulSoup
#import re, ssl
from datetime import *
import pymysql, time

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

date_end = date.today()

cursor = conn.cursor()
cursor_dict = conn.cursor(cursor = pymysql.cursors.DictCursor)


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

url_dict = {}
site_domain_dict = {}

cursor.execute('select Type from indexed_dict group by type')
temp = cursor.fetchone()
for i in temp:
    





date_start = date_end - timedelta(days = date_num - 1 )

cursor_dict.execute('select Site, Domain, URL, Indexed, Date from indexed where Date >= %s and Date <= %s order by Date',(date_start, date_end))

a = 0
b = 0

while a < cursor_dict.rowcount:
    a += 1
    r_one = cursor_dict.fetchone()
    r_date = r_one['Date']
    r_url = r_one['URL']
    r_name = r_one['Site']+'.'+r_one['Domain']
    r_indexed = r_one['Indexed']
    print(str(a)+':',r_date, r_url, r_name, r_indexed)
    if r_url in url_dict:
        pass
    else:
        b += 1
        
    

print('ok!')

cursor.close()
cursor_dict.close()
conn.close()
