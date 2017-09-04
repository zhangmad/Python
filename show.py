#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from datetime import *
from prettytable import PrettyTable
import pymysql, time


conn = pymysql.connect(
    host = '127.0.0.1',
    port = 3306,
    user = 'test',
    password = '1234abcd',
    db = 'test',
    charset = 'utf8'
    )

cursor = conn.cursor()
cursor_dict = conn.cursor(cursor = pymysql.cursors.DictCursor)


#---输入查询天数---
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

date_end = date.today()
date_start = date_end - timedelta(days = date_num - 1 )
date_temp = date_start


#---根据指定日期生成数据dict模板和日期列表
indexed_all = {}    #数据dict
date_list = []  #日期列表
while 1:
    indexed_all[date_temp] = {}
    date_list.append(date_temp)
    if date_temp < date_end:
        date_temp = date_temp + timedelta(days = 1)
    else:
        break


#---查询指定日期的收录数据并插入数据dict---
cursor_dict.execute('select Site, Domain, URL, Indexed, Date from indexed where Date >= %s and Date <= %s order by Date',(date_start, date_end))
indexed_list = cursor_dict.fetchall()
for i in indexed_list:
        indexed_all[i['Date']][i['URL']+' '+'site:'+i['Site']+'.'+i['Domain']] = i['Indexed']


#---建立表头---
type_list = []  #用来定义显示顺序的表头字典列表
field_list = [] #用来显示的表头内容
#site_domain_dict = {}
cursor.execute('select ID,Value,Sort_name from search_engine order by Order_num')
search_engine = cursor.fetchall()
cursor.execute('select Type,Value,Sort_name,Use_search_engine from site_dict order by Order_num')
site_dict = cursor.fetchall()
for i_se in search_engine:
    for i_sd in site_dict:
        if i_se[0] in list(map(int,i_sd[3].split(','))):
            type_list.append(i_se[1]+' '+i_sd[1])
            field_list.append(i_se[2]+'-'+i_sd[0]+'-'+i_sd[2])


#--建立表格---
field_list.insert(0,'Date')
x = PrettyTable(field_list)
x.align["Date"] = "l"  # 以name字段左对齐
#x.padding_width = 1   # 填充宽度
for i in date_list:
    x_list = []
    x_list.append(i)
    for ii in type_list:
        x_list.append(indexed_all[i][ii])
    x.add_row(x_list)
print(x) 


print('ok!')

cursor.close()
cursor_dict.close()
conn.close()
