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

// export const convertImagesToBase64 = (files) => {
//     let response = []
//     for(let i = 0; i < files.length; i++) {
//         const file = files[i];
//         const reader = new FileReader();
//         reader.addEventListener('load', ()=>{
//             setTimeout(function() {
//                 response.push(reader.result)
//             }, 1000);
//         })
//         reader.readAsDataURL(file);
//     }
//     return response; 
// }

export const convertImagesToBase64 = (files) => {
    return new Promise((resolve, reject) => {
        let response = [];
        let count = 0;

        for(let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                response.push(reader.result);
                count++;

                if (count === files.length) {
                    resolve(response);
                }
            });

            reader.addEventListener('error', (error) => {
                reject(error);
            });

            reader.readAsDataURL(file);
        }
    });
}