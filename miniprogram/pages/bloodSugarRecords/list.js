const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    length: false
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
      console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(!getApp().globalData.openid) {
        wx.switchTab({
          url: '/pages/mine/mine',
        })
    } else {
      const db = wx.cloud.database()
      const MAX_LIMIT = 100
      db.collection('bs_measure_record').where({_openid:app.globalData.openid}).count()
      .then(res => {
          const batchTimes = Math.ceil(res.total / 100)
          var records = [];
          for (let i = 0; i < batchTimes; i++) {
            db.collection('bs_measure_record').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get().then(res => {
               records =  records.concat(res.data)
               if(i == batchTimes-1) {
                   var recordMap = {}
                    records.forEach(element => {
                        if(!recordMap[element.date]) {
                          recordMap[element.date] = []
                        }
                        recordMap[element.date].push(element)
                    });
                    var allItems = []
                    for (var key in recordMap) {
                      allItems.push({date:key, items:recordMap[key]})
                    }
                    console.log(allItems)
                    this.setData({
                      records: allItems,
                      length: allItems.length > 0
                    })
               }
            })
          }
      });
    }
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

  },
})