import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import History from '../components/History'
import HistoryTop from '../components/HistoryTop'
import MemberModal from '../components/MemberModal'
import styled from 'styled-components'
import { TiDelete } from 'react-icons/ti'
import NavbarNone from '../components/NavbarNone'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import imgHolder from '../assets/add_image.png'
import '../css/History.css'
import '../css/Navbar.css'

const API = process.env.REACT_APP_API

const HistoryEdit = ({ user }) => {
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri)
        },
        'file'
      )
    })

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: user.photos[0].img,
  })

  let inputRef
  const saveImage = async (e) => {
    e.preventDefault()

    if (e.target.files[0]) {
      URL.revokeObjectURL(image.preview_URL)
      const newImage = await resizeFile(e.target.files[0])
      const new_URL = URL.createObjectURL(newImage)
      setImage(() => ({
        image_file: newImage,
        preview_URL: new_URL,
      }))
    }
  }

  const deleteImage = () => {
    URL.revokeObjectURL(image.preview_URL)
    setImage({
      image_file: '',
      preview_URL: imgHolder,
    })
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image.preview_URL)
    }
  }, [])

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData()
      formData.append('file', image.image_file)
      await axios.post(API + '/image/upload')
    }
  }

  return (
    <div className="container">
      <NavbarNone />
      <HistoryTop />
      <div>
        <History user={user} trace="Edit" idx={0} />
        <section id="pic">
          <BtnDelete className="del" onClick={deleteImage}>
            <TiDelete />
          </BtnDelete>
          <img
            style={{
              width: '300px',
              height: '350px',
              objectFit: 'contain',
            }}
            src={image.preview_URL}
            onClick={() => inputRef.click()}
          ></img>
        </section>
      </div>

      <section id="btn">
        <BtnPurple onClick={openModal}>초대</BtnPurple>
        <BtnGray onClick={() => inputRef.click()}>사진 변경</BtnGray>
        <Link to="/history/view">
          <BtnPurple onClick={sendImageToServer}>완료</BtnPurple>
        </Link>
      </section>
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        onChange={saveImage}
        onClick={(e) => (e.target.value = null)}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: 'none' }}
      />
      <MemberModal
        open={modalOpen}
        close={closeModal}
        header="사용자 초대하기"
      ></MemberModal>
    </div>
  )
}
export default HistoryEdit

const BtnPurple = styled.button`
  border: none;
  outline: none;
  width: 90px;
  height: 41px;
  color: white;
  background-color: #8861c2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
`

const BtnGray = styled.button`
  border: none;
  outline: none;
  width: 90px;
  height: 41px;
  color: black;
  background-color: #e7e7e7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
`

const BtnDelete = styled.button`
  width: 380px;
  height: 15px;
  font-size: 25px;
  justify-self: right !important;
  align-items: right !important;
  text-align: right !important;
  z-index: 10;
  border: none;
  outline: none;
  color: gray;
  background-color: transparent;
`
