var offsetX;
var offsetY;
var selectedImage = null;
var currentGroup = 0;
var buttonGroups;
var titles = [
    "背景画像を作ろう",
    "動物を配置しよう",
    "エフェクトを追加しよう"
];

function doInit() {
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    buttonGroups = document.querySelectorAll('.button-group');
    showButtonGroup(currentGroup);
    updateTitle(currentGroup);

    const switch1 = document.getElementById("switch1");
    const switch2 = document.getElementById("switch2");
    const switch3 = document.getElementById("switch3");

    switch1.addEventListener("click", () => changeImg("light1"));
    switch2.addEventListener("click", () => changeImg("light2"));
    switch3.addEventListener("click", () => changeImg("light3"));
}

function showButtonGroup(index) {
    buttonGroups.forEach((group, i) => {
        group.classList.toggle('active', i === index);
    });
    document.getElementById('prevButton').style.display = index === 0 ? 'none' : 'inline-block';
    document.getElementById('nextButton').style.display = index === buttonGroups.length - 1 ? 'none' : 'inline-block';
}

function nextGroup() {
    if (currentGroup < buttonGroups.length - 1) {
        currentGroup++;
        showButtonGroup(currentGroup);
        updateTitle(currentGroup);
    }
}

function prevGroup() {
    if (currentGroup > 0) {
        currentGroup--;
        showButtonGroup(currentGroup);
        updateTitle(currentGroup);
    }
}

function updateTitle(index) {
    document.getElementById('dynamic-title').textContent = titles[index];
}

function onMouseDown(e) {
    if (selectedImage) {
        selectedImage.style.opacity = 1; 
    }
    selectedImage = this;
    selectedImage.style.opacity = 0.5; 
    offsetX = e.pageX - parseInt(this.style.left);
    offsetY = e.pageY - parseInt(this.style.top);

    activateSliders(this);

    return false;
}

function onMouseMove(e) {
    if (selectedImage) {
        var newX = e.pageX - offsetX;
        var newY = e.pageY - offsetY;

        selectedImage.style.left = newX + 'px';
        selectedImage.style.top = newY + 'px';

        return false;
    }
}

function onMouseUp(e) {
    if (selectedImage) {
        selectedImage.style.opacity = 1; // 選択解除時に元に戻す
    }
    selectedImage = null;
}

function showImages(type) {
    var container = document.getElementById(type + "-container");
    container.innerHTML = '';
    var newImage = document.createElement("div");
    newImage.className = "image-item";
    newImage.style.top = "50%";
    newImage.style.left = "50%";
    newImage.style.transform = "translate(-50%, -50%)";
    newImage.innerHTML = `
        <img src="images/${type}.png" width="100px" height="100px" alt="${type}">
    `;
    newImage.onmousedown = onMouseDown;
    container.appendChild(newImage);

    var resizeXSlider = document.getElementById(type + "-resize-x");
    var resizeYSlider = document.getElementById(type + "-resize-y");
    var rotateSlider = document.getElementById(type + "-rotate");
    resizeXSlider.value = 100;
    resizeYSlider.value = 100;
    rotateSlider.value = 0;
    document.getElementById(type + "-scale-x").textContent = "100%";
    document.getElementById(type + "-scale-y").textContent = "100%";
    document.getElementById(type + "-rotation").textContent = "0°";

    activateSliders(newImage);
}

function activateSliders(image) {
    var type = image.querySelector("img").alt;

    var resizeXSlider = document.getElementById(type + "-resize-x");
    var resizeYSlider = document.getElementById(type + "-resize-y");
    var rotateSlider = document.getElementById(type + "-rotate");

    resizeXSlider.oninput = function () {
        var scaleX = this.value / 100;
        var img = image.querySelector("img");
        img.style.width = 80 * scaleX + 'px';
        document.getElementById(type + "-scale-x").textContent = this.value + "%";
    };

    resizeYSlider.oninput = function () {
        var scaleY = this.value / 100;
        var img = image.querySelector("img");
        img.style.height = 80 * scaleY + 'px';
        document.getElementById(type + "-scale-y").textContent = this.value + "%";
    };

    rotateSlider.oninput = function () {
        var rotation = this.value;
        image.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        document.getElementById(type + "-rotation").textContent = rotation + "°";
    };
}

document.getElementById("switch1").addEventListener("click", function() {
    toggleSwitch("musi", this);
});

document.getElementById("switch2").addEventListener("click", function() {
    toggleSwitch("tori", this);
});

document.getElementById("switch3").addEventListener("click", function() {
    toggleSwitch("sakana", this);
});

function toggleSwitch(type, element) {
    var imgElement = document.getElementById(type + "-container").querySelector("img");
    if (imgElement) {
        var currentSrc = imgElement.getAttribute("src");
        if (currentSrc.includes(type + ".png")) {
            imgElement.setAttribute("src", "images/" + type + ".gif");
        } else {
            imgElement.setAttribute("src", "images/" + type + ".png");
        }
    }
}
$("#switch1").on("click", function () {
    $(this).toggleClass("change");
  });
  $("#switch2").on("click", function () {
    $(this).toggleClass("change");
  });
  $("#switch3").on("click", function () {
    $(this).toggleClass("change");
  });

//雲アニメーション
        var animationInterval;

        $(function() {
            // 中に入る雲を position:absolute するので
            $('#sky').css({
        position: "absolute",
        top: 0,
        left: "50%", // ウィンドウの幅の50%の位置に設定
        transform: "translateX(-50%)", // 幅の50%から左に半分移動して中央に配置
        overflow: "hidden"
    });

            // 指定されたURLの画像の雲をskyの中に置く
            function addObject(url) {
                var speed = 30000 + Math.floor(Math.random() * 30000);
                var top = -100 + Math.floor(Math.random() * 200);
                var $div = $("<div>").css({"position": "absolute", "top": top, "left": "-200px"}).animate({
                    left: $("#sky").width()
                }, speed, "linear", function() {
                    $(this).remove();
                });
                $div.append('<img src="' + url + '">');
                $("#sky").append($div);
            }

            // 雲アニメーションを開始する関数
            function startAnimation() {
                if (animationInterval) return; // 既にアニメーションが開始されている場合は何もしない

                animationInterval = setInterval(function() {
                    if ($('#sky div').length > 100) {
                        return;
                    } else {
                        if (Math.random() < 0.20) {
                            addObject("images/cloud1.png");
                        }
                        if (Math.random() < 0.10) {
                            addObject("images/cloud2.png");
                        }
                    }
                }, 100);
            }

            // 雲アニメーションを停止する関数
            function stopAnimation() {
                clearInterval(animationInterval);
                animationInterval = null;
                $('#sky').empty(); // 雲を全て削除
            }

            // ボタンのイベントリスナーを設定
            $('#cloudButton').on('click', startAnimation);
            $('#stopButton').on('click', stopAnimation);

            // ページ読み込み時に初期化
            doInit();
        });

        //雨アニメーション
        document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const sakuraBox = document.querySelector('.sakura_parts_box');
    
    startButton.addEventListener('click', function() {
        sakuraBox.classList.add('animate');
        // Start creating sakura images at intervals
        setInterval(createSakura, 200); // Adjust the interval as needed
    });

    stopButton.addEventListener('click', function() {
        sakuraBox.classList.remove('animate');
        sakuraBox.querySelectorAll('img').forEach(img => {
            img.style.animation = 'none'; // Stop animation
            img.offsetHeight; // Force reflow to stop animation
            img.style.animation = ''; // Reset animation
        });
    });
});