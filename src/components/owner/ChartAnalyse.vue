<template>
  <div>
    <ReportToolBar class="fixed">经营诊断报表</ReportToolBar>
    <div class="tips-info">
      <p>尊敬的用户，以下为贵商户的经营性分析图表展示，仅供参考使用！（以下图表以周/月为单位进行分析，请知悉！）</p>
    </div>
    <!-- 所在区域烟草销售趋势图 -->
    <div class="report-item">
      <h2>1、所在区域烟草销售趋势</h2>
      <p v-if="toggleOrderAmtTrend" class="empty-data-tip">暂无数据</p>
      <div id="saleReportChart" :class="['chart-area', {'zero-height': toggleOrderAmtTrend}]">
      </div>
    </div>
    <!-- 所在区域烟草订单量趋势图 -->
    <div class="report-item">
      <h2>2、所属区域近年烟草订单量趋势分析图</h2>
      <p v-if="toggleOrderAmtTrend" class="empty-data-tip">暂无数据</p>
      <div id="orderReportChart" :class="['chart-area', {'zero-height': toggleOrderAmtTrend}]">
      </div>
    </div>
    <!-- 所属区域最畅销烟品排行榜 -->
    <div class="report-item">
      <h2>3、所属区域最畅销烟品排行榜</h2>
      <p v-if="toggleOrderRank" class="empty-data-tip">暂无数据</p>
      <div id="rankReportChart" :class="['chart-area', {'zero-height': toggleOrderAmtTrend}]">
      </div>
    </div>
    <!-- 周围最难订货的十类烟草单品列表信息 -->
    <div  class="report-item">
      <h2>4、您身边的烟草贷源紧俏信息</h2>
      <h3>a、您周围最难订货的十类烟草单品</h3>
      <table class="report-table">
        <thead class="thead-blue">
          <tr>
            <td>最难订货烟品排名</td><td>烟草品牌</td><td>供给率</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in hardOrderRank"
            :key="index"
            :class="index % 2 === 0 ? 'cigarette-table-even-row' : 'cigarette-table-odd-row'">
            <td>{{row.supplyRateRank}}</td>
            <td><strong>{{row.brandName}}</strong></td>
            <td>{{row.supplyRate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 周围利润最高的十类烟草单品 -->
    <div  class="report-item">
      <h3>b、您周围利润最高的十类烟草单品</h3>
      <table class="report-table">
        <thead class="thead-blue">
          <tr>
            <td>利润最高烟品排名</td><td>烟草品牌</td><td>利润率</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in bestProfitRank"
            :key="index"
            :class="index % 2 === 0 ? 'cigarette-table-even-row' : 'cigarette-table-odd-row'">
            <td>{{row.profitRateRank}}</td>
            <td><strong>{{row.brandName}}</strong></td>
            <td>{{row.profitRate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 近期订单利润分析 -->
    <div  class="report-item">
      <h1>5、您近期订单利润分析</h1>
      <table class="report-table">
        <thead class="thead-orange">
          <tr>
            <td>订单编号</td><td>订单日期</td><td>订单数量(万条)</td><td>订单金额(元)</td><td>利润金额(元)</td><td>利润率</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in orderProfit"
            :key="index"
            :class="index % 2 === 0 ? 'profit-table-even-row' : 'profit-table-odd-row'">
            <td>{{row.orderNo}}</td>
            <td>{{row.orderDate}}</td>
            <td>{{row.qtyOrderSum}}</td>
            <td>{{row.amtOrderSum}}</td>
            <td>{{row.profitOrderSum}}</td>
            <td>{{row.profitRate}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>合计</td>
            <td></td>
            <td>{{orderProfitSum.totalOrderNum}}</td>
            <td>{{orderProfitSum.totalOrderAmt}}</td>
            <td>{{orderProfitSum.totalProfitAmt}}</td>
            <td>{{orderProfitSum.avgProfitRate && orderProfitSum.avgProfitRate + '%'}}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- 底部按钮 -->
    <div align="center">
      <input
        type="button"
        class="bottom-button"
        value="申请获取平安惠商贷精准授信"
        @click="applyCigCredit" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts' // 核心库
import 'echarts/lib/chart/line' // 线条图
import 'echarts/lib/chart/bar' // 柱状图
import 'echarts/lib/component/title' // 标题
import 'echarts/lib/component/tooltip' // 提示
import ReportToolBar from '@/components/ReportToolBar'
import Divider from '../Divider.vue'

// 需要绘制图表的几个DOM ID
const domIds = ['saleReportChart', 'orderReportChart', 'rankReportChart']

export default {
  name: 'chartAnalyse',
  components: { ReportToolBar, Divider },
  data () {
    return {
      chartsInstance: {
        saleReportChart: null // 销售额趋势图实例
      },
      chartsData: {
        saleReportChart: null, // 绘制近年烟草销售额趋势图数据
        orderReportChart: null, // 绘制近年烟草订单量趋势图数据
        rankReportChart: null // 绘制最畅销烟品排行榜数据
      },
      toggleOrderAmtTrend: false, // 销售额/订单趋势是否有数据
      toggleOrderRank: false, // 畅销排名是否有数据
      hardOrderRank: [], // 最难订货排行
      bestProfitRank: [], // 最高利润排行
      orderProfit: [], // 订单利润分析
      orderProfitSum: {
        totalOrderNum: 0,
        totalOrderAmt: 0,
        totalProfitAmt: 0,
        avgProfitRate: 0
      } // 订单利润合计情况
    }
  },
  mounted () {
    this.initReportCharts()
    this.generateChartReoprt()
  },
  methods: {
    /**
     * 初始化图表instance
     */
    initReportCharts () {
      for (let domId of domIds) {
        let ci = echarts.init(document.querySelector(`#${domId}`))
        this.chartsInstance[domId] = ci
        ci.showLoading()
      }
    },
    /**
     * 加载报表分析图表
     */
    loadReportCharts (chartInstance, options, chartData) {
      chartInstance.setOption({
        // width: '290',
        height: '95',
        title: {
          text: options.titleText, // 标题文本
          textStyle: { // 标题文本样式
            color: '#534d4d',
            fontSize: '30px',
            lineHeight: '32px'
          },
          subtext: options.titleSubText, // 标题富文本
          left: "center" // 标题文本对齐方式
        },
        tooltip: {
          trigger: options.tooltipTrigger // 显示描述信息触发方式
        },
        xAxis: {
          type: "category",
          data: chartData.xAxisData, // x轴数据
          axisLabel: { // x轴文本旋转角度
            rotate: 45,
            formatter: options.formatterYearMonth
          },
          axisTick: { // x轴刻度参数
            show: false,
            alignWithLabel: true
          }
        },
        yAxis: {
          type: "value",
          axisTick: { // y轴刻度参数
            show: false
          },
          axisLabel: { // y轴文本参数
            margin: 3,
            formatter: options.formartterLabelFunc
          }
        },
        grid: { // 图表组件相对容器定位
          left: 55
        },
        series: [
          {
            data: chartData.yAxisData, // 绘制图表的y轴数据
            type: options.seriesType, // 图表的类型：line,bar,pie等等
            smooth: options.seriesSmooth, // 若为line，线条是否平滑
            lineStyle: options.lineStyle, // 若为line，线条样式
            itemStyle: options.itemStyle // 图表类型是line时为线条拐点样式，图表类型是bar时为柱状样式
          }
        ]
      })
    },
    /**
     * 根据指定的参数配置绘制线条图表
     */
    drawReportChart () {
      // 根据获得数据绘制所有的图表
      for (let domId of domIds) {
        let chartInstance = null
        let options = null
        let chartData = null
        // 所绘制的图表为销售额趋势图
        if (domId === 'saleReportChart') {
          // 根据domId获取对应的图表实例
          chartInstance = this.chartsInstance[domId]
          chartInstance.hideLoading()
          // 设置图表相关参数
          options = {
            tooltipTrigger: 'axis',
            seriesSmooth: true,
            seriesType: 'line',
            lineStyle: {
              color: '#4baeff'
            },
            itemStyle: {
              color: '#4baeff'
            },
            titleText: `${this.chartsData.saleReportChart.city}${this.chartsData.saleReportChart.area}近年烟草销售额趋势图`,
            titleSubText: '单位：万元/月',
            formartterLabelFunc: function(value, index) {
              let f = parseFloat(value)
              return (f / 10000).toFixed(0)
            },
            formatterYearMonth: function(value, index) {
              let year = value.substring(0,4) || ''
              let month = value.substring(4) || ''
              if (year && month) {
                return `${year}年${month}月`
              }
            }
          }
          // 设置图表相关数据
          chartData = {
            xAxisData: this.chartsData.saleReportChart.yearMonth,
            yAxisData: this.chartsData.saleReportChart.saleAmt
          }
        }

        // 所绘制的图表为订单量趋势图
        if (domId === 'orderReportChart') {
          // 根据domId获取对应的图表实例
          chartInstance = this.chartsInstance[domId]
          chartInstance.hideLoading()
          // 设置图表相关参数
          options = {
            tooltipTrigger: 'axis',
            seriesSmooth: true,
            seriesType: 'line',
            lineStyle: {
              color: '#4baeff'
            },
            itemStyle: {
              color: '#4baeff'
            },
            titleText: `${this.chartsData.orderReportChart.city}${this.chartsData.orderReportChart.area}近年烟草订单量趋势图`,
            titleSubText: '单位：条',
            formartterLabelFunc: function(value, index) {
              return value
            },
            formatterYearMonth: function(value, index) {
              let year = value.substring(0,4) || ''
              let month = value.substring(4) || ''
              if (year && month) {
                return `${year}年${month}月`
              }
            }
          }
          // 设置图表相关数据
          chartData = {
            xAxisData: this.chartsData.orderReportChart.yearMonth,
            yAxisData: this.chartsData.orderReportChart.orderCount
          }
        }

        // 所绘制的图表为最畅销烟品排行榜
        if (domId === 'rankReportChart') {
          chartInstance = this.chartsInstance[domId]
          chartInstance.hideLoading()
          options = {
            seriesType: 'bar',
            itemStyle: {
              color: '#4baeff'
            },
            titleText: `${this.chartsData.orderReportChart.city}${this.chartsData.orderReportChart.area}最畅销烟草单品排名前十位`,
            titleSubText: '单位：条',
            formartterLabelFunc: function(value, index) {
              return value
            },
            formatterYearMonth: function(value, index) {
              return value
            }
          }
          chartData = {
            xAxisData: this.chartsData.rankReportChart.cigaretteName,
            yAxisData: this.chartsData.rankReportChart.orderCount
          }
        }

        // 根据各项参数绘制图表
        this.loadReportCharts(chartInstance, options, chartData)
      }
    },
    /**
     * 申请烟草贷按钮事件
     */
    applyCigCredit () {
      let creditStatusInfo = JSON.parse(sessionStorage.getItem('creditStatusInfo'))
      if (creditStatusInfo && creditStatusInfo.canApply === '1') {
        let reqId = this.$utils.generateSignTime()
        let timestamp = Date.now()
        // 在跳转到下一步的页面之前，先校验授权是否失效以及区域是否开展
        this.$indicator.open()
        this.$http.post(this.$api.ROOT + this.$Constants.CHECK_AREA_AUTH, {
          reqId: reqId,
          appId: window.appId,
          sign: this.$utils.generateSign(reqId, timestamp),
          timestamp: timestamp,
          openId: this.$StringUtils.getOpenId(),
          data: {
            Status: creditStatusInfo.applyStatus
          }
        }).then((res) => {
          this.$indicator.close()
          // 校验通过
          if (res.data.ret === '0') {
            this.$router.push(this.$RM.WriteOne)
          } else {
            if (res.data.ret === '000002') {
              this.$dialog.alert("    ", this.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN)
              this.$StringUtils.loginOut()
            } else {
              this.$toast(res.data.msg)
            }
          }
        }).catch((err) => {
          this.$indicator.close()
          this.$toast('啊哦，出了点问题，请稍微再试~')
        })
      } else {
        this.$dialog.confirm('抱歉，当前状态不能申请平安惠商贷', '', {
          showCancelButton: false,
          confirmButtonText: '返回首页'
        }).then(() => {
          this.$router.push(this.$RM.Main)
        })
      }
      
    },
    /**
     * 对区域烟草销售额/订单量趋势返回数据按年月进行排序
     */
    sortOrderTrend (a, b) {
      return parseInt(a.yearmonth) - parseInt(b.yearmonth)
    },
    /**
     * 根据查询返回数据生成销售额/订单量趋势图表数据
     */
    generateOrderTrendData (orderTrendInfo) {
      let parsedOrderTrendInfo = {
        yearMonth: [],
        saleAmt: [],
        orderCount: []
      }
      let sortedArr = orderTrendInfo.sort(this.sortOrderTrend)
      sortedArr.forEach((item) => {
        parsedOrderTrendInfo.yearMonth.push(item.yearmonth)
        parsedOrderTrendInfo.saleAmt.push(item.amtOrderSum)
        parsedOrderTrendInfo.orderCount.push(item.qtyOrderSum)
        parsedOrderTrendInfo.city = item.cityName
        parsedOrderTrendInfo.area = item.districtName
      })
      return parsedOrderTrendInfo
    },
    /**
     * 对区域最畅销烟品排名根据向量进行排序
     */
    sortBrandBestSale (a, b) {
      return parseFloat(b.qtyOrderSum) - parseFloat(a.qtyOrderSum)
    },
    /**
     * 根据查询返回数据生成区域最畅销烟品排名图表数据
     */
    generateBrandBestSaleData (brandBestSaleInfo) {
      let brandBestSaleData = {
        cigaretteName: [],
        orderCount: []
      }
      let sortedArr = brandBestSaleInfo.sort(this.sortBrandBestSale)
      sortedArr.forEach((item) => {
        brandBestSaleData.cigaretteName.push(item.brandName)
        brandBestSaleData.orderCount.push(item.qtyOrderSum)
        brandBestSaleData.city = item.cityName
        brandBestSaleData.area = item.districtName
      })
      return brandBestSaleData
    },
    /**
     * 对区域最难订货烟草根据供给率排序
     */
    sortBrandShortage (a, b) {
      return parseFloat(a.supplyRate.replace(/\%/g, '')) - parseFloat(b.supplyRate.replace(/\%/g, ''))
    },
    /**
     * 根据查询返回数据生成区域最难订货烟草表格数据
     */
    generateBrandShortageData (brandShortageInfo) {
      return brandShortageInfo.sort(this.sortBrandShortage)
    },
    /**
     * 对区域利润最高的烟草根据利润率进行排序
     */
    sortBrandBestProfit (a, b) {
      return parseFloat(b.profitRate.replace(/\%/g, '')) - parseFloat(a.profitRate.replace(/\%/g, ''))
    },
    /**
     * 根据查询返回数据生成区域利润最高的烟草表格数据
     */
    generateBrandBestProfitData (brandBestProfitInfo) {
      return brandBestProfitInfo.sort(this.sortBrandBestProfit)
    },
    /**
     * 根据查询返回数据生成订单利润统计信息
     */
    generateOrderProfitStatistics (orderProfitInfo) {
      let totalOrderNum = 0,
          totalOrderAmt = 0,
          totalProfitAmt = 0,
          totalProfitRate = 0
      if (orderProfitInfo && orderProfitInfo.length > 0) { // 查询到订单利润相关信息
        for (let item of orderProfitInfo) {
          totalOrderNum += parseFloat(item.qtyOrderSum)
          totalOrderAmt += parseFloat(item.amtOrderSum)
          totalProfitAmt += parseFloat(item.profitOrderSum)
          totalProfitRate += parseFloat(item.profitRate.replace(/\%/g, ''))
        }
        return {
          totalOrderNum: totalOrderNum.toFixed(2),
          totalOrderAmt: totalOrderAmt.toFixed(2),
          totalProfitAmt: totalProfitAmt.toFixed(2),
          avgProfitRate: (totalProfitRate / orderProfitInfo.length).toFixed(2)
        }
      } else { // 未查询到订单利润相关信息
        return {
          totalOrderNum: '',
          totalOrderAmt: '',
          totalProfitAmt: '',
          avgProfitRate: ''
        }
      }
      
    },
    /**
     * 获取生成报表个各项数据
     */
    generateChartReoprt () {

      //15分钟之后登陆态失效，强制重新登陆
      if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
        this.$CACHE.showErr();
        return
      }else{
        this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
      }
      let reqId = this.$StringUtils.getReqId()
      let timeStamp = Date.now()
      this.$http.post(this.$api.ROOT + this.$Constants.GENERATE_CHART_REOPRT, {
        appId: window.appId, //
        reqId: reqId,
        timestamp: timeStamp,
        sign: this.$utils.generateSign(reqId, timeStamp),
        openId: this.$CACHE.getCache("loginSession"),
        data: {
          newBusinessAccount: this.$route.query.acct
        }
      }).then((res) => {
        if (res.data.ret === '0') {
          let resData = res.data.data
          if (!resData) {
            this.$toast(resData.msg)
            return false
          }

          // 如果销售金额/订单量趋势无数据，则关闭loading，显示无数据提示
          if (!resData.orderTrendInfo || resData.orderTrendInfo.length < 1) {
            this.chartsInstance['saleReportChart'].dispose()
            this.chartsInstance['orderReportChart'].dispose()
            this.toggleOrderAmtTrend = true
          }

          // 如果销售排行无数据，则关闭loading，显示无数据提示
          if (!resData.brandBestSaleInfo || resData.brandBestSaleInfo.length < 1) {
            this.chartsInstance['rankReportChart'].dispose()
            this.toggleOrderRank = true
          }

          // 根据返回的数据生图表与表格数据
          let orderTrendInfo = this.generateOrderTrendData(resData.orderTrendInfo)
          this.chartsData = {
            saleReportChart: orderTrendInfo,
            orderReportChart: orderTrendInfo,
            rankReportChart: this.generateBrandBestSaleData(resData.brandBestSaleInfo)
          }
          this.hardOrderRank = this.generateBrandShortageData(resData.brandShortageInfo)
          this.bestProfitRank = this.generateBrandBestProfitData(resData.brandBestProfitInfo)
          this.orderProfit = resData.orderProfitAnalysisInfo
          this.orderProfitSum = this.generateOrderProfitStatistics(resData.orderProfitAnalysisInfo)
          // 对数据进行排序格式化后，根据数据进行渲染图表和表格
          !this.toggleOrderAmtTrend && !this.toggleOrderRank && this.drawReportChart()
        } else {
          if (res.data.ret === '000002') {
            this.$dialog.alert("    ", this.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN)
            this.$StringUtils.loginOut()
          } else {
            this.$dialog.alert("    ", res.data.msg)
          }
        }
      }).catch((err) => {
        this.$toast('出现了一点小意外，请稍后重试')
      })
    }
  }
};
</script>

<style scoped>
.fixed {
  position: fixed;
  width: 100%;
  margin-top: 0;
  top:0;
  z-index: 2;
}

.tips-info {
  width: 88%;
  margin-top: 1.35rem;
  margin-left: 25px;
  color: #999999;
  font-size: 24px;
}

.report-item {
  width: 95%;
  margin: 15px 25px;
}

.report-item .empty-data-tip {
  text-align: center;
  line-height: 200px;
  color: red;
  letter-spacing: 2px;
}

.report-item h3 {
  color: #6e6a6a;
  margin: 10px 0px;
}

.chart-area {
  width: 100%;
  height: 520px;
  margin: 0px auto;
  margin-top: 20px;
}

.zero-height {
  height: 0px;
}

.report-table {
  width: 95%;
  table-layout: fixed;
  border-collapse: collapse;
  margin: 15px 25px;
  border: solid 1px #999999;
  border-radius: 5px;
}

.thead-blue {
  background-color: #4baeff;
  color: #ffffff;
  font-size: 25px;
  text-align: center;
  vertical-align: middle;
}

.thead-orange {
  background-color: #ffb980;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
}

.report-table tbody,tfoot {
  text-align: center;
  vertical-align: middle;
}

.report-table tr {
  height: 50px;
}

.report-table td {
  word-wrap: break-word;
  word-break: break-all;
}

.report-table td,th {
  border: 1px solid rgb(190, 190, 190);
}

.cigarette-table-odd-row {
  background-color: #e6f4ff;
}

.cigarette-table-even-row {
  background-color: #f3faff;
}

.profit-table-odd-row {
  background-color: #fff1e5;
}

.profit-table-even-row {
  background-color: #fffcf9;
}

.bottom-button {
  margin-top: 50px;
  margin-bottom: 50px;
  background-image: linear-gradient(to right, #ffa61a 0%, #ff6c0d 100%);
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  width: 8.7rem;
  height: 1.3rem;
  border: none;
  font-size: 30px;
  color: #ffffff;
  }
</style>
