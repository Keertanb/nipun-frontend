import { createContext, useContext, useState } from 'react'
import { students as seedStudents } from '../data/mockData'

const ReviewContext = createContext(null)

export function ReviewProvider({ children }) {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('ng_students')
    return saved ? JSON.parse(saved) : seedStudents
  })

  function submitReview(studentId, { review, remarks }) {
    setStudents((prev) => {
      const next = prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              status: 'Completed',
              review,
              remarks,
              reviewDate: new Date().toISOString().slice(0, 10),
            }
          : s
      )
      localStorage.setItem('ng_students', JSON.stringify(next))
      return next
    })
  }

  return (
    <ReviewContext.Provider value={{ students, submitReview }}>
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  return useContext(ReviewContext)
}
