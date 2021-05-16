from selenium import webdriver
from lxml import etree
import pandas as pd
class Douban(object):
    def get(self):
        driver = webdriver.Edge('D:\Study\edgedriver_win64\msedgedriver.exe')
        driver.get('https://movie.douban.com/cinema/nowplaying/zhengzhou/')
        html = driver.page_source
        driver.close()

        # 整理文档对象
        html = etree.HTML(html)
        title = html.xpath('//*[@id="nowplaying"]//li/ul/li[2]/a/@title')
        actor = html.xpath('//*[@id="nowplaying"]//li/@data-actors')
        score = html.xpath('//*[@id="nowplaying"]//li/@data-score')
        duration = html.xpath('//*[@id="nowplaying"]//li/@data-duration')
        director = html.xpath('//*[@id="nowplaying"]//li/@data-director')

        data = list(zip(title, score, director, actor, duration))
        return data

    def run(self):
        data = self.get()
        print(data)
        return data

if __name__ == '__main__':
    douban = Douban()
    douban.run()