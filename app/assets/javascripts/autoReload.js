$(function () {
  function buildHTML(message) {
    if (message.image) {
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

  let reloadMessages = function () {
    let last_message_id = $(".Main-chat__message-list:last").data("message-id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id },
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          let insertHTML = "";
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message);
          });
          $(".Main-chat__message-lists").append(insertHTML);
          $(".Main-chat__message-lists").animate({
            scrollTop: $(".Main-chat__message-lists")[0].scrollHeight,
          });
        }
      })
      .fail(function () {
        alert("error");
      });
  };
  setInterval(reloadMessages, 7000);
});
