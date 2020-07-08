$(function () {
  function buildHTML(message) {
    if (message.image) {
      let html = `<div class="Main-chat__message-list" data-message-id=${message.id}>
          <div class="user">
            <div class="user__ame">
              ${message.user_name}
            </div>
            <div class="user__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`;
      return html;
    } else {
      let html = `<div class="Main-chat__message-list" data-message-id=${message.id}>
        <div class="user">
          <div class="user__name">
            ${message.user_name}
          </div>
          <div class="user__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`;
      return html;
    }
  }
  $(".new-message").on("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
      .done(function (data) {
        let html = buildHTML(data);
        $(".Main-chat__message-lists").append(html);
        $(".Main-chat__message-lists").animate({
          scrollTop: $(".Main-chat__message-lists")[0].scrollHeight,
        });
        $(".new-message")[0].reset();
        $(".submit-btn").prop("disabled", false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
        $(".submit-btn").prop("disabled", false);
      });
  });
});
