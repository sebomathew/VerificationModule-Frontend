import { useState } from 'react';

export default function AddressVerificationForm() {
  const [addressData, setAddressData] = useState({
    employeeId: '',
    fullName: '',
    streetAddress: '',
    cityState: '',
    pincode: '',
    verificationStatus: 'Pending' // Hidden from the user, but tracked in state
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payload ready for EF Core:", addressData);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Candidate Address Verification</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '350px' }}>
        <input type="text" name="employeeId" placeholder="Employee ID" value={addressData.employeeId} onChange={handleChange} style={{ padding: '8px' }} />
        <input type="text" name="fullName" placeholder="Full Legal Name" value={addressData.fullName} onChange={handleChange} style={{ padding: '8px' }} />
        <input type="text" name="streetAddress" placeholder="Street Address" value={addressData.streetAddress} onChange={handleChange} style={{ padding: '8px' }} />
        <input type="text" name="cityState" placeholder="City & State" value={addressData.cityState} onChange={handleChange} style={{ padding: '8px' }} />
        <input type="text" name="pincode" placeholder="Pincode / ZIP" value={addressData.pincode} onChange={handleChange} style={{ padding: '8px' }} />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit for Verification
        </button>
      </form>
    </div>
  );
}