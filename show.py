#!/usr/bin/env python3
# -*- coding: utf-8 -*-


#from urllib import request, parse
#from bs4 import BeautifulSoup
#import re, ssl
from datetime import *
from prettytable import PrettyTable
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


date_start = date_end - timedelta(days = date_num - 1 )
date_temp = date_start

cursor_dict.execute('select Site, Domain, URL, Indexed, Date from indexed where Date >= %s and Date <= %s order by Date',(date_start, date_end))


indexed_all = {}
a = 0
indexed_list = []
while a < cursor_dict.rowcount:
    a += 1
    r_one = cursor_dict.fetchone()
    r_date = r_one['Date']
    r_url = r_one['URL']
    r_name = r_one['Site']+'.'+r_one['Domain']
    r_indexed = r_one['Indexed']
#    indexed_list.append((str(a)+':',r_date, r_url, r_name, r_indexed))
    indexed_all[str(r_date)+':'+r_url+':'+r_name] = r_indexed
#    print(indexed_list)
print(indexed_all)

while date_temp <= date_end:
    print(date_temp)
    date_temp = date_temp + timedelta(days = 1)
#    cursor.execute('select * from indexed where Date = %s', (date_temp))


#type_list = []
#site_domain_dict = {}
cursor.execute('select ID,Value,Is_mobile from search_engine order by Order_num')
search_engine = cursor.fetchall()
cursor.execute('select Type,Value,Is_mobile,Use_search_engine from site_dict order by Order_num')
site_dict = cursor.fetchall()
for i in search_engine:
    pass

print(search_engine)
print(site_dict)


x = PrettyTable(["name", "age", "sex", "money"])
x.align["name"] = "l"  # 以name字段左对齐
x.padding_width = 1   # 填充宽度
x.add_row(["wang",20, "man", 1000])
x.add_row(["alex",21, "man", 2000])
x.add_row(["peiqi",22, "man", 3000])
print(x) 


print('ok!')

cursor.close()
cursor_dict.close()
conn.close()
