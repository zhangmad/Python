#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pymysql

conn = pymysql.connect(
    host = 'www.zhangmad.com',
    port = 3310,
    user = 'test',
    password = '1234abcd',
    db = 'test',
    charset = 'utf8'
    )

cursor = conn.cursor()

cursor.execute('select Site, Domain, URL, Indexed from indexed where date = "2017-08-15"')

data = cursor.fetchall()

print(data)

#cursor.executemany('insert into indexed (URL,Site,Domain,Indexed,Date) values(%s,%s,%s,%s,"2017-08-16")', (data))

print(cursor.rowcount)

#conn.commit()
cursor.close()
conn.close()