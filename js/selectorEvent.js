
loadbtn.addEventListener("click", ()=>{
    let wait = new Promise((resolve, reject) => {
        res = resolve;
        renderWindow.contentWindow.location.reload();
    })
    log("info", `Load All With: ${selection.model.length} model, ${selection.camera.length} camera, ${selection.vmd.length} vmd, ${selection.map.length} object`);
    wait.then(() => {
        if (window.renderFrame) {
            const wd = window.renderFrame;
            wd.loadAll(selection);
            meshView.innerHTML = "";
            _meshManager = new MeshManager(meshView, wd.scene);
            setUpManager(_meshManager);
            record = new RecordVideo(renderFrame.renderer.domElement);
            document.querySelector(".record-canvas").style.opacity = "1";
        }
    });
});

domAni.querySelector(".bar-progress").addEventListener("click", (e) =>{
    if(!window.renderFrame) return;
    if(!window.renderFrame.ready) return;
    var tar = e.target;
    var x = e.layerX;
    var w = tar.offsetWidth;
    var per = x / w;
    var time = getTimeAnimation(selection.model[0].url);
    var value = per * time.duration;
    setTimeForAnimate(selection.model[0].url, value);
    if(_sync === true){
        setTimeForCam(value);
    }
});
domCam.querySelector(".bar-progress").addEventListener("click", (e) =>{
    if(!window.renderFrame) return;
    if(!window.renderFrame.ready) return;
    var tar = e.target;
    var x = e.layerX;
    var w = tar.offsetWidth;
    var per = x / w;
    var time = getTimeCamera();
    var value = per * time.duration;
    setTimeForCam(value);
    if(_sync === true){
        setTimeForAnimate(selection.model[0].url, value);
    }
});
document.querySelector(".right-menu > .rt-container").addEventListener("click", (e) => {barSwich(e, document.querySelector(".right-menu > .rt-container"))});
document.querySelector(".left-menu > .lf-container").addEventListener("click", (e) => {barSwich(e, document.querySelector(".left-menu > .lf-container"))});
function barSwich(e, element){
    var {target} = e;
    var clas = target.classList;
    if(clas[0] == "option-rt" || clas[0] == "option-lf"){
        let cont = target.dataset.for;
        let show = element.querySelector(".-option-show-");
        if(show){ show.classList.remove("-option-show-") }
        document.querySelector(cont).classList.add("-option-show-");
    }
}
document.querySelector("#graph-render-option").addEventListener("change", (e) => {
    if(!window.renderFrame) return;
    let p = document.querySelector("#graph-render-option");
    let qualiti = p.querySelector("#graph-render-qualiti").value;
    let plus = p.querySelector("#graph-render-qualiti-plus").value;
    let ratio = p.querySelector("#graph-render-ratio").value;
    window.renderFrame.renderOption.quality = qualiti;
        renderOption.quality = qualiti;
    window.renderFrame.renderOption.plus = plus;
        renderOption.plus = plus;               
    window.renderFrame.renderOption.ratio = ratio;
        renderOption.ratio = ratio;
    window.renderFrame.onWindowResize();
});
document.querySelector(".time-control").addEventListener("click", (e)=>{
    var tar = e.target;
    if (tar.classList[0] == "cs-btn") {
        if (tar.classList[1] == "play-mode") {
            if(window.renderFrame){
                if(renderFrame.helper){
                    let enabled = renderFrame.helper.enabled.animation;
                    if(enabled){
                        renderFrame.helper.enabled.animation = false;
                        tar.innerText = "Play"
                    } else{
                        renderFrame.helper.enabled.animation = true;
                        tar.innerText = "Pause"
                    }
                }
            }
        }
        if (tar.classList[1] == "play-sync") {
            if (_sync) {
                _sync = false;
                tar.classList.remove("active-option-");
            } else {
                _sync = true;
                tar.classList.add("active-option-");
            }
        }

        if (tar.classList[1] == "get-render-image") {
            if (window.renderFrame) {
                if (window.renderFrame.renderer) {
                    window.renderFrame.renderer.domElement.toBlob(data => {
                        downloadBlob(data, `MMD renderer - ${Date.now()}`);
                    });
                }
            }
        }
    }

    if (tar.parentElement.className == "time-sync") {
        let value = tar.innerText * 1;
        var {duration} = getTimeAnimation(selection.model[0].url);
        let time = duration * (value/100);
        setTimeForAnimate(selection.model[0].url, time);
        setTimeForCam(time);

    }
});
document.querySelector(".camera-control").addEventListener("click", (e)=>{
    var tar = e.target;
    if (tar.classList[0] == "cs-btn") {
        if (tar.classList[1] == "play-mode") {
            if(window.renderFrame){
                if(renderFrame.helper){
                    let enabled = renderFrame.helper.enabled.cameraAnimation;
                    if(enabled){
                        renderFrame.helper.enabled.cameraAnimation = false;
                        tar.innerText = "Play"
                    } else{
                        renderFrame.helper.enabled.cameraAnimation = true;
                        tar.innerText = "Pause"
                    }
                }
            }
        }
    }
});


document.querySelector(".top-bar-list").addEventListener("click", async (e) => {
    var {target} = e;
    if (target.classList[0] == "top-select") {
        if (target.classList[1] == "open-drop-menu") {
            let a = document.querySelector(".file-drop-menu");
            a.style.display == "block" ? a.style.display = "" : a.style.display = "block";
        }
        if (target.classList[1] == "open-mini-info") {
            let a = document.querySelector(".info-menu");
            a.style.display == "block" ? a.style.display = "" : a.style.display = "block";
        }
        
    }
});
document.querySelector(".file-drop-menu").addEventListener("click", async (e) => {
    var { target } = e;
    if (target.classList[0] == "item-box-menu") {
        if (target.classList[1] == "open-zip-mode") {
            file = await getHanderFile();
            if (file.type == "application/zip") {
                let allFile = await readZip(file, true);
                let key = file.name + Date.now();
                addFile[key] = allFile;
                for (let i = 0; i < allFile.length; i++) {
                    const e = allFile[i];
                    if (e.name.endsWith(".pmx")) {
                        modelFile.addObject({
                            name: e.name,
                            url: e.url,
                            position: key
                        });
                    }
                }

            }
        }
        if (target.classList[1] == "open-zip-mode-map") {
            file = await getHanderFile();
            if (file.type == "application/zip") {
                let allFile = await readZip(file, true);
                let key = file.name + Date.now();
                addFileMap[key] = allFile;
                for (let i = 0; i < allFile.length; i++) {
                    const e = allFile[i];
                    if (e.name.endsWith(".pmx")) {
                        mapFile.addObject({
                            name: e.name,
                            url: e.url,
                            position: key
                        });
                    }
                }

            }
        }
        if (target.classList[1] == "open-zip-mode-vmd") {
            file = await getHanderFile();
            if (file.type == "application/zip") {
                let allFile = await readZip(file, true);
                let key = file.name + Date.now();
                addFileVmd[key] = allFile;
                for (let i = 0; i < allFile.length; i++) {
                    const e = allFile[i];
                    if (e.name.endsWith(".vmd")) {
                        vmdFile.addObject({
                            name: e.name,
                            url: e.url,
                        });
                    }
                }

            }
        }
        if (target.classList[1] == "open-zip-mode-file-cam") {
            file = await getHanderFile();
            if (file.name.endsWith(".vmd")) {
                cameraFile.addObject({
                    name: file.name,
                    url: URL.createObjectURL(file),
                });
            }
        }
        if (target.classList[1] == "open-zip-mode-file-mot") {
            file = await getHanderFile();
            if (file.name.endsWith(".vmd")) {
                vmdFile.addObject({
                    name: file.name,
                    url: URL.createObjectURL(file)
                });
            }
        }
    }
});
document.querySelector(".start-record").addEventListener("click", (e) => {
    if (!record) return;
    if (!record.recording) {
        let type = document.querySelector("#record-type");
        let fps = document.querySelector("#record-fps");
        let max = document.querySelector("#max-record");
        let current = document.querySelector(".current-record");
        record.setType(type.value).setFps(fps.value * 1);
        record.onRunning(() => {
            current.innerText = timeToMin(secondsToTime(record.time));
            if (record.time >= max.valueAsNumber) {
                record.stop();
                e.target.innerText = "Start";
            }
        });
        let ex = type.value.indexOf("/mp4") !== -1 ? ".mp4" : ".webm";
        record.onStop((data) => {
            let u = URL.createObjectURL(data);
            let a = document.createElement("a");
            a.setAttribute("download", `mmd-rec-${Date.now()}${ex}`);
            a.setAttribute("target", "_blank");
            a.href = u;
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
        record.start();
        e.target.innerText = "Stop";
    } else {
        record.stop();
        e.target.innerText = "Start";
    }
});


document.addEventListener("click", (e) => {
    if (e.target.classList[0] !== "top-select") {
        document.querySelector(".file-drop-menu").style.display = "";
        document.querySelector(".info-menu").style.display = "";
    }
});

document.querySelectorAll(".top-selection").forEach(e => {
    e.addEventListener("wheel", (ev) => {
        ev.preventDefault();
        e.scrollBy(ev.deltaY, 0);
    }, {passive: false});
})
window.onload = resize;
window.addEventListener("resize", resize);



log("info", `Load page time: ${Date.now() - (window._start_time_)}ms`);