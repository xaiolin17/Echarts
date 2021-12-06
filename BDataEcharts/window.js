// Tips:请严格按照Javascript语法进行编写
function onRowClickEventCallBack(currentComponentInstance, ...arg) {
      /**
       * 函数体内的单行注释会在保存的时候删除,如果需要加注释请使用多行注释
       * window.Uidesigner.$refs[组件ID] 可以访问页面上组件实例对象
       * 支持返回Promise对象
       * @param {Object} currentComponentInstance 默认第一参数是当前组件实例对象
       * @param {Array} arg 当前事件剩余参数
       */
      const _this = currentComponentInstance
      /**
       * 获取e这个参数
       */
      const _e = _this.$route.query.e
      let newDiv = null;
      var fund_company_data = new Array();
      var company_data_s = new Array();

      var load = currentComponentInstance.$loading();

      http.post("http://xxx.xxx.xx.xxx:xxxx/cors/xxx.xxx.xx.xxx:xxxx/dataModel/executeQuery", {
            id: 11,
            params: "{\"sub_company\":\"" + arg[0].fundCompany + "\"" +
                  ",\"company_name\":\"xxx有限公司\"" +
                  ",\"primary_company\":\"\"" +
                  ",\"JB_ZCD\":\"\"" +
                  ",\"JB_ZCRQ\":\"\"" +
                  ",\"current_page\":1" +
                  ",\"current_number\":10}"
      },
            { headers: { 'token': _e, "content-type": "application/json", "agent": "Nexus" } })
            .then(res => {
                  fund_company_data = res.data[0];

                  http.post("http://xxx.xxx.xx.xxx:xxxx/cors/xxx.xxx.xx.xxx:xxxx/dataModel/executeQuery", {
                        id: 28,
                        params: "{\"JB_QYMC\":\"" + arg[0].fundCompany + "\"}"
                  },
                        { headers: { 'token': _e, "content-type": "application/json", "agent": "Nexus" } })
                        .then(res => {
                              company_data_s = res.data;

                              newDiv = document.createElement('div')
                              newDiv.style.cssText = `
                  position: fixed;
                  top: 0;
                  left: 0%;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0,0,0,0.5);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 10px 0;
                  word-break: break-all;`
                              const str = `
                        <span 
                              id="close" 
                              style="
                                    position: absolute;
                                    top: 5px;
                                    right: 5vw;
                                    background-color: #fff;
                                    color: #333;
                                    font-size: 14px;
                                    width: 24px;
                                    height: 24px;
                                    line-height: 24px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;"
                              >X</span><div 
                                    style="
                                          padding: 10px;
                                          background-color: #fff;
                                          color: #333;
                                          width: 95%;
                                          min-height: 95%;
                                          max-height: 95%;
                                          overflow-y: auto;"
                                    >
                        <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto; font-size: 14px">
                              <tr>
                              <td   colspan="8"
                                    style="
                                    text-align: center;
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                              ">一、基金信息</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >出资企业</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].investmentEnterprise}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >参控股基金管理公司</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].fundCompany}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >年度</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].year}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >季度</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].quarter}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >经营状况</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].stateBusiness}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >注册资本（万元）</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].registeredCapital}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >发起设立基金</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].initialization}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >是否在基金业协会登记</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].registration}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >投资项目</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].investmentProjects}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >资金投向</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].moneyDirection}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >募集资金额（万元）</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].amountRaised}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >项目投资金额（万元）</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].projectInvestmentAmount}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >基金存续情况</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].fundStatus}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >存续金额（万元）</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].remainingAmount}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >基金类型</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].fundType}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >下一步计划</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].nextStep}</td>
                        </tr>
                        <tr>
                              <td   colspan="2"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                                    >备注</td>
                              <td   colspan="6"
                                    style="
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;"
                              >${arg[0].remark}</td>
                        </tr>
                         
                        <tr>
                              <td colspan="8"
                                    style="
                                    text-align: center;
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                              ">二、参控股基金管理公司详情</td>
                        </tr>
                        
                     <tr>
                        <td   colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >企业名称</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_QYMC || fund_company_data.companyname || fund_company_data.sub_company || fund_company_data.C1 || fund_company_data.STDNAME}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >工商注册登记号</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_GSZCDJH}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >法定代表人</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_FDDBR}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >注册时间</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_ZCRQ}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >注册资本（万元）</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.ZCZB}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >注册地</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_ZCD}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >详细地址</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_XXDZ}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >境内境外</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.GQDJ_JNJW}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >是否正常经营</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_SFZCJY}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >经营范围</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_JYFW}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >设立注册日期</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_ZCRQ}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >控制权类型</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_KZQLX}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >变动产权登记情形</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_BDCQDJQX}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >登记类型</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.GQDJ_DJLX}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >补充说明</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_BCSM}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >企业级次</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_QYJC}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >变动产权登记情形</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_BDCQDJQX}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >主要行业</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_SSHY}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >股权比例变动情况</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_GQBLBDQK}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >集团本部流转情况</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_JTBBLZQK}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >注册资本币种选择</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_ZCZBBZXZ}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >合计股权比例</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.HJGQBL}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >行标识</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.RECID}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >指标</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.HJGQBL}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >注销产权登记情形</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_ZXCQDJQX}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >出资企业审批情况</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_CZQYSPQKWZ}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >事由说明</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_SYSM}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >上级管理单位组织机构代码</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_SJGLDWZZJGDM}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >合计实缴资本</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.HJSJZCJ}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >主要出资企业组织机构代码</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_CZRZZJGDM}</td>
                     </tr>
                     <tr>
                        <td colspan="2"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;
                              width: 100px;
                              background: #f5f5f5"
                              >交易金额（万元）</td>
                        <td colspan="6"
                              style="
                              padding: 10px;
                              border: 1px solid #d8d8d8;"
                        >${fund_company_data.JB_JYJE}</td>
                     </tr>
                        
                        <tr>
                              <td colspan="8"
                                    style="
                                    text-align: center;
                                    padding: 10px;
                                    border: 1px solid #d8d8d8;
                                    background: #f5f5f5"
                              ">三、出资情况</td>
                        </tr>
                        
                        <tr>
                              <td colspan="2" style="padding: 10px; border: 1px solid #d8d8d8; background: #f5f5f5">出资人名称</td>
                              <td colspan="1" style="padding: 10px; border: 1px solid #d8d8d8; background: #f5f5f5">组织代码</td>
                              <td colspan="1" style="padding: 10px; border: 1px solid #d8d8d8; background: #f5f5f5">出资人类别</td>
                              <td style="padding: 10px; border: 1px solid #d8d8d8; background: #f5f5f5">投资金额（万元）</td>
                              <td style="padding: 10px; border: 1px solid #d8d8d8; background: #f5f5f5">实缴金额（万元）</td>
                              <td style="padding: 10px; border: 1px solid #d8d8d8; background: #f5f5f5">其中财政资金金额（万元）</td>
                              <td style="padding: 10px; border: 1px solid #d8d8d8; background: #f5f5f5">股权比例（%）</td>
                        </tr>
                        ${company_data_s ? company_data_s.map((value, index) => {
                                    return `<tr>
                                    <td colspan="2" style="padding: 10px;border: 1px solid #d8d8d8;">${value.FD_CZRMC}</td>
                                    <td colspan="1" style="padding: 10px;border: 1px solid #d8d8d8;">${value.FD_CZRZZJGDM}</td>
                                    <td colspan="1" style="padding: 10px;border: 1px solid #d8d8d8;">${value.CZRLB}</td>
                                    <td colspan="1" style="padding: 10px;border: 1px solid #d8d8d8;">${value.CZE}</td>
                                    <td style="padding: 10px;border: 1px solid #d8d8d8;">${value.SJZCJ}</td>
                                    <td style="padding: 10px;border: 1px solid #d8d8d8;">${value.CZZJJE}</td>
                                    <td style="padding: 10px;border: 1px solid #d8d8d8;">${value.GQBL}</td>
                                    
                              </tr>`
                              }).join('') : ""}
                        
                  </table>
            </div>`;

                              newDiv.innerHTML = str;

                              document.body.appendChild(newDiv);

                              /**document.addEventListener('touchmove', bodyScroll, false); */
                              /**document.body.on('touchmove', function (e) {
                               e.preventDefault();  //阻止默认行为
                              }) */
                              /** 关闭 */

                              document.getElementById('close').addEventListener('click', function () {
                                    newDiv.remove();
                              })
                        }).finally(() => load.close());
            })


}