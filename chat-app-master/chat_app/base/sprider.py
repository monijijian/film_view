import requests
import json
import csv


class Maoyan(object):
    # 初始化数据
    def __init__(self):
        self.url = 'http://piaofang.maoyan.com/getBoxList?date=1&isSplit=true'
        self.header = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/87.0.4280.88 Safari/537.36 '
        }

    # 获取数据
    def get_data(self):
        response = requests.get(url=self.url, headers=self.header)
        return response.content

    # 解析数据
    def parse_data(self, response):
        data = json.loads(response)
        data_list = data['boxOffice']["data"]["list"]
        datas = list()
        for main_data in data_list:
            temp = {}
            temp["电影ID"] = main_data['movieInfo']["movieId"]
            temp["电影名称"] = main_data['movieInfo']["movieName"]
            temp["累计票房"] = main_data['sumBoxDesc']
            temp["综合票房占比"] = main_data['boxRate']
            temp["排片占比"] = main_data['showCountRate']
            temp["排坐占比"] = main_data['seatCountRate']

            datas.append(temp)
        return datas


    def run(self):
        response = self.get_data()
        datas = self.parse_data(response)
        return datas


if __name__ == '__main__':
    maoyan = Maoyan()
    maoyan.run()