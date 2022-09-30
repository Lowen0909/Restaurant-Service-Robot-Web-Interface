const videoElement = document.getElementById('input_video');
var id;
var hand;
var check1 = 2;
var check2 = 2;
var numtime = 3;
var x1_0, y1_8, y1_12, y1_16, y1_20, y1_5, y1_9, y1_13, y1_17;
var x2_0, y2_8, y2_12, y2_16, y2_20, y2_5, y2_9, y2_13, y2_17;
function onResults(results) {
    console.log("?");
    if (numtime === 3) {
        if (results.multiHandLandmarks.length === 2) {
            hand = 1;
            for (const landmarks of results.multiHandLandmarks) {
                if (hand === 1) {
                    x1_0 = landmarks[0].x;
                    y1_8 = landmarks[8].y;
                    y1_12 = landmarks[12].y;
                    y1_16 = landmarks[16].y;
                    y1_20 = landmarks[20].y;
                    y1_5 = landmarks[5].y;
                    y1_9 = landmarks[9].y;
                    y1_13 = landmarks[13].y;
                    y1_17 = landmarks[17].y;
                }
                else {
                    x2_0 = landmarks[0].x;
                    y2_8 = landmarks[8].y;
                    y2_12 = landmarks[12].y;
                    y2_16 = landmarks[16].y;
                    y2_20 = landmarks[20].y;
                    y2_5 = landmarks[5].y;
                    y2_9 = landmarks[9].y;
                    y2_13 = landmarks[13].y;
                    y2_17 = landmarks[17].y;
                }
                hand++;
            }
            if (x1_0 > x2_0) {
                if (y1_8 > y1_5 && y1_12 > y1_9 && y1_16 > y1_13 && y1_20 > y1_17) {
                    check2 = 1;
                }
                else {
                    check2 = 0;
                }
                if (y2_8 > y2_5 && y2_12 > y2_9 && y2_16 > y2_13 && y2_20 > y2_17) {
                    check1 = 1;
                }
                else {
                    check1 = 0;
                }
            }
            else {
                if (y1_8 > y1_5 && y1_12 > y1_9 && y1_16 > y1_13 && y1_20 > y1_17) {
                    check1 = 1;
                }
                else {
                    check1 = 0;
                }
                if (y2_8 > y2_5 && y2_12 > y2_9 && y2_16 > y2_13 && y2_20 > y2_17) {
                    check2 = 1;
                }
                else {
                    check2 = 0;
                }
            }

        }
        else {
            check1 = 2;
            check2 = 2;
        }
        numtime = 1;
    }
    else {
        numtime++;
    }
}

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});

camera.start();