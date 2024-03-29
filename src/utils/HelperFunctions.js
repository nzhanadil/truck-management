import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageDb } from "../services/firebase";
import { v4 } from "uuid";

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

export const uploadImages = async (path, files) => {

    const promises = [];
    for (let i = 0; i < files.length; i++) {
        const image = files[i];
        const imageRef = ref(storageDb, `${path}/${v4()}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        promises.push(
            new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Progress updates can be handled here if needed
                    },
                    (error) => {
                        console.error(error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                resolve(downloadURL);
                            })
                            .catch((error) => {
                                console.error(error);
                                reject(error);
                            });
                    }
                );
            })
        );
    }

    try {
        const downloadURLs = await Promise.all(promises);
        return downloadURLs;
    } catch (error) {
        console.error('Failed to upload images:', error);
        throw error;
    }
};




