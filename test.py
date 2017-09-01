#!/usr/bin/python
# -*- coding: utf-8 -*-

import pymysql

conn = pymysql.connect(
    host = '127.0.0.1',
    port = 3306,
    user = 'test',
    password = '1234abcd',
    db = 'test',
    charset = 'utf8'
    ) #创建连接


cursor = conn.cursor() #创建游标
cursor_dict = conn.cursor(cursor = pymysql.cursors.DictCursor) #创建字典类型游标


effect_row = cursor.execute('select * from test')  # 执行SQL，并返回受影响行数
#effect_row = cursor.execute("update test set name = 'ttee' where id = %s", (3,)) # 执行SQL，并返回受影响行数
#effect_row = cursor.executemany("insert into test(name,number)values(%s,%s)", [("tt1","1234"),("tt2","4321")]) # 执行SQL，并返回受影响行数，执行多次
cursor_dict.execute('select * from test')

a0 = cursor.rowcount #最近一次execute返回数据的行数或影响行数，注意它不是一个方法
a = cursor.fetchone() # 获取剩余结果的第一行数据
cursor.scroll(-1,mode='relative') # 游标相对当前位置移动
a1_3 = cursor.fetchmany(2) # 获取剩余结果前n行数据
cursor.scroll(0,mode='absolute') # 游标相对绝对位置移动
a_all = cursor.fetchall() # 获取剩余结果所有数据
a_dict = cursor_dict.fetchall()
a_end = cursor_dict.fetchone()

#insert_row = cursor.executemany('insert into test(name,number) values(%s,%s)', [('ttt','111'),('eee','222')]) #插入数据
#b = cursor.lastrowid #获取新插入数据的最新的自增id


print(conn)
print(cursor)
print(a0)
print(a)
print(a1_3)
print(a_all)
print(a_dict)
#print(b)
print(a_end)

for a in a_dict:
    print(a)
    for key in a:
        print(key,a[str(key)])


#conn.rollback() #事务操作失败时进行回滚
#conn.commit() # 提交，不然无法保存新建或者修改的数据
cursor.close() #关闭游标
cursor_dict.close()
conn.close() #关闭连接

#f = open('site_baidu.html')
#t = f.readlines()
#t1 = '\n'.join(t)
#print(t1)
#print(type(t1))
#f.close()


