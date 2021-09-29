// Tips:请严格按照Javascript语法进行编写
function onCreatedEventCallBack(currentComponentInstance, ...arg) {
  document.documentElement.scrollTop = 0;
  var setTop = sessionStorage.getItem("id68_top");
  sessionStorage.setItem("id68_top_sec", setTop);
  /**
   * 函数体内的单行注释会在保存的时候删除,如果需要加注释请使用多行注释
   * window.Uidesigner.$refs[组件ID] 可以访问页面上组件实例对象
   * 支持返回Promise对象
   * @param {Object} currentComponentInstance 默认第一参数是当前组件实例对象
   * @param {Array} arg 当前事件剩余参数
   */
  const _this = currentComponentInstance
  const _e = _this.$route.query.e

  var load = currentComponentInstance.$loading();
  var param = JSON.parse(sessionStorage.getItem("id68"));

  http.post(param.url, param,
    { headers: { 'token': _e, "content-type": "application/json" } })
    .then(res => {
      var data = res.data;
      var label_value = "共" + data[data.length - 1].total_number + "条  "
        + data[data.length - 1].current_number + "条/页   当前第"
        + data[data.length - 1].current_page + '/'
        + data[data.length - 1].total_page + "页";
      window.Uidesigner.$refs["cLabel_cacb85c6616ef6ae"].options.title = label_value;
      window.Uidesigner.$refs["xaTable_5f325382cadde823"].setCurrentValue(data);
      window.Uidesigner.$refs["xaInputNumber_453670e3b38d0c8e"].setCurrentValue(data[data.length - 1].current_page);

      var params = {
        JB_QYJC: param.JB_QYJC,
        JB_QYMC: param.JB_QYMC,
        JB_ZCD: param.JB_ZCD,
        JB_ZCRQ: param.JB_ZCRQ,
        current_number: data[data.length - 1].current_number,
        current_page: data[data.length - 1].current_page,
        pagesum: data[data.length - 1].total_page,
        name: param.name,
        url: param.url,
      };

      sessionStorage.setItem("id68", JSON.stringify(params));
    }).finally(() => load.close());
}