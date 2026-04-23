import './App.css'
import RadioGroupItem from './components/RadioGroupItem'

type SnapshotRow = {
  initials: string
  name: string
  email: string
  address: string
  requestedDate: string
  status: 'completed' | 'awaiting' | 'declined' | 'churned' | 'customer'
  isNew?: boolean
  trustLevel?: 'low'
}

const rows: SnapshotRow[] = [
  {
    initials: 'OR',
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    address: '234 Spruce Avenue, Flat 6B',
    requestedDate: '22 Jan 2025',
    status: 'completed',
    isNew: true,
    trustLevel: 'low',
  },
  {
    initials: 'LS',
    name: 'Liam Stone',
    email: 'liam@untitledui.com',
    address: '145 Elm Street, Unit 2A',
    requestedDate: '20 Jan 2025',
    status: 'awaiting',
  },
  {
    initials: 'SL',
    name: 'Sophia Lee',
    email: 'sophia@untitledui.com',
    address: '78 Maple Drive, Suite 5C',
    requestedDate: '24 Jan 2025',
    status: 'declined',
  },
  {
    initials: 'NW',
    name: 'Noah White',
    email: 'noah@untitledui.com',
    address: '56 Oak Lane, Room 4D',
    requestedDate: '26 Jan 2025',
    status: 'churned',
  },
  {
    initials: 'EB',
    name: 'Emma Brown',
    email: 'emma@untitledui.com',
    address: '99 Pine Road, Apartment 3E',
    requestedDate: '18 Jan 2025',
    status: 'customer',
  },
  {
    initials: 'JS',
    name: 'James Smith',
    email: 'james@untitledui.com',
    address: '312 Birch Boulevard, Floor 1F',
    requestedDate: '28 Jan 2025',
    status: 'customer',
  },
  {
    initials: 'AJ',
    name: 'Ava Johnson',
    email: 'ava@untitledui.com',
    address: '221 Cedar Street, Block 7G',
    requestedDate: '28 Jan 2025',
    status: 'customer',
  },
]

function statusBadge(status: SnapshotRow['status']) {
  if (status === 'completed') {
    return <span className="badge badge-purple">Completed</span>
  }
  if (status === 'awaiting') {
    return <span className="badge badge-warning">Awaiting response</span>
  }
  if (status === 'declined') {
    return <span className="badge badge-error">Declined</span>
  }
  if (status === 'churned') {
    return <span className="badge badge-gray">Churned</span>
  }
  return <span className="badge badge-success">Customer</span>
}

function App() {
  return (
    <div className="page">
      <aside className="sidebar" />
      <section className="app-shell">
        <header className="topbar">
          <div className="brand">RENTTEN</div>
          <div className="topbar-actions">
            <button className="icon-btn" aria-label="Notifications">
              <span>🔔</span>
            </button>
            <button className="avatar-btn" aria-label="Profile">
              <span>AK</span>
            </button>
          </div>
        </header>

        <main className="content">
          <section className="hero">
            <div>
              <h1>Welcome back, Anniek</h1>
              <p>Track, manage and forecast your customers and orders.</p>
            </div>
            <button className="ghost-icon-btn">+ available credits</button>
          </section>

          <section className="radio-item-preview">
            <RadioGroupItem label="Broker/ Agent" />
          </section>

          <section className="snapshot-request">
            <div>
              <h2>Request Trust Snapshot</h2>
              <p>
                Send a request to a tenant to share their verified rental and credit history.
                Credits are only deducted when the tenant consents.
              </p>
            </div>
            <button className="primary-btn">Create Snapshot Request</button>
          </section>

          <section className="metrics">
            <article className="metric-card">
              <div className="metric-icon purple">✓</div>
              <div>
                <p className="metric-value">22</p>
                <p className="metric-label">Completed snapshots requests</p>
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-icon warning">⌛</div>
              <div>
                <p className="metric-value">526</p>
                <p className="metric-label">Pending snapshots requests</p>
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-icon error">✕</div>
              <div>
                <p className="metric-value">05</p>
                <p className="metric-label">Declined snapshots requests</p>
              </div>
            </article>
          </section>

          <section className="table-card">
            <div className="table-toolbar">
              <h3>Your snapshots</h3>
              <div className="toolbar-actions">
                <div className="search">🔍 Search</div>
                <div className="filter-group">
                  <button>Completed</button>
                  <button>Pending</button>
                  <button>Declined</button>
                </div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Property address</th>
                  <th>Requested date</th>
                  <th>Status</th>
                  <th>Trust level</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.email}>
                    <td>
                      <div className="tenant-cell">
                        <div className="initials">{row.initials}</div>
                        <div>
                          <p className="tenant-name">{row.name}</p>
                          <p className="tenant-email">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{row.address}</td>
                    <td>{row.requestedDate}</td>
                    <td>
                      <div className="status-wrap">
                        {statusBadge(row.status)}
                        {row.isNew ? <span className="badge badge-blue">New</span> : null}
                      </div>
                    </td>
                    <td>
                      {row.trustLevel === 'low' ? (
                        <span className="badge badge-trust">● Low trust</span>
                      ) : (
                        <span className="empty-value" />
                      )}
                    </td>
                    <td>
                      <div className="row-actions">
                        {row.trustLevel === 'low' ? <button>👁</button> : null}
                        <button>🗑</button>
                        <button>✎</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <footer className="table-footer">
              <span>Page 1 of 10</span>
              <div>
                <button className="footer-btn">Previous</button>
                <button className="footer-btn">Next</button>
              </div>
            </footer>
          </section>
        </main>
      </section>
    </div>
  )
}

export default App
