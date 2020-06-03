/**
 * http://jobtc.tistory.com/
 * 자바 스크립트를 통한 파일선택, 파일 드래그를 하면 파일 미리보기 기능 및
 * 서버로 파일 전송
 * date : 2020.06
 * author : jobtc.
 *  
 */  


(upload = function(){
	$id = function(id){ return document.getElementById(id) }
	
	var sel_files = [];
	var btnChooseID; //파일 선택 버튼
	var btnSendID; // 전송 버튼
	var appendZone; // 이미지가 표시될 영역
	var sendURL;
	var img_style = 'width:200px;height:150px;margin:4px';
	var chk_style = 'position:absolute; right:7px;bottom:7px;width:20px;height:20px;opacity:.7';
	var div_style = 'display:inline-block; position:relative';
	upload.start = function(chooseID, sendID, apZone, url){
		btnChooseID = $id(chooseID);
		btnSendID = $id(sendID);
		appendZone = $id(apZone);
		sendURL = url;
	
		// file tag로 파일을 선택한 경우
		btnChooseID.onchange = function(e){
			var files = e.target.files;
			var fileArr = Array.prototype.slice.call(files);
			for(f of fileArr){
				upload.imageLoader(f);
			}
		}

		// drap and drop을 사용한 경우
		appendZone.addEventListener('dragenter', function(e) {
			e.preventDefault();
			e.stopPropagation();
		}, false)
		appendZone.addEventListener('dragover', function(e) {
			e.preventDefault();
			e.stopPropagation();
		}, false)
		appendZone.addEventListener('drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
			var dt = e.dataTransfer;
			var files = dt.files;
			for(f of files) upload.imageLoader(f);
		}, false)
		
		
		// 이미지 로드
		upload.imageLoader = function(file){
			sel_files.push(f);
			
			var reader = new FileReader();
			reader.readAsDataURL(f);
			reader.onload = function(ee){
				let img = document.createElement('img');
				img.setAttribute('style', img_style);
				img.src = ee.target.result;
				appendZone.append(img_div(img));
			}
		}
		
		// 파일 전송
		btnSendID.onclick = function(e){
			var data = new FormData();
			var uploadChk= document.getElementsByClassName('upload_chk');
			
			for(i=0 ; i<sel_files.length ; i++){
				if(uploadChk[i].checked){
					var name = 'image_';
					data.append(name, sel_files[i]);
				}
			}
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", sendURL);
			xhr.send(data);
			xhr.onreadystatechange = function(){
				if(this.status==200 && this.readyState == 4){
					console.log("OK.");
				}
			}
			
		}
		
		// 이미지 개당 div 생성
		img_div = function(img){
			var div = document.createElement('div');
			div.setAttribute('style', div_style);
			var btn = document.createElement('input');
			btn.setAttribute('type', 'checkbox');
			btn.setAttribute('class', 'upload_chk');
			btn.setAttribute('checked', 'checked');
			btn.setAttribute('style', chk_style);
			div.appendChild(img);
			div.appendChild(btn);
			return div;
		}
	}		

})()

