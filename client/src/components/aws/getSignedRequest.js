import { uploadFile } from "./uploadFile";

export function getSignedRequest(file, resetFile) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://onlinepestestimates.herokuapp.com/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url, resetFile);
            }
            else{
                alert('Could not get signed URL.');
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                
            }
        }
    }
    xhr.send();
}