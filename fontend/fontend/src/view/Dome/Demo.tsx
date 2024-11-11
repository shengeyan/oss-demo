import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import {
    uploadFile,
    getFiles,
    deleteFile,
    deleteFileAll,
    downloadFileAll,
    previewFile,
} from '../../api/demo/index'

interface File {
    id: string
    name: string
    size: string
    type: string
    modified: string
}

const Dome: React.FC = () => {
    const [files, setFiles] = useState<File[]>([])
    const [previewContent, setPreviewContent] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await getFiles()
                setFiles(data.data)
            } catch (error) {
                console.error('Error fetching files:', error)
            }
        }

        fetch()
    }, [])

    const onUpload = async () => {
        const file = fileInputRef.current?.files?.[0]
        if (!file) {
            console.error('No file selected')
            return
        }

        try {
            const res = await uploadFile(file)
            if (res?.status === 200) {
                setFiles(res.data.data)
            }
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }
    const onDeteleAll = async () => {
        try {
            const res = await deleteFileAll()
            if (res?.status == 200) {
                setFiles(res.data.data)
            }
        } catch (error) {
            console.error('Error deleting all files:', error)
        }
    }

    const onLook = async (fileId: string) => {
        try {
            const response = await previewFile(fileId)

            const content = await response.data.text()
            setPreviewContent(content)
            setShowModal(true)
        } catch (error) {
            console.error('Error fetching preview:', error)
        }
    }

    const onDownload = async (fileId: string) => {
        const res = await downloadFileAll(fileId)
        console.log(res)
    }

    const onDelete = async (fileId: string) => {
        try {
            const res = await deleteFile(fileId)
            if (res?.status == 200) {
                setFiles(res.data.data)
            }
        } catch (error) {
            console.error('Error deleting file:', error)
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const closeModal = () => {
        setShowModal(false)
        setPreviewContent(null)
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.buttonArea}>
                    <button onClick={handleButtonClick}>上传文件</button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={onUpload}
                    />
                    <button onClick={onDeteleAll}>清空存储</button>
                </div>
                <div className={styles.tableArea}>
                    <table>
                        <thead>
                            <tr>
                                <th>文件名</th>
                                <th>大小</th>
                                <th>存储类型</th>
                                <th>修改时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr key={index}>
                                    <td>{file.name}</td>
                                    <td>{file.size}</td>
                                    <td>{file.type}</td>
                                    <td>{file.modified}</td>
                                    <td>
                                        <button
                                            className="preview"
                                            onClick={() => onLook(file.id)}
                                        >
                                            预览
                                        </button>
                                        <button
                                            className="download"
                                            onClick={() => onDownload(file.id)}
                                        >
                                            下载
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(file.id)}
                                        >
                                            删除
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && previewContent && (
                <div onClick={closeModal} className={styles.popupArea}>
                    {previewContent}
                    {/* <button onClick={closeModal}>关闭</button> */}
                </div>
            )}
        </div>
    )
}

export default Dome
