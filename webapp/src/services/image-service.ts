import axios from "axios";

    export const upload = (file: string, onUploadProgress: any) => {
        let formData = new FormData();
        formData.append("profile-picture", file);

        return axios.post("http://localhost:8080/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    export const getImage = (imagePath: string) => {
        return axios.get(`http://localhost:8080/api/images/${imagePath}`).then((response) => {
            return response.data.data
        }).catch((error) => {
            console.error(error)
        })
    }

