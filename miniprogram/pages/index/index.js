// pages/home/homePage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      //调用云函数
      var that = getApp()
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid;
          const db = wx.cloud.database({})
          db.collection('bs_user').where({
            _openid: res.result.openid
          })
          .get({
            success: function(res) {
              if(res.data.length > 0) {
                that.globalData.userInfo = res.data[0].user_info;
                that.globalData.openid = res.data[0]._openid;
                that.globalData.hasLogin = true;
              } else {
                wx.switchTab({
                  url: '/pages/mine/mine',
                })
              }
            },
            fail:function(res) {
              console.log(res)
            },
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
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