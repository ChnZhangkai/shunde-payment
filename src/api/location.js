export default{
  getLocation(onGetLocation){
    if (navigator.geolocation) {
      let options = {
        enableHighAccuracy: true,
        timeout: 30000,
      };
      let suc_callback = function (position) {
        let latitude = position.coords.latitude;//获取纬度
        let longitude = position.coords.longitude;//获取经度
        console.log("纬度：" + latitude + " 经度：" + longitude);
        var point = new BMap.Point(longitude, latitude);
        var map = new BMap.Map('allmap');
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);
        var geoc = new BMap.Geocoder();
        //坐标转换完之后的回调函数
        var translateCallback = function (data) {
          if (data.status === 0) {
            geoc.getLocation(data.points[0], function (rs) {
              //addressComponents对象可以获取到详细的地址信息
              var addComp = rs.addressComponents;
              console.log(addComp);
              var location = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
              console.log(location);
              console.log(rs.address);
              onGetLocation(location)
            });
          }
        }
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(point);
        convertor.translate(pointArr, 1, 5, translateCallback)

      };
      let fail_callback = function (error) {
        console.log('地理位置错误：' + JSON.stringify(error));
      };
      navigator.geolocation.getCurrentPosition(suc_callback, fail_callback, options)
    } else {
      alert("不支持定位功能");
    }
  },

  getIOSLocationIos(latitude, longitude, onGetLocationIOS){
    // alert('获取经纬度回调! latitude: ' + latitude + ", longitude: " + longitude)
    //特殊处理，ios版本获取地理位置
    if (navigator.geolocation) {
      let options = {
        enableHighAccuracy: true,
        timeout: 30000,
      };
      // alert('123456')
      let suc_callback = function (position) {

        // alert("纬度：" + latitude + " 经度：" + longitude)
        console.log("纬度：" + latitude + " 经度：" + longitude);
        var pointIos = new BMap.Point(longitude, latitude);
        var mapIos = new BMap.Map('allmap');
        mapIos.centerAndZoom(pointIos, 12);
        mapIos.enableScrollWheelZoom(true);
        var geocIos = new BMap.Geocoder();

        //坐标转换完之后的回调函数
        var translateCallbackIos = function (data) {
          if (data.status === 0) {
            geocIos.getLocation(data.points[0], function (rs) {
              //addressComponents对象可以获取到详细的地址信息
              var addCompIos = rs.addressComponents;
              console.log(addCompIos);
              var locationIOS = addCompIos.province + addCompIos.city + addCompIos.district + addCompIos.street + addCompIos.streetNumber;
              // alert('ios逆解析经纬度地址为: ' + locationIOS)
              onGetLocationIOS(locationIOS);
              return
            });
          }else{
            alert('逆解析坐标转换失败')
          }
        };
        var convertorIos = new BMap.Convertor();
        var pointArrIos = [];
        pointArrIos.push(pointIos);
        convertorIos.translate(pointArrIos, 1, 5, translateCallbackIos);

      };
      let fail_callback = function (error) {
        console.log('地理位置错误：' + JSON.stringify(error));
      };
      navigator.geolocation.getCurrentPosition(suc_callback, fail_callback, options);
    } else {
      alert("不支持定位功能");
    }
  }

}
