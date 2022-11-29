(function () {
  function script() {
    const maine = () => {
      console.log("Maine");
      function dragElement(elmnt) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown =
            dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top =
            ((elmnt.offsetTop - pos2) / window.innerHeight) * 100 + "vh";
          elmnt.style.left =
            ((elmnt.offsetLeft - pos1) / window.innerWidth) * 100 + "vw";
        }

        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }

      let ans = {};

      for (let i = 0; i < window.total_word_count; i++) {
        ans[window.word_org[i].toString()] = window.word_trn[i];
      }

      function clickVC() {
        let wdo = document.querySelector("#VC > div > div").innerText;
        let lu = document.querySelector(
          "#VC > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div"
        );
        let ru = document.querySelector(
          "#VC > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > div"
        );
        let ld = document.querySelector(
          "#VC > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div"
        );
        let rd = document.querySelector(
          "#VC > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > div"
        );

        if (lu.innerText == ans[wdo]) {
          lu.click();
        }
        if (ru.innerText == ans[wdo]) {
          ru.click();
        }
        if (ld.innerText == ans[wdo]) {
          ld.click();
        }
        if (rd.innerText == ans[wdo]) {
          rd.click();
        }
      }

      function clickPZi(i) {
        let all = document.getElementsByTagName("td");

        for (let j = 0; j < all.length; j++) {
          if (all[j].innerText.trim() == window.puzzle_array_string[i].trim()) {
            all[j].click();
          }
        }
      }

      function clickPZ() {
        for (let i = 0; i < window.puzzle_array_string.length; i++) {
          setTimeout(clickPZi, 300 * i, i);
        }
      }

      function inputDT() {
        document.querySelector("#dicinputnew").value =
          word_org[
            Number(
              document.querySelector("#pageindex").innerText.split("/")[0]
            ) - 1
          ];
      }

      const bs = (b) => {
        b.style.padding = "12px";
        b.style.paddingLeft = "20px";
        b.style.paddingRight = "20px";
        b.style.background = "#0072F5";
        b.style.color = "white";
        b.style.margin = "2px";
        b.style.outline = "none";
        b.style.border = "none";
        b.style.borderRadius = "5px";
        b.style.cursor = "pointer";
        b.style.fontSize = "16px";

        return b;
      };

      let lastCreated = new Date();

      const alert_ = (msg) => {
        m.innerText = msg;
        m.style.opacity = "1";
        lastCreated = new Date();
        setTimeout(() => {
          if (new Date().getTime() - lastCreated.getTime() > 3000) {
            m.style.opacity = "0";
          }
        }, 3100);
      };

      let m = document.createElement("p");
      let div = document.createElement("div");
      let h1 = document.createElement("h1");
      let CP = document.createElement("button");
      let closebtn = document.createElement("button");

      // p
      (function () {
        m.style.color = "white";
        m.style.position = "absolute";
        m.style.left = "14px";
        m.style.bottom = "10px";
        m.style.transition = "all 0.3s";
        m.style.width = "290px";
        m.style.pointerEvents = "none";
        m.style.opacity = "0";
      })();

      // Div
      (function () {
        div.style.width = "250px";
        div.style.height = "80px";
        div.style.position = "fixed";
        div.style.left = "5px";
        div.style.bottom = "5px";
        div.style.zIndex = "10000";
        div.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        div.style.borderRadius = "10px";
        div.style.padding = "10px";
        div.style.cursor = "move";
      })();

      // Title
      (function () {
        h1.innerText = "English Solver";
        h1.style.color = "white";
      })();

      // Solver
      (function () {
        CP.onclick = () => {
          try {
            if (window.current_step_type == "VC") {
              clickVC();
            }
          } catch (e) {
            alert_("Error occured while solving Voca, " + e.message);
          }
          try {
            if (window.current_step_type == "PZ") {
              clickPZ();
            }
          } catch (e) {
            alert_("Error occured while solving Puzzle, " + e.message);
          }
          try {
            if (window.current_step_type == "DT") {
              inputDT();
            }
          } catch (e) {
            alert_("Error occured while solving Dictation, " + e.message);
          }
          try {
            if (window.current_step_type == "CP") {
              inputDT();
            }
          } catch (e) {
            alert_("Error occured while solving Write, " + e.message);
          }
        };
        CP.innerText = "Solve";
        CP = bs(CP);
        CP.style.background = "#F5A524";
        CP.style.width = "100%";
      })();

      // Close
      (function () {
        closebtn.onclick = () => {
          div.style.display = "none";
        };
        closebtn.innerText = "×";
        closebtn = bs(closebtn);
        closebtn.style.backgroundColor = "#DF7861";
        closebtn.style.position = "absolute";
        closebtn.style.margin = "0px";
        closebtn.style.right = "10px";
        closebtn.style.top = "14px";
        closebtn.style.color = "white";
        closebtn.style.padding = "0px";
        closebtn.style.paddingLeft = "14px";
        closebtn.style.paddingRight = "14px";
        closebtn.style.fontSize = "24px";
      })();

      // Mix
      (function () {
        div.appendChild(h1);
        div.appendChild(closebtn);
        div.appendChild(CP);
        div.appendChild(m);
      })();

      dragElement(div);

      document.body.appendChild(div);
    };

    let keys = ["", "", "", ""];
    window.onkeyup = (e) => {
      keys[0] = keys[1];
      keys[1] = keys[2];
      keys[2] = keys[3];
      keys[3] = e.key;
      if (keys.join(" ") == "H A C K") {
        maine();
      }
    };

    window.speech2 = (idx) => {
      //	if(audioElementlc.currentTime == 0) return;
      select_position_mark(current_index_count);
      $("#pageindex").html(
        parseInt(current_index_count) + parseInt(1) + "/" + total_word_count
      );

      audioElementlc.addEventListener("ended", function (event) {
        if (current_step_type == "SP") return;

        if (
          current_step_type == "SA" ||
          current_step_type == "SB" ||
          current_step_type == "SC" ||
          current_step_type == "SD" ||
          current_step_type == "RR" ||
          current_step_type == "LR"
        ) {
        } else {
          $.ajax({
            type: "GET",
            url: "https://coolenglish.co.kr/word/save.php",
            data:
              "study_setting_uid=" +
              "1386070" +
              "&m_id=" +
              "100408" +
              "&step=LC" +
              "&current_index_count=" +
              current_index_count +
              "&total_word_count=" +
              total_word_count +
              "&correct=true" +
              "&studytime=2", //+study_time,
            error: function () {},
            async: false,
            cache: false,
            complate: function (response) {},
            success: function (data) {},
          });
        }

        // 이것은 nextclick버튼 상단에 안나오게 하자.
        if (
          current_step_type == "SA" ||
          current_step_type == "SB" ||
          current_step_type == "SC" ||
          current_step_type == "SD" ||
          current_step_type == "RR" ||
          current_step_type == "LR"
        ) {
        } else {
          if (current_index_count + 1 == total_word_count) {
            //	alert('end');
            $("#nextclick").show();
            //				$("#playstop")
            //$("#stopbtn,#stopbtn1").trigger("click");//종료
          }
        }
        //	alert(player_state);
        if (player_state == 1) {
          player_state = 0;
          return true;
        }
        if (playtimer) clearTimeout(playtimer);

        //해당 스텝에서는 대기시간 없이 빠르게..
        if (
          current_step_type == "SA" ||
          current_step_type == "SB" ||
          current_step_type == "SC" ||
          current_step_type == "SD" ||
          current_step_type == "RR" ||
          current_step_type == "LR"
        ) {
          playtimer = setTimeout(timeplay, 0);
        } else {
          playtimer = setTimeout(timeplay, 0);
        }
      });
    };
  }

  function inject(fn) {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
  }

  inject(script);
})();
