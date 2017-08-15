#!/usr/bin/env python3
# -*- coding: utf-8 -*-


from urllib import request, parse
from bs4 import BeautifulSoup
import re, ssl, pymysql, time

ssl._create_default_https_context = ssl._create_unverified_context


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

result = []
result_insert = []
result_update_ID = []
result_update = []
result_delete_ID = []
result_count = 0
num_insert = 0
num_update = 0
num_delete = 0

result_date = time.strftime("%Y-%m-%d", time.localtime()) 


def search_site(site, pc=1):
    """docstring for search_s"""
    req = request.Request(site)
    if pc == 1:
        req.add_header("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0")
    else:
        req.add_header("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
    resp = request.urlopen(req).read().decode('utf-8')
    return resp



def all_site(resp_all):
    """docstring for all_site"""
    soup = BeautifulSoup(resp_all,'html.parser')
    text_all = soup.findAll('p')

    for text_single in text_all:
        text_new = str(text_single.get_text()).strip().replace('\n','').replace(' ','').replace(',','')
        if re.match(r'^神马收录', text_new) or re.match(r'^搜狗已为您找到约', text_new) or re.match(r'^找到相关结果', text_new) or re.match(r'^该网站共有', text_new):
            number = int(re.search(r'\d+',text_new).group(0))
            return number
    


for url_s in url:
    search_def = all_site
    for domain_s in domain:
        for site_s in site:
            if re.search(r'sm', url_s): 
                if site_s == 'm' and re.match(r'^leju', domain_s):
                    site_link = url_s+'site:'+site_s+'.'+domain_s
                    num = all_site(search_site(site_link, 0))
                    t = ('sm.cn', site_s, domain_s, num)
                    result.append(t)
                    result_count += 1
                    print(result_count,'The sm.cn OK!')
            elif site_s != 'm':
                site_link = url_s+'site:'+site_s+'.'+domain_s
                num = all_site(search_site(site_link))
                if re.match(r'http://.*baidu', url_s):
                    url_s_new = 'www.baidu.com'
                elif re.match(r'http://.*so\.com', url_s):
                    url_s_new = 'www.so.com'
                elif re.match(r'http://.*sogou', url_s):
                    url_s_new = 'www.sogou.com'
                t = (url_s_new, site_s, domain_s, num)
                result.append(t)
                result_count += 1
                print(result_count, 'The', url_s_new, 'OK!')



cursor = conn.cursor()

for result_s in result:
    print('当前处理数据：', result_s)
    cursor.execute('select * from indexed where URL = %s and Site = %s and Domain = %s and Date = %s order by Create_time', (result_s[0],result_s[1],result_s[2],result_date))
    row_count = cursor.rowcount
    if row_count == 0:
        result_insert.append(result_s)
        cursor.execute('insert into indexed(URL,Site,Domain,Indexed,Date) values(%s,%s,%s,%s,curdate())', (result_s))
        if cursor.rowcount == 1: 
            print('插入数据库 ok') 
            num_insert += 1
        else: 
            print('插入数据库 false')
    elif row_count >= 1:
        print('数据库内已存在：', row_count)
        result_update.append(result_s)  #记录一下更新的数据
        if row_count > 1:
            for bbb in cursor.fetchall():
                print('重复数据ID：',bbb[0])
                result_delete_ID.append(bbb[0])
            result_update_ID = result_delete_ID[-1]    #最后一条留作更新ID
            print('最后一条留作更新ID：', result_update_ID)
            result_delete_ID.pop() #要删除的数据的ID
            print('删除数据ID：', result_delete_ID)

            for temp in result_delete_ID:
                cursor.execute('delete from indexed where ID = %s', (temp))
                if cursor.rowcount == 1: 
                    print('已经删除：', cursor.rowcount, temp) 
                    num_delete += 1
                else: 
                    print('删除失败：', cursor.rowcount, temp)
                result_delete_ID = []   #清空要删除的数据ID列表
            
            cursor.execute('update indexed set Indexed = %s where ID = %s', (result_s[3], result_update_ID))
            if cursor.rowcount == 1: 
                print('已经更新：', cursor.rowcount, result_s[3], result_update_ID) 
                num_update += 1
            else: 
                print('更新失败：', cursor.rowcount, result_s[3], result_update_ID)
        else:
            bbb = cursor.fetchone()
            cursor.execute('update indexed set Indexed = %s where ID = %s', (result_s[3], bbb[0]))
            if cursor.rowcount == 1: 
                print('已经更新：', cursor.rowcount, result_s[3], bbb[0]) 
                num_update += 1
            else: 
                print('更新失败：', cursor.rowcount, result_s[3], bbb[0])



print('=====')
print('插入数据：', num_insert, '条')
print(result_insert)
print('=====')
print('更新数据：', num_update, '条')
print(result_update)
print('=====')
print('删除数据：', num_delete, '条')


conn.commit()
cursor.close()
conn.close()




#==============历史调试代码==============
'''
def file_open(filename):
    """docstring for file_open"""
    file_open = open(filename)
    file_temp = file_open.readlines()
    file_text = '\n'.join(file_temp)
    file_open.close()
    return file_text



def search_site_pc(site):
    """docstring for search_site"""
    req = request.Request(site)
    req.add_header("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0")
    resp = request.urlopen(req).read().decode('utf-8')
    return resp
    
def search_site_mobile(site):
    """docstring for search_site"""
    req = request.Request(site)
    req.add_header("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
    resp = request.urlopen(req).read().decode('utf-8')
    return resp



def baidu_site(resp_all):
    """docstring for baidu_site"""
    soup = BeautifulSoup(resp_all,'html.parser')
    text_all = soup.findAll('p')

    for text_single in text_all:
        text_new = str(text_single.get_text()).strip().replace('\n','').replace(' ','').replace(',','')
        if re.match(r'^该网站共有', text_new):
            number = int(re.search(r'\d+',text_new).group())
            return number

def so_site(resp_all):
    """docstring for 360_site"""
    soup = BeautifulSoup(resp_all,'html.parser')
    text_all = soup.findAll('p')
    
    for text_single in text_all:
        text_new = str(text_single.get_text()).strip().replace('\n','').replace(' ','').replace(',','')
        if re.match(r'^找到相关结果', text_new):
            number = int(re.search(r'\d+',text_new).group(0))
            return number

def sogou_site(resp_all):
    """docstring for sogou_site"""
    soup = BeautifulSoup(resp_all,'html.parser')
    text_all = soup.findAll('p')

    for text_single in text_all:
        text_new = str(text_single.get_text()).strip().replace('\n','').replace(' ','').replace(',','')
        if re.match(r'^搜狗已为您找到约', text_new):
            number = int(re.search(r'\d+',text_new).group(0))
            return number

def sm_site(resp_all):
    """docstring for sm_site"""
    soup = BeautifulSoup(resp_all,'html.parser')
    text_all = soup.findAll('p')

    for text_single in text_all:
        text_new = str(text_single.get_text()).strip().replace('\n','').replace(' ','').replace(',','')
        if re.match(r'^神马收录', text_new):
            number = int(re.search(r'\d+',text_new).group(0))
            return number



#baidu = open('site_baidu.html')
#resp_temp = baidu.readlines()
#resp = '\n'.join(resp_temp)
#baidu.close()



 #req = request.Request("http://www.baidu.com/s?wd=site:esf.leju.com")
 ##req = request.get("https://www.baidu.com/s?wd=site:esf.leju.com")
 #req.add_header("User-Agent","User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0")
 #resp = request.urlopen(req).read().decode('utf-8')




 #soup = BeautifulSoup(resp,'html.parser')
 #text_all = soup.findAll('p')
 #
 #for text_single in text_all:
 #    text_new = str(text_single.get_text()).strip().replace('\n','').replace(' ','').replace(',','')
 #    pattern = re.compile(r'^该网站共有')
 #    if len(text_new) > 0 and pattern.match(text_new):
 #        print(text_new)
 #        number = int(''.join(re.findall(r'\d+',text_new)))
 #        print(number)
 #        print('-----')



    #resp = file_open('site_baidu.html')
    #xxx = baidu_site(resp)
    #print(xxx,type(xxx))
    #
    #resp = file_open('site_360.html')
    #xxx = so_site(resp)
    #print(xxx,type(xxx))
    #
    #resp = file_open('site_sogou.html')
    #xxx = sogou_site(resp)
    #print(xxx,type(xxx))
    #
    #resp = file_open('site_sm.html')
    #xxx = sm_site(resp)
    #print(xxx,type(xxx))
        
            

#soup = BeautifulSoup(resp,'html.parser')
#text_all = soup.findAll('p')
#
#for text_single in text_all:
#    text_new = str(text_single.get_text()).strip().replace('\n','').replace(' ','').replace(',','')
#    if re.match(r'^神马收录', text_new):
#        number = int(re.search(r'\d+',text_new).group(0))
#        print('----')
#        print(number,type(number))
#        break

'''