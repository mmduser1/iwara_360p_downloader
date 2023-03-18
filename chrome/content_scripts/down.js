'use strict';
{
  /**
   * 動画の情報を取得してbackgroundへ投げる
   */
  let getInfo = (request, sender, sendResponse) => {

    let down_list = document.querySelector(".downloadButton").closest("div.dropdown").querySelectorAll("a").length
    let source_url = document.querySelector(".downloadButton").closest("div.dropdown").querySelectorAll("a")[down_list-1].href

    let title = document.querySelector(".page-video__details").querySelector(".text").textContent
    let username = document.querySelector(".page-video__byline__info").querySelector(".text").innerText
    let user_id = document.querySelector(".page-video__byline__info").querySelector(".text--muted").innerText.slice(1)
    let video_id = source_url.split(/%5D|%5B/)[1];
    let like = document.querySelector(".page-video__stats").querySelectorAll(".text")[0].innerText.trim()
    let view = document.querySelector(".page-video__stats").querySelectorAll(".text")[1].innerText.trim()
    let year = document.querySelector("#vjs_video_3_html5_api").src.match(/(\d{4})%2F(\d{2})%2F(\d{2})/)[1]
    let month = document.querySelector("#vjs_video_3_html5_api").src.match(/(\d{4})%2F(\d{2})%2F(\d{2})/)[2]
    let day = document.querySelector("#vjs_video_3_html5_api").src.match(/(\d{4})%2F(\d{2})%2F(\d{2})/)[3]

    chrome.storage.local.get({
      auto_like: false
    },(settings)=>{
      if(settings.auto_like){
        let like_button = document.querySelector(".page-video__actions").querySelector(".text").innerText.trim()
        if(typeof like_button !== "undefined" && !(like_button.textContent.indexOf("いいねを解除") > -1)){
          like_button.click();
        }
      }
    });

    chrome.runtime.sendMessage({
      source_url: source_url,
      title: title,
      username: username,
      year: year,
      month: month,
      day: day,
      like: like,
      view: view,
      video_id: video_id,
      user_id: user_id
    });

    sendResponse({});
    return true;
  }

  /**
   * backgroundからのメッセージを受信したらgetInfoを実行
   */
  chrome.runtime.onMessage.addListener(getInfo);
}