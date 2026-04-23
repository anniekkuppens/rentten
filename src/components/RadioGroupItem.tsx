type RadioGroupItemProps = {
  label: string
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 7V5.75C8 4.78 8.78 4 9.75 4h4.5C15.22 4 16 4.78 16 5.75V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3.5"
        y="7"
        width="17"
        height="12.5"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  )
}

export default function RadioGroupItem({ label }: RadioGroupItemProps) {
  return (
    <button type="button" className="radio-group-item" aria-label={label}>
      <div className="radio-group-item-content">
        <div className="radio-group-item-avatar">
          <div className="radio-group-item-icon">
            <BriefcaseIcon />
          </div>
        </div>
        <p>{label}</p>
      </div>
    </button>
  )
}
