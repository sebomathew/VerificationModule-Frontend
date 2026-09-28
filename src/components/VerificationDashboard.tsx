import React, { useState, useEffect } from 'react';

// 1. Define the exact shape of the data coming from your C# API
interface VerificationRecord {
  id: number;
  employeeId: string;
  fullName: string;
  streetAddress: string;
  cityState: string;
  pinCode: string;
  verificationStatus: string;
}

const VerificationDashboard: React.FC = () => {
  // 2. Set up React State to hold the data, loading status, and any errors
  const [records, setRecords] = useState<VerificationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. useEffect acts like Page_Load in Web Forms, running when the component mounts
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // We will point this to the exact C# port you opened last night
        const response = await fetch('https://localhost:7183/api/AddressVerification');
        
        if (!response.ok) {
          throw new Error('Failed to connect to the backend server.');
        }
        
        // 4. Convert the incoming JSON into a JavaScript array
        const data = await response.json();
        setRecords(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []); // The empty array ensures this only runs once when the page loads

  // 5. Handle the UI states before the data arrives
  if (loading) return <div>Loading enterprise dashboard...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  // 6. Render the JSON array directly into an HTML table
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Background Verification Dashboard</h2>
      
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
          <tr>
            <th>Employee ID</th>
            <th>Candidate Name</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* We "map" over the array to generate a new table row for every record */}
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.employeeId}</td>
              <td>{record.fullName}</td>
              <td>{record.cityState}, {record.pinCode}</td>
              <td>
                <span style={{ 
                  color: record.verificationStatus === 'Approved' ? 'green' : 'orange',
                  fontWeight: 'bold' 
                }}>
                  {record.verificationStatus || 'Pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationDashboard;