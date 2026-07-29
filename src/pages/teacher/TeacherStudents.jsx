import { useMemo } from 'react'
import { Users } from 'lucide-react'
import StudentListing from '../../components/student/StudentListing'
import { SquiggleUnderline } from '../../components/illustrations/Doodles'
import { useAuth } from '../../context/AuthContext'
import { useReviews } from '../../context/ReviewContext'

export default function TeacherStudents() {
  const { user } = useAuth()
  const { students } = useReviews()
  const teacher = user?.teacher
  const myStudents = useMemo(
    () => students.filter((s) => s.teacherId === teacher?.id),
    [students, teacher]
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-soft shrink-0">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-sky-900">My Students</h1>
          <SquiggleUnderline className="w-24 h-2.5 -mt-0.5 mb-0.5" color="#43CD82" />
          <p className="text-sky-800/60 text-sm">Search, filter and review students across all your classes.</p>
        </div>
      </div>
      <StudentListing students={myStudents} basePath="/teacher/students" />
    </div>
  )
}
