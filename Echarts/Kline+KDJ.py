import pandas as pd
import numpy as np
import pymysql
from sqlalchemy import create_engine
from pyecharts import options as opts
from pyecharts.charts import Candlestick
from pyecharts.charts import Line, Kline, Pie,Grid, Timeline,TreeMap, WordCloud,Bar
from pyecharts.commons.utils import JsCode

pymysql.install_as_MySQLdb()
engine_ts = create_engine('mysql://root:15330393717lin!@127.0.0.1:3306/stock_basic?charset=utf8&use_unicode=1')

def read_data():
    sql = """SELECT * FROM stock_basic.stock_index"""
    df = pd.read_sql_query(sql, engine_ts)
    return df

df = read_data()

df['amount'] = df['amount'].apply(lambda vol: vol if vol > 0 else 0)
date = df["trade_date"].apply(lambda x: str(x)).tolist()
k_plot_value = df[["open","high","low","close"]].apply(lambda record: [record['open'], record['close'], record['low'], record['high']], axis=1).tolist()

kline=(
    #Candlestick(init_opts=opts.InitOpts(width="1200px", height="600px"))
    Kline()
    .add_xaxis(xaxis_data=date)
    .add_yaxis(series_name="",
        y_axis=k_plot_value,
        itemstyle_opts=opts.ItemStyleOpts(
            color="#ec0000",
            color0="#00da3c",
            border_color="#8A0000",
            border_color0="#008F28"
             ),
        markline_opts=opts.MarkLineOpts(
            data=[opts.MarkLineItem(type_="max", value_dim="close")])
        )
    .set_global_opts(
        xaxis_opts=opts.AxisOpts(is_scale=True),#坐标轴配置项
        yaxis_opts=opts.AxisOpts(
            is_scale=True,
            splitline_opts=opts.SplitLineOpts(
                is_show=True,
                linestyle_opts=opts.LineStyleOpts(width=1),
            ),
         ),
        legend_opts=opts.LegendOpts(is_show=False),
        datazoom_opts=[
            opts.DataZoomOpts(
                is_show=False,
                xaxis_index=[0,1],
                range_start=0,
                range_end=100,
                type_="inside"),
            ],#区域缩放配置项
        title_opts=opts.TitleOpts(title="招商中证白酒指数",),
        tooltip_opts=opts.TooltipOpts(#提示框配置
            trigger="axis",
            axis_pointer_type='cross',
            #background_color='rgba(245,245,245,245,0.8)',
            border_width=1,
            border_color="#ccc",
            textstyle_opts=opts.TextStyleOpts(color='#000'),
        ),
        visualmap_opts=opts.VisualMapOpts(
            is_show=False,
            dimension=2,
            series_index=3,
            is_piecewise=True,
            pieces=[
                {"value":-1,"color":"#ec000"},
                {"value":1,"color":"#00da3c"},
            ]
        ),
        axispointer_opts=opts.AxisPointerOpts(
            is_show=True,
            link=[{"xAxisIndex":"all"}],
            label=opts.LabelOpts(background_color="#777"),
        ),
        brush_opts=opts.BrushOpts(
            x_axis_index="all",
            brush_link="all",
            out_of_brush={"colorAlpha":0.1},
            brush_type="linex",
        ),
        )
)

line = (
    Line()
    .add_xaxis(xaxis_data=date)
    .add_yaxis(
        series_name="MA5",
        y_axis=df["close"].rolling(5).mean().values.round(2),
        itemstyle_opts=opts.ItemStyleOpts(color='black'),
        is_smooth=True,
        is_hover_animation=False,
        linestyle_opts=opts.LineStyleOpts(width=1,opacity=0.5),#线样式配置项
        label_opts=opts.LabelOpts(is_show=False),#标签配置项
    )
    .add_yaxis(
        series_name="MA10",
        y_axis=df["close"].rolling(10).mean().values.round(2),
        itemstyle_opts=opts.ItemStyleOpts(color='yellow'),
        is_smooth=True,
        is_hover_animation=False,
        linestyle_opts=opts.LineStyleOpts(width=1,opacity=0.5),
        label_opts=opts.LabelOpts(is_show=False),
    )
    .add_yaxis(
        series_name="MA20",
        y_axis=df["close"].rolling(20).mean().values.round(2),
        itemstyle_opts=opts.ItemStyleOpts(color='purple'),
        is_smooth=True,
        is_hover_animation=False,
        linestyle_opts=opts.LineStyleOpts(width=1,opacity=0.5),
        label_opts=opts.LabelOpts(is_show=False),
    )
    .set_global_opts(
        xaxis_opts=opts.AxisOpts(
            type_="category",#离散数据
            grid_index=1,
            axislabel_opts=opts.LabelOpts(is_show=False),
        ),
        yaxis_opts=opts.AxisOpts(
            grid_index=1,
            split_number=3,
            axisline_opts=opts.AxisLineOpts(is_on_zero=False),#坐标轴线配置项
            axistick_opts=opts.AxisTickOpts(is_show=False),#标轴刻度配置项
            splitline_opts=opts.SplitLineOpts(is_show=False),#分隔线配置项
            axislabel_opts=opts.LabelOpts(is_show=True),
        ),
        datazoom_opts=[opts.DataZoomOpts()],
    )
)

def KDJ(data):

    # 计算前N日最低和最高，缺失值用前n日（n<N)最小值替代
    lowList = data['low'].rolling(9).min()
    lowList.fillna(value=data['low'].expanding().min(), inplace=True)
    highList = data['high'].rolling(9).max()
    highList.fillna(value=data['high'].expanding().max(), inplace=True)
    # 计算rsv
    rsv = (data['close'] - lowList) / (highList - lowList) * 100
    # 计算k,d,j
    data['kdj_k'] = rsv.ewm(alpha=1/3, adjust=False).mean()     # ewm是指数加权函数
    data['kdj_d'] = data['kdj_k'].ewm(alpha=1/3, adjust=False).mean()
    data['kdj_j'] = 3.0 * data['kdj_k'] - 2.0 * data['kdj_d']
    return data

kdj=KDJ(read_data())

lineKDJ=(
    Line()
    .add_xaxis(date)
    .add_yaxis(
        series_name="K",
        y_axis=kdj["kdj_k"].values.round(2),
        itemstyle_opts=opts.ItemStyleOpts(color='black'),
        #xaxis_index=1,
        #yaxis_index=2,
        label_opts=opts.LabelOpts(is_show=False),
    )
    .add_yaxis(
        series_name="D",
        y_axis=kdj["kdj_d"].values.round(2),
        itemstyle_opts=opts.ItemStyleOpts(color='yellow'),
        #xaxis_index=1,
        #yaxis_index=2,
        label_opts=opts.LabelOpts(is_show=False),
    )
    .add_yaxis(
        series_name="J",
        y_axis=kdj["kdj_j"].values.round(2),
        itemstyle_opts=opts.ItemStyleOpts(color='purple'),
        #xaxis_index=1,
        #yaxis_index=2,
        label_opts=opts.LabelOpts(is_show=False),
    )

)
grid_chart=Grid(init_opts=opts.InitOpts(width="1000px",height="600px"))
grid_chart.add(
    kline.overlap(line),
    grid_opts=opts.GridOpts(pos_left="10%",pos_right="8%",height="50%")
)
grid_chart.add(
    lineKDJ,
    grid_opts=opts.GridOpts(pos_left="10%",pos_right="8%",pos_top="70%",height="16%")
)

grid_chart.render("Klin+KDJ.html")