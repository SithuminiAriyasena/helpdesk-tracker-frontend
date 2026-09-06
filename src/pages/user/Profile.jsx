import Layout from '../../components/Layout.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useState } from 'react'

function initials(name = '') {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function Profile() {
  const { user, setSession } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [department, setDepartment] = useState('IT Operations')
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')
  const [avatarFile, setAvatarFile] = useState(null)

  const onChooseFile = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    setAvatarFile(f)
    const url = URL.createObjectURL(f)
    setAvatarPreview(url)
  }

  const readFileAsDataUrl = (file) => new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = () => res(reader.result)
    reader.onerror = rej
    reader.readAsDataURL(file)
  })

  const saveProfile = async () => {
    let avatarData = user?.avatar || ''
    if (avatarFile) {
      try {
        avatarData = await readFileAsDataUrl(avatarFile)
      } catch (err) {
        console.error('Failed to read avatar file', err)
      }
    }

    // Try to persist to backend
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE || 'https://helpdesk-tracker-backend.onrender.com'
      const res = await fetch(`${apiBase}/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('helpdesk_token')}` },
        body: JSON.stringify({ name, department, avatar: avatarData }),
      })
      if (res.ok) {
        const data = await res.json()
        setSession(data.user)
      } else {
        console.error('Failed to save profile', await res.text())
        // fallback to local update
        setSession({ ...user, name, department, avatar: avatarData })
      }
    } catch (err) {
      console.error('Network error saving profile', err)
      setSession({ ...user, name, department, avatar: avatarData })
    }

    setEditing(false)
  }

  return (
    <Layout title="Profile" subtitle="Your account details">
      <div className="mx-auto max-w-xl rounded-xl2 bg-surface p-6 shadow-card border border-line">
        <div className="flex items-center gap-4">
          <div className="relative">
            {avatarPreview ? (
              <img src={avatarPreview} alt="avatar" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 font-display text-xl font-bold text-brand-500">
                {initials(user.name)}
              </div>
            )}

            <label className="absolute -bottom-1 -right-1 bg-white border border-line rounded-full p-1 cursor-pointer text-xs" title="Change photo">
              <input type="file" accept="image/*" className="hidden" onChange={onChooseFile} />
              Edit
            </label>
          </div>

          <div className="flex-1">
            {!editing ? (
              <>
                <p className="font-display text-lg font-bold text-ink">{user.name}</p>
                <p className="text-sm capitalize text-ink-light">{user.role}</p>
              </>
            ) : (
              <div>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-line bg-transparent px-3 py-2 text-ink" />
                <p className="text-sm text-ink-light mt-1">{user.role}</p>
              </div>
            )}
          </div>

          <div>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="rounded-md px-3 py-2 bg-brand-500 text-white">Edit</button>
            ) : (
              <div className="flex gap-2">
                <button onClick={saveProfile} className="rounded-md px-3 py-2 bg-green-600 text-white">Save</button>
                <button onClick={() => { setEditing(false); setName(user.name); setAvatarPreview(user?.avatar || ''); }} className="rounded-md px-3 py-2 bg-slate-200 text-ink">Cancel</button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-light">Email</p>
            <p className="mt-1 text-sm font-medium text-ink">{user.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-light">Role</p>
            <p className="mt-1 text-sm font-medium capitalize text-ink">{user.role}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-light">Employee ID</p>
            <p className="mt-1 font-mono text-sm font-medium text-ink">EMP-{String(user.id).padStart(4, '0')}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-light">Department</p>
            {!editing ? (
              <p className="mt-1 text-sm font-medium text-ink">{department}</p>
            ) : (
              <input value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-md border border-line bg-transparent px-3 py-2 text-ink" />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
