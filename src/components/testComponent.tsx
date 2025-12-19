import { useState } from 'react'

export function TestComponent() {
    const [count, setCount] = useState(0)

    return (<>
        <div>This is a test component.</div>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
            </button>
        </div></>);
    }