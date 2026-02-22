interface TagProps {
  label: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}

function Tag({ label, color = 'blue' }: TagProps) {
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
  }

  return (
    <span className={`${colors[color]} text-white text-sm px-2 py-1 rounded`}>
      {label}
    </span>
  )
}

export default Tag
