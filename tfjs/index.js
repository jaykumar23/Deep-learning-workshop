function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
    document.getElementById("result").innerHTML = "";
}

 async function load() {
        const model = await tf.loadLayersModel('tfjs.h5/model.json');
        return model;
    };

async function get_predict(model) {
    const image = document.getElementById('image');
    let tensorImg =   tf.browser.fromPixels(image).resizeNearestNeighbor([512,512]).toFloat().expandDims();
    model.then(model => {
    let result = model.predict(tensorImg).round().dataSync();
    if(result[0] == 1){
        console.log("HULK");
        document.getElementById("result").innerHTML = "STRONGEST AVENGER HULK";
        document.getElementById("result").className="hulk";
    }
    else if(result[1] == 1){
        console.log("IRON MAN");
        document.getElementById("result").innerHTML = "I AM IRON MAN";
        
        document.getElementById("result").className="ironman";
    }
    else if(result[2] == 1){
        console.log("THOR");
        document.getElementById("result").innerHTML = "STILL WORTHY THOR";
        document.getElementById("result").className="thor";
    }
    
});

}
const model = load();
