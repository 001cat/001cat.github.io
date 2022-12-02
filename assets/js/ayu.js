// var shazam_server = "http://localhost"
// var shazam_server = "http://35.193.50.230"
var shazam_server = "http://35.223.132.196"

// document.getElementById("shazam_test_btn").onclick=function(){
//     var xml=new XMLHttpRequest();
//     xml.open("GET",shazam_server+"/songs");
//     xml.setRequestHeader('content-type','application/json')
//     xml.onreadystatechange=function(){
//         console.log(xml.responseText)
//         if(xml.readyState==4 && xml.status==200){  //判断状态到4了并且返回状态码是200时才做操作
//             document.getElementById("div_text").innerHTML = xml.responseText
//         }
//     };
//     xml.send()
// }

document.getElementById("shazam_add_btn").onclick=function(){
    var xml=new XMLHttpRequest();
    // var data=new FormData; //创建formdata对象
    file = document.getElementById("shazam_add_input").files[0]
    button = document.getElementById("shazam_add_btn")

    xml.open("POST",shazam_server+"/api/addNewSong");
    xml.onreadystatechange=function(){
        if(xml.readyState==4 && xml.status==200){  //判断状态到4了并且返回状态码是200时才做操作
            button.innerText = 'Succeeded!'
            // button.disabled = false
            // console.log(xml.responseText.substring(0,100))
        }else{
            button.innerText = 'Failed!'
            // console.log(xml.responseText.substring(0,100))
        }
    };
    // 读取文件:
    var reader = new FileReader();
    reader.onload = function(e) {
        var filedata = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'  
        const tmp = filedata.split(","); 
        var base64 = tmp[1]
        // console.log(filedata.substring(0,40))
        // console.log(base64.substring(0,40))
        xml.send(JSON.stringify({'filename':file.name,'mp3':base64}))
        button.innerText = 'Uploading ...'
        button.disabled = true
    };
    // 以DataURL的形式读取文件:
    reader.readAsDataURL(file);
}

document.getElementById("shazam_idty_btn").onclick=function(){
    var xml=new XMLHttpRequest();

    file = document.getElementById("shazam_idty_input").files[0]
    button = document.getElementById("shazam_idty_btn")

    xml.open("POST",shazam_server+"/api/recogFile");
    xml.onreadystatechange=function(){
        if(xml.readyState==4 && xml.status==200){  //判断状态到4了并且返回状态码是200时才做操作
            result = JSON.parse(xml.responseText)
            console.log(result)
            if (result['found'] == 'True'){
                button.innerText = 'Succeeded!'
                document.getElementById("div_text").innerText = 'Found! This song is: '+result['song']
            }else if (result['found'] == 'False'){
                button.innerText = 'Not found'
            }else{
                button.innerText = 'Failed'
            }
        }else{
            button.innerText = 'Failed!'
        }
    };
    // 读取文件:
    var reader = new FileReader();
    reader.onload = function(e) {
        var filedata = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'  
        const tmp = filedata.split(","); 
        var base64 = tmp[1]
        xml.send(JSON.stringify({'filename':file.name,'mp3':base64}))
        button.innerText = 'Uploading ...'
        button.disabled = true
    };
    // 以DataURL的形式读取文件:
    reader.readAsDataURL(file);
}






async function getJSON() {
    const Url='https://jsonplaceholder.typicode.com/posts'
    // const Data={
    //     name: "Said",
    //     id :23
    // };
    // // optional parameters
    // const othepram={
    //     headers:{
    //         "content-type": "application/json; charset=UTF-8"
    //     },
    //     body: Data,
    //     method: "POST"
    // };
    let response = await fetch(Url);

    if (response.status >= 200 && response.status < 300) {
        let a = await response.json()
        document.getElementById("display").value = a[0]["title"];
    } else {
        console.log(response.statusText);
        throw new Error(response.statusText);
    }
    // fetch(Url,othepram)
    // .then(data=>{return data.ison()})
    // .then(res=>{console.log(res) })
    // .catch(error=>console.log (error))
    // document.getElementById("display").value = 'test'
}
