// pages/bloodSugarRecords/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: '随机', name: '随机', checked: 'true'},
      {value: '凌晨3点', name: '凌晨3点'},
      {value: '早餐前', name: '早餐前'},
      {value: '早餐后', name: '早餐后'},
      {value: '午餐前', name: '午餐前'},
      {value: '午餐后', name: '午餐后'},
      {value: '晚餐前', name: '晚餐前'},
      {value: '晚餐后', name: '晚餐后'},
      {value: '睡前', name: '睡前'},
    ],
    dateMinute: '',
    timePeriod:'随机',
    recordValue:'',
    remark:'',
  },
  radioChange(e) {
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      timePeriod: e.detail.value
    })
  },
  recordValueInput:function(e)
  {
    this.setData({
      recordValue: e.detail.value
    })
  },
  remarkInput:function(e)
  {
    this.setData({
      remark: e.detail.value
    })
  },
  bindFormSubmit:function() {
      console.log(this.data.dateMinute,this.data.recordValue, this.data.timePeriod,this.data.remark)
      const db = wx.cloud.database()
      db.collection('bs_measure_record').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          date_minute: this.data.dateMinute,
          record_value: this.data.recordValue,
          time_period: this.data.timePeriod,
          remark: this.data.remark,
          date: this.data.dateMinute.slice(0,10),
          created_at:new Date()
        }
      }).then(res => {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 2000
        });
        wx.navigateTo({
          url: 'list',
        })
      })
  },
  /**
   * 年月日时分选择类型的回调函数，可以在该函数得到选择的时间
   */
  selectDateMinuteChange(ev) {
    this.setData({
      dateMinute: ev.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    month = month > 9 ? month: '0' + month;
    var day = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate();
    var datetime = myDate.getFullYear() + '-' + month + '-' + day +' ' + myDate.getHours() + ':' + myDate.getMinutes();
    this.setData({
      dateMinute:  datetime
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})