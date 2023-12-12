const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  uploadTrigger(target);
}

function uploadTrigger(target){

  let xhr = new XMLHttpRequest(); 
  let data = new FormData(form); 
  
  Array.from(data).forEach(datum => {
    let file = datum[1]; 
    if(file){
      let fileName = file.name; 
      let fileName2 = file.name; 
      // let extension = fileName.split('.').pop(); // If we nedd to restrict uploading specific file type
        if(fileName.length >= 12){ 
          let splitName = fileName.split('.');
          fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }
        let payload = new FormData();
        payload.append('file', datum[1]);
        uploadFile(fileName, fileName2, xhr, payload);
    }
  });

}


function uploadFile(name, name2, xhr, data){
  xhr.open("POST", "../includes/upload.php"); 
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{ 
    let fileLoaded = Math.floor((loaded / total) * 100);  
    let fileTotal = Math.floor(total / 1000); 
    let fileSize;

    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;

    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • <span style="color:green;">Uploaded</span></span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-times" style="color:red;font-size:16px;cursor:pointer;" onClick="deleteMe('${name2}'); this.parentElement.style.display = 'none';"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");

      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); 
    }
  });
  xhr.send(data); 

  // Get response in console
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.response);
        // console.log(xhr.responseText);
      }
    }
  };


}

function deleteMe(name){
  let xhr = new XMLHttpRequest(); 
  xhr.open("POST", "../includes/delete.php"); 
  let data = new FormData(); 
  data.append("name", name);
  xhr.send(data); 
}