import requests
import html5lib
import bs4
import time
import numpy



def run_simulation():
    resp = requests.get('http://127.0.0.1:3000/')
    if resp.status_code == 200:
        html = bs4.BeautifulSoup(resp.text,'html5lib')
        if html.title.text == 'Site-1':
            hdr = resp.headers['Set-Cookie']
            trkr_num = hdr.split('tracker=')[1].split(';')[0]
            header = {'tracker':trkr_num}
            r = numpy.random.random()
            time.sleep(r)
            requests.get('http://127.0.0.1:3000/signup',cookies=header)
        else: 
            pass

while True:
    run_simulation()