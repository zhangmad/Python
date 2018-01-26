#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pymysql

conn = pymysql.connect(
    host = '127.0.0.1',
    port = 3306,
    user = 'test',
    password = '1234abcd',
    db = 'test',
    charset = 'utf8'
    )

cursor = conn.cursor()

cursor.execute('select Site, Domain, URL, Indexed from indexed where date = "2018-01-08"')

data = cursor.fetchall()

print(data)

# cursor.executemany('insert into indexed (Site, Domain, URL, Indexed, Date) values(%s,%s,%s,%s,"2018-01-09")', (data))
# cursor.executemany('insert into indexed (Site, Domain, URL, Indexed, Date) values(%s,%s,%s,%s,"2018-01-10")', (data))
# cursor.executemany('insert into indexed (Site, Domain, URL, Indexed, Date) values(%s,%s,%s,%s,"2018-01-11")', (data))

print(cursor.rowcount)

# conn.commit()
cursor.close()
conn.close()
