import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, CheckCircle2, Clock, BookOpen, School, MapPin } from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
import Avatar from '../../components/ui/Avatar'
import StudentListing from '../../components/student/StudentListing'
import { useAuth } from '../../context/AuthContext'
import { useReviews } from '../../context/ReviewContext'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const { students } = useReviews()
  const teacher = user?.teacher

  const myStudents = useMemo(
    () => students.filter((s) => s.teacherId === teacher?.id),
    [students, teacher]
  )

  const stats = useMemo(() => {
    const completed = myStudents.filter((s) => s.status === 'Completed').length
    return {
      total: myStudents.length,
      completed,
      pending: myStudents.length - completed,
      classes: teacher?.classesAssigned?.length || 0,
    }
  }, [myStudents, teacher])

  if (!teacher) return null

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-leaf-600 rounded-xl3 shadow-soft p-6 sm:p-8 text-white"
      >
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar seed={teacher.avatarSeed} name={teacher.name} size={72} className="ring-4 ring-white/40" />
          <div className="flex-1">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl">{teacher.name}</h1>
            <p className="text-sky-50/80 text-sm mt-0.5">Teacher ID: {teacher.teacherId} &middot; School Code: {teacher.schoolCode}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-sky-50/90">
              <span className="flex items-center gap-1.5"><School className="w-4 h-4" /> {teacher.schoolName}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {teacher.district} &middot; {teacher.block} &middot; {teacher.cluster}</span>
            </div>
            <p className="text-sky-50/70 text-xs mt-1">Village: {teacher.village}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Students" value={stats.total} theme="sky" delay={0} />
        <StatCard icon={CheckCircle2} label="Completed Reviews" value={stats.completed} theme="green" delay={0.05} />
        <StatCard icon={Clock} label="Pending Reviews" value={stats.pending} theme="sunny" delay={0.1} />
        <StatCard icon={BookOpen} label="Classes Assigned" value={stats.classes} theme="sky" delay={0.15} />
      </div>

      <div>
        <h2 className="font-heading font-bold text-lg text-sky-900 mb-3">My Students</h2>
        <StudentListing students={myStudents} basePath="/teacher/students" />
      </div>
    </div>
  )
}
