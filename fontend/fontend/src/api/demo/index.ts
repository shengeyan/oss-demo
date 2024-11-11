import axiosInstance from '../axios'

// 文件上传
export const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return axiosInstance.post('/uploadFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

// 获取文件列表
export const getFiles = async () => {
    return axiosInstance.get('/files')
}

// 删除文件
export const deleteFile = async (fileId: string) => {
    return axiosInstance.delete(`/files/${fileId}`)
}
// 清空文件
export const deleteFileAll = async () => {
    return axiosInstance.get('/files/delete-all')
}
// 下载文件
export const downloadFileAll = async (fileId: string) => {
    try {
        const response = await axiosInstance.get(`/download/${fileId}`)

        const { name, content, type } = response.data
        const url = window.URL.createObjectURL(new Blob([content], { type }))

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error('Error downloading file:', error)
    }
}

// 预览文件
export const previewFile = async (fileId: string) => {
    try {
        const response = await axiosInstance.get(`/files/${fileId}/preview`, {
            responseType: 'blob',
        })
        return response
    } catch (error) {
        console.error('Error fetching preview file:', error)
        throw error
    }
}
