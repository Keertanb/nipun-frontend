import { School, MapPin, Hash, Users2, Mail, Phone } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import { useAuth } from '../../context/AuthContext'

export default function TeacherProfile() {
  const { user } = useAuth()
  const teacher = user?.teacher
  if (!teacher) return null

  const rows = [
    { icon: Hash, label: 'Teacher ID', value: teacher.teacherId },
    { icon: School, label: 'School Name', value: teacher.schoolName },
    { icon: Hash, label: 'School Code', value: teacher.schoolCode },
    { icon: MapPin, label: 'District', value: teacher.district },
    { icon: MapPin, label: 'Block', value: teacher.block },
    { icon: MapPin, label: 'Cluster', value: teacher.cluster },
    { icon: MapPin, label: 'Village', value: teacher.village },
    { icon: Users2, label: 'Classes Assigned', value: teacher.classesAssigned.join(', ') },
    { icon: Mail, label: 'Email', value: `${teacher.name.toLowerCase().replace(' ', '.')}@nipungujarat.gov.in` },
    { icon: Phone, label: 'Mobile', value: '+91 98765 43210' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-leaf-600 rounded-xl3 shadow-soft p-8 text-white text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <Avatar seed={teacher.avatarSeed} name={teacher.name} size={96} className="mx-auto ring-4 ring-white/40 text-2xl" />
        <h1 className="font-heading font-extrabold text-2xl mt-4">{teacher.name}</h1>
        <p className="text-sky-50/80 text-sm">{teacher.gender} &middot; Government Teacher</p>
      </div>

      <div className="bg-white rounded-xl3 shadow-card border border-sky-100 divide-y divide-sky-50">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-4 px-6 py-4">
            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
              <r.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-sky-700/50">{r.label}</p>
              <p className="font-semibold text-sky-900 text-sm">{r.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
