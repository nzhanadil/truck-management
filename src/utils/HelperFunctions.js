export const getCurrentDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = mm + '-' + dd + '-' + yyyy;

    return formattedDate;
}

export const convertImagesToBase64 = (files) => {
    let response = []
    for(let i = 0; i< files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.addEventListener('load', ()=>{
            response.push(reader.result)
        })
        reader.readAsDataURL(file);
    }
    return response; 
}