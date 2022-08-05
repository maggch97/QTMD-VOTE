// ==UserScript==
// @name         QTMD VOTE
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://edgecontest.microsoft.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let workDataId = localStorage.getItem("workDataId");
    let workData = null;
    if (workDataId != null) {
        let fetchWorkData = async () => {
            if (workData == null) {
                workData = await (await fetch("https://edgecontest.microsoft.com/api/api/WorkData/GetWorkDataById?workDataId=4804cffd-239a-4847-86a5-9e9205d24aee")).json();

            } else {
                fetch("https://edgecontest.microsoft.com/api/api/WorkData/GetWorkDataById?workDataId=4804cffd-239a-4847-86a5-9e9205d24aee").then(r => r.json()).then(data => { workData = data })
            }
            console.log(workData);
            document.getElementsByClassName("wnllist")[0].innerHTML = `
    <div class="wnllistnum">
          <div class="wnllistnuml">
              <img src="${workData.Data.Icon}" alt="worklistimg" class="worklistimg">
              <div class="wnlrqznum">人气值：${parseInt(Date.now()/1000 - 1659684477.075) *5 + 10000}</div>
              <div class="toubtnbox ">
                <div onclick='document.getElementsByClassName("wnlrqznum")[0].innerHTML="人气值：${workData.Data.Popularity}"' class="toubtn" data-id="${workDataId}">刮奖</div>
                  <div class="popupcode">
                      <div class="popupcodetext">微信扫一扫<br>助 TA 人气飙升</div>
                      <div class="popupcodeimg popupcodeimg0"><canvas width="110" height="110"></canvas></div>
                  </div>
              </div>
          </div>
          <div class="wnllistnumr" onclick="clickWornumktitle('${workDataId}')">
              <div class="wornumktitle" title="${workData.Data.Name}" data-id="${workDataId}">${workData.Data.Name}</div>
              <div class="workteam" title="ToLiveAHealthyLife">ToLiveAHealthyLife</div>
              <div class="workxtlb">${workData.Data.TopicName} | ${workData.Data.CategoryName}</div>
              <div class="workmsg">
                  作品简介：${workData.Data.Message}

              </div>
          </div>
        </div>
    `
        }
        fetchWorkData();
        let observer = new MutationObserver(() => {
            if (document.getElementsByClassName("wnllist")[0].childElementCount > 1) {
                fetchWorkData();
            }
        });
        observer.observe(document.getElementsByClassName("wnllist")[0], {
            subtree: true,
            attributes: true,
            childList: true,
        })
    } else {
        let observer = new MutationObserver(() => {
            if (document.getElementsByClassName("wnllist")[0].childElementCount > 0) {
                document.getElementsByClassName("wnllist")[0].innerHTML = "";
            }

        });
        observer.observe(document.getElementsByClassName("wnllist")[0], {
            subtree: true,
            attributes: true,
            childList: true,
        })
    }

})();