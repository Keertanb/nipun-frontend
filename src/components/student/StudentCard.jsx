import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'

export default function StudentCard({ student, basePath = '/teacher/students' }) {
  const navigate = useNavigate()
  const isCompleted = student.status === 'Completed'
  return (
    <motion.button
      onClick={() => navigate(`${basePath}/${student.id}`)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full text-left bg-white rounded-2xl border shadow-card pl-5 pr-4 py-4 flex items-center gap-3 transition-colors overflow-hidden ${
        isCompleted ? 'border-good/20 hover:border-good/40' : 'border-avg/20 hover:border-avg/40'
      }`}
    >
      <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${isCompleted ? 'bg-good' : 'bg-avg'}`} />
      <Avatar seed={student.avatarSeed} name={student.name} size={48} className="ring-2 ring-sky-50" />
      <div className="flex-1 min-w-0">
        <p className="font-heading font-bold text-sky-900 truncate">{student.name}</p>
        <p className="text-xs text-sky-700/60">
          Roll #{student.rollNo} &middot; {student.gender} &middot; Age {student.age}
        </p>
      </div>
      <Badge type={student.status}>{student.status}</Badge>
    </motion.button>
  )
}
