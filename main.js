"use strict";

window.addEventListener("load", () => {
  const containerEl = document.querySelector("#newsfeed");
  const autoReloadCheckbox = document.querySelector("#autoReloadCheckbox");
  let setTime = (3 + Math.random() * 5) * 1000;
  let timerID = null;

  reloadNewsfeeds();

  function reloadNewsfeeds() {
    containerEl.innerHTML = "";

    for (let index = 0; index < catbook.newsfeed.length; index++) {
      const post = catbook.newsfeed[index];
      const postEl = createPostElement(index + 1, post);
      containerEl.prepend(postEl);
    }
  }

  const autoLoadNewsfeeds = () => {
    if (autoReloadCheckbox.checked) {
      reloadNewsfeeds();
    }
    setTimeout(autoLoadNewsfeeds, setTime);
  };

  autoLoadNewsfeeds();

  const reloadButton = document.querySelector("#logo");
  reloadButton.addEventListener("click", reloadNewsfeeds);

  autoReloadCheckbox.addEventListener("change", () => {
    if (autoReloadCheckbox.checked) {
      clearInterval(timerID);
      timerID = setInterval(reloadNewsfeeds, setTime);
    } else {
      clearInterval(timerID);
    }
  });

  function createPostElement(index, post) {
    const postEl = document.createElement("div");
    postEl.innerHTML = `
      <div class="content">
        ${index}: ${post.text}
      </div>
      <div class="feeling">
        feeling: ${post.feeling}
      </div>
      <div class="image">
        <img src="${getImageUrl()}" alt="cat_image" />
      </div>
      <div class="timestamp">
        timestamp: ${moment(post.timestamp, "YYYY/MM/DD HH:mm:S").fromNow()}
      </div>
          <div class="image-source">
      source: https://cataas.com
    </div>
    `;
    return postEl;
  }
});
