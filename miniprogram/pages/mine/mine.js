const app = getApp()

Page({
  data: {
    userInfo: {},
    hasLogin: app.globalData.hasLogin,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    
  },
  onShow() {
    if (!app.globalData.hasLogin) {
      var that = this
      wx.getUserInfo({
        success: function(res) {
          that.setData({
            userInfo: res.userInfo
          })
        }
      })
    }else {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasLogin: app.globalData.hasLogin,
      })
    }
  },
  getUserProfile: function(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        app.globalData.userInfo = res.userInfo
        //调用云函数
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
                if(!res.data.length) {
                    db.collection('bs_user').add({
                      data:{
                          user_info:app.globalData.userInfo,
                          created_at:new Date(),
                      }
                    }).then(res => {
                      console.log(res)
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
        });
        
      },
      fail:(res) => {
         console.log(res)
      }
    })
    
  }
})