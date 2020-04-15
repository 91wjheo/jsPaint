

const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const controls_colors = document.querySelector('.controls_colors');
const jsRange = document.getElementById('jsRange');
const jsMode = document.getElementById('jsMode');
const jsSave = document.getElementById('jsSave');

const CANVAS_WIDTH = 700
    ,CANVAS_HEIGHT = 700;

let painting =  false;
let filling = false;

function setCanvasSize(canvasObj, x, y){
    canvasObj.width = x;
    canvasObj.height = y;
}
function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // false 일때
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
        console.log('begin', x, y);
    }else {
        // true 일때
        ctx.lineTo(x, y);
        ctx.stroke();
        console.log('line', x, y);
    }
}

/**
 *  이벤트가 발생한 곳의 색으로 바꿔준다.
 * @param event
 */
function handleColor(event){
    console.log(event);
    console.log(event.target); // 이벤트가 발생한곳
    console.log(event.currentTarget); // 이벤트가 등록된 곳
    console.log(event.target.style.backgroundColor);
    const clickedColor = event.target.style.backgroundColor;
    ctx.strokeStyle = clickedColor;
    ctx.fillStyle = clickedColor;
}

function changeSlider(event){
    console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

function handleClickModeButton(event){
    if(filling){
        filling = false;
        jsMode.innerText = "LINE";
        // cursor 모양을 연필
        canvas.classList.remove("fill_cursor");
        canvas.classList.add("pen_cursor");

    }else{
        filling = true;
        jsMode.innerText = "FILL";
        // cursor 모양을 페인트통으로
        canvas.classList.remove("pen_cursor");
        canvas.classList.add("fill_cursor");
    }
}

function fillCanvas(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

/**
 * 마우스우클릭 이벤트 발생시 나오는 메뉴 즉, contextmenu가 나오는걸 막는다.
 * @param event
 */
function handleCM(event){
    event.preventDefault();
}

function handleClickSaveButton(event){
    // console.log(canvas.toDataURL());
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "PaintJS";
    link.click();
}



function init(){
// 항상 이런식으로 DOM이 존재하는지 확인 후에 해당 DOM을 핸들링 하는게 좋은 코딩방식!
    if(canvas){
        setCanvasSize(canvas, CANVAS_WIDTH, CANVAS_HEIGHT);

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
        canvas.addEventListener('mousedown', fillCanvas);
        canvas.addEventListener('contextmenu', handleCM);

        // 색깔 컨트롤들의 상위태그에 이벤트를 등록하여 event delegation을 이용하여 각 색깔 div들에 이벤트 리스너를 등록한 것 처럼 함.
        controls_colors.addEventListener('click', handleColor);
    }

    if (ctx){
        ctx.width = 700;
        ctx.height = 700;
        ctx.strokeStyle = "#2c2c2c";
        ctx.lineWidth = 0.3;

    }

    if(jsRange) {
        jsRange.addEventListener('input', changeSlider);
    }

    if(jsMode){
        jsMode.addEventListener('click', handleClickModeButton);
    }
    if(jsSave){
        jsSave.addEventListener('click', handleClickSaveButton);
    }


}

init();