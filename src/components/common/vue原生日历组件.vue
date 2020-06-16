<template>
	<div class="page">
        <div>原生日历组件</div>
		<div class="year-month">
			年
			<select class="select" v-model="nowYear" @change="DateChange">
				<option v-for="(item, index) in yearOption" :key="index" :value="item">{{item}}</option>
			</select>
			月
			<select class="select" v-model="nowMonth" @change="DateChange">
				<option v-for="(item, index) in monthOption" :key="index" :value="item">{{item}}</option>
			</select>
		</div>
		<!-- 日历头 -->
		<div class="calenderTitle">
			<div class="calenderItem border-top" :class="index === 0 ? 'border-left' : ''" v-for="(item, index) of calenderTitel" :key="index">{{item}}</div>
		</div>
		<!-- 日历内容 -->
		<div class="calenderInside">
			<div class="calenderItem" v-for="(item, index) of calenderArray" :key="index"
            :class="index % 7 === 0 ? 'border-left' : '' || isCurrentDay(item) ? 'calenderItemHover' : '' ">{{item}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 获取当前时间戳(后期采用服务器时间)
				timestamp: new Date().getTime(),
				// 当前年份
				nowYear: null,
				// 当前月份
				nowMonth: null,
				// 当前日期
				nowDate: null,
				// 当前星期
				nowDay: null,
				// 日期标题
				calenderTitel: ['日', '一', '二', '三', '四', '五', '六'],
				// 日期内容
				calenderArray: [],

				yearOption: [2020, 2021],
                monthOption: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                
                currentYear: null,
                currentMonth: null,
                currentDay: null,
			}
        },
        computed: {
            isCurrentDay() {
                let {currentYear, currentMonth, currentDay, nowYear, nowMonth} = this
                return (day) => {
                    return currentYear === nowYear
                    && currentMonth === nowMonth
                    && currentDay === day
                }
            }
        },
		methods: {
			// 时间改变
			DateChange() {
				const theTime = new Date(this.nowYear, this.nowMonth - 1, 1)
				this.getNowDate(theTime)
			},
			// 拆分年月日星期
			getNowDate(theTime) {
				this.nowYear = theTime.getFullYear()
				this.nowMonth = theTime.getMonth() + 1
				this.nowDate = theTime.getDate()
				this.nowDay = theTime.getDay() // 星期日为0,其余星期对应数值
				this.getFirstDay()
			},
			getFirstDay() {
				let firstDayWeek = null
				// 获取当月1号的星期
				firstDayWeek = new Date(this.nowYear + '/' + this.nowMonth + '/' + '01').getDay()
				// 当月天数
				let nowMonthDay = this.getNowMonthDay(this.nowYear, this.nowMonth)
				let arr = []
				// 根据当月1号的星期数来给渲染数组前面添加对应数量的空格
				for (let indexEmpty = 0; indexEmpty < parseInt(firstDayWeek); indexEmpty++) {
					arr.push('')
				}
				// 通过函数判断当前月份有多少天,并根据天数填充渲染数组
				for (let indexNum = 1; indexNum < nowMonthDay + 1; indexNum++) {
					arr.push(indexNum)
				}
				// 深拷贝日历渲染数组(由于后期可能会改成签到日历,数组的每一项可能是object所以深拷贝)
				this.calenderArray = JSON.parse(JSON.stringify(arr))
			},
			// 计算当前年份是否为闰年
			isLeapYear(year) {
				return (year % 400 === 0 || year % 4 === 0) && year % 100 !== 0
			},
			// 计算当前月份有多少天
			getNowMonthDay(year, month) {
				return [null, 31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (this.isLeapYear(year) ? 29 : 28)
            },
            setCurrent() {
                let theTime = new Date()
                this.currentYear = theTime.getFullYear()
				this.currentMonth = theTime.getMonth() + 1
                this.currentDay = theTime.getDate()
            }
		},
		created() {
			// 将时间戳转换拆分为具体数值
			// 将时间戳转换为日期对象
			const theTime = typeof this.timestamp === 'object' ? this.timestamp : new Date(this.timestamp)
            this.getNowDate(theTime)
            this.setCurrent()
		}
	}
</script>

<style lang="less">
	.page {
		background: #ffffff;
		padding: 20px;
    }
    
    .year-month {
        text-align: center;
        margin-bottom: 20px;
    }
    .select {
        width: 100px;
    }

	.calenderTitle,
	.calenderInside {
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		width: 560px;
	}

	.calenderItem {
		width: 80px;
        height: 80px;
        border-right: solid 1px #eeeeee;
        border-bottom: solid 1px #eeeeee;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .calenderItem:hover {
        background: #eeeeee;
        opacity: 0.8;
        font-size: 20px;
        font-weight: bold;
        color: red;
    }
    .calenderItemHover {
        background: #eeeeee;
        opacity: 0.8;
        font-size: 20px;
        font-weight: bold;
        color: red;
    }
    .border-top {
        border-top: solid 1px #eeeeee;
    }
    .border-left {
        border-left: solid 1px #eeeeee;
    }
</style>
