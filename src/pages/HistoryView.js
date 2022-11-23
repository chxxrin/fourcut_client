import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import History from '../components/History'
import HistoryTop from '../components/HistoryTop'
import MemberModal from '../components/MemberModal'
import styled from 'styled-components'
import NavbarNone from '../components/NavbarNone'
import axios from 'axios'
import '../css/History.css'
import '../css/Navbar.css'
import { useLocation } from 'react-router-dom'

const HistoryView = ({ user }) => {
  const [histories, setHistories] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const location = useLocation()
  const hashed_history_id = location.pathname.split('/')[3]

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setError(null)
        setHistories(null)
        setLoading(true)
        const response = await axios
          .get(
            `history/hashed/${hashed_history_id}`,
            {
              headers: { 'Access-Control-Allow-Origin': '*' },
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data) // 데이터 잘 가공해주셈!!
            setHistories(res.data)
          })
      } catch (e) {
        setError(e)
        console.log(e)
      }
      setLoading(false)
    }
    fetchHistories()
  }, [])

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  if (loading) return <div>로딩중</div>
  if (error) return <div>에러</div>
  if (!histories) return <div>no histories</div>

  return (
    <div className="container">
      <NavbarNone />
      <HistoryTop />
      <History historyObj={histories} trace="View" idx={0} />
      <section id="btn">
        <BtnPurple id="invite" onClick={openModal}>
          초대
        </BtnPurple>
        <Link to="/history/edit">
          <BtnPurple id="edit">수정</BtnPurple>
        </Link>
      </section>
      <MemberModal
        open={modalOpen}
        close={closeModal}
        header="사용자 초대하기"
      ></MemberModal>
    </div>
  )
}

export default HistoryView

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
