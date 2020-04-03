// изменение названия товара
$(document).on("click", ".product-item h3", function() {
  var item = $(this).parent();
  var header = $(this).text();
  $(this).remove();
  item.append('<textarea type="text">' + header + "</textarea>");
  item.find("textarea").focus();
});
$(document).on("change", ".product-item textarea", function() {
  var itemId = $(this)
    .closest(".product-item")
    .attr("data-id");
  var item = $(this).parent();
  var header = $(this).val();
  $.ajax({
    method: "POST",
    url: "/",
    data: { header: header, id: itemId }
  })
    .done(function() {
      console.log("done");
    })
    .fail(function() {
      console.log("fail");
    });
  console.log(itemId);
  $(this).remove();
  item.append("<h3>" + header + "</h3>");
});
// перетаскивание товара
document.querySelectorAll(".col").forEach(e => {
  e.draggable = true;
  e.ondragstart = e => {
    e.dataTransfer.setData("id", e.target.closest(".col").id);
    e.target.closest(".col").classList.add("dragging");
  };
  e.ondragover = e => {
    let old = document.querySelector(".over");
    old && old.classList.remove("over");
    e.target.closest(".col").classList.add("over");
    e.preventDefault();
  };
  e.ondrop = e => {
    let old = document.querySelector(".dragging");
    old && old.classList.remove("dragging");
    old = document.querySelector(".over");
    old && old.classList.remove("over");
    let v = e.target.closest(".col").innerHTML;
    let fromEl = document.querySelector("#" + e.dataTransfer.getData("id"));
    e.target.closest(".col").innerHTML = fromEl.innerHTML;
    fromEl.innerHTML = v;
  };
});
// 4 задание

//Валидация
let brackets = {
  "[": "]",
  "{": "}",
  "(": ")",
  "<": ">"
};
function correctBrackets(str) {
  var brackets = {
    "[": "]",
    "{": "}",
    "<": ">",
    "(": ")"
  };
  var openBrackets;
  var closeBrackets;
  if (str.length % 2 != 0) {
    return null;
  }
  for (var i = 0; i < str.length / 2; i++) {
    if (!brackets[str[i]]) {
      return null;
    }
  }
  openBrackets = str.substr(0, str.length / 2);
  closeBrackets = str.substr(str.length / 2).split("");
  for (var i = 0, ri; i < str.length / 2; i++) {
    ri = str.length / 2 - (i + 1);
    if (brackets[openBrackets[i]] != closeBrackets[ri]) {
      closeBrackets[ri] = brackets[openBrackets[i]];
    }
  }
  closeBrackets = closeBrackets.join("");
  return openBrackets + closeBrackets;
}

console.log(correctBrackets("{((])]"));

// проверка
var testСorrect = function(str) {
  var chars = str.split(""),
    stack = [],
    open = ["{", "(", "["],
    close = ["}", ")", "]"],
    closeIndex,
    openIndex;

  for (var i = 0, len = chars.length; i < len; i++) {
    openIndex = open.indexOf(chars[i]);
    if (openIndex !== -1) {
      stack.push(openIndex);
      continue;
    }

    closeIndex = close.indexOf(chars[i]);
    if (closeIndex !== -1) {
      openIndex = stack.pop();
      if (closeIndex !== openIndex) {
        return false;
      }
    }
  }

  if (stack.length !== 0) {
    return false;
  }

  return true;
};

console.log(testСorrect(correctBrackets("{((])]")));
