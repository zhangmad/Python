from urllib import request
from urllib import parse
from bs4 import BeautifulSoup
import re

req = request.Request("http://www.baidu.com")
#req.add_header("User-Agent","User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0")

#postData = parse.urlencode([
#    ('wd','test')
#])

resp = request.urlopen(req).read().decode('utf-8')

soup = BeautifulSoup(resp,'html.parser')
listUrls = soup.findAll('a',href=re.compile(r'^http'))
#print(listUrls)
for link in listUrls:
    print(link.get_text(),'<---->',link['href'])
    
    
    