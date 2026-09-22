import { useState, useEffect } from 'react';

interface Employee {
    id: number;
    name: string;
    address: string;
    isAddressVerified: boolean;
}

function App() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState<string>("");

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const fetchEmployees = () => {
        fetch('https://localhost:7144/api/Verification/all')
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => setEmployees(data))
            .catch(err => setError("Failed to connect: " + err.message));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newEmployee = {
            name: name,
            address: address,
            isAddressVerified: false
        };

        fetch('https://localhost:7144/api/Verification/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to add employee");
                setName("");
                setAddress("");
                fetchEmployees();
            })
            .catch(err => setError(err.message));
    };

    // --- NEW UPDATE FUNCTION ---
    const handleVerify = (employee: Employee) => {
        // Create an updated version of the employee with verified = true
        const updatedEmployee = { ...employee, isAddressVerified: true };

        fetch(`https://localhost:7144/api/Verification/${employee.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEmployee)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to verify employee");
                fetchEmployees(); // Refresh the table
            })
            .catch(err => setError(err.message));
    };

    // --- NEW DELETE FUNCTION ---
    const handleDelete = (id: number) => {
        fetch(`https://localhost:7144/api/Verification/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to delete employee");
                fetchEmployees(); // Refresh the table to remove the row
            })
            .catch(err => setError(err.message));
    };

    return (
        <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
            <h1>Verification Module</h1>

            {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

            <div style={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px", marginBottom: "20px", color: "white" }}>
                <h3 style={{ marginTop: 0 }}>Add New Employee</h3>
                <form onSubmit={handleAddSubmit} style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="text" placeholder="Name" value={name}
                        onChange={(e) => setName(e.target.value)} required
                        style={{ padding: "8px", flex: 1 }}
                    />
                    <input
                        type="text" placeholder="Address" value={address}
                        onChange={(e) => setAddress(e.target.value)} required
                        style={{ padding: "8px", flex: 1 }}
                    />
                    <button type="submit" style={{ padding: "8px 16px", cursor: "pointer", background: "#646cff", color: "white", border: "none", borderRadius: "4px" }}>
                        Add Record
                    </button>
                </form>
            </div>

            <p>Employee Data from C# API:</p>
            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#1e1e1e", color: "white" }}>
                        <th style={{ padding: "12px", border: "1px solid #ddd" }}>ID</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Address</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Verified</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td style={{ padding: "12px", border: "1px solid #ddd" }}>{emp.id}</td>
                            <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold" }}>{emp.name}</td>
                            <td style={{ padding: "12px", border: "1px solid #ddd" }}>{emp.address}</td>
                            <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                                {emp.isAddressVerified ? "✅ Yes" : "❌ Pending"}
                            </td>
                            <td style={{ padding: "12px", border: "1px solid #ddd", display: "flex", gap: "8px" }}>
                                {/* Only show the verify button if they aren't verified yet */}
                                {!emp.isAddressVerified && (
                                    <button onClick={() => handleVerify(emp)} style={{ padding: "4px 8px", cursor: "pointer", background: "#4caf50", color: "white", border: "none", borderRadius: "4px" }}>
                                        Verify
                                    </button>
                                )}
                                <button onClick={() => handleDelete(emp.id)} style={{ padding: "4px 8px", cursor: "pointer", background: "#f44336", color: "white", border: "none", borderRadius: "4px" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;