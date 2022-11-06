export function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log(url)
        }
        else{
            console.log(xhr.responseText);
            console.log(xhr)
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
}