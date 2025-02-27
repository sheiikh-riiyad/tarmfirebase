import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import html2pdf from 'html2pdf.js';


const auth = getAuth(app);
const database = getDatabase(app);

function Console() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    scaleId: '',
    startDate: '',
    endDate: '',
    truckName: '',
    partyName: '',
    goodsName: '',
    gross: '',
    tare: '',
    net: ''
  });
  const printRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = () => {
    const dbRef = ref(database, 'eTerminal');
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const formattedData = Object.keys(rawData).map((key) => ({
          id: key,
          ...rawData[key],
        }));
        setData(formattedData);
      } else {
        setData([]);
      }
    });
  };

  const navigate = useNavigate();

  // Helper function to parse dates
  const parseDate = (dateString) => {
    const parsedDate = Date.parse(dateString);
    return isNaN(parsedDate) ? null : new Date(parsedDate);
  };

  // Filter function to apply the filters to the data
  const filteredData = data.filter((item) => {
    const itemDate = parseDate(item.weightDate);

    const startDate = filters.startDate ? parseDate(filters.startDate) : null;
    const endDate = filters.endDate ? parseDate(filters.endDate) : null;

    return (
      (filters.scaleId === '' || item.id.toLowerCase().includes(filters.scaleId.toLowerCase())) &&
      (startDate === null || itemDate >= startDate) && // Only show items with date >= startDate
      (endDate === null || itemDate <= endDate) && // Only show items with date <= endDate
      (filters.truckName === '' || item.vehicleNo.toLowerCase().includes(filters.truckName.toLowerCase())) &&
      (filters.partyName === '' || item.partyName.toLowerCase().includes(filters.partyName.toLowerCase())) &&
      (filters.goodsName === '' || item.itemName.toLowerCase().includes(filters.goodsName.toLowerCase())) &&
      (filters.gross === '' || item.grossQuantity === filters.gross) &&
      (filters.tare === '' || item.tareQuantity === filters.tare) &&
      (filters.net === '' || item.netQuantity === filters.net)
    );
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleExport = () => {
    const element = printRef.current;
    const opt = {
      margin:       0.5,
      filename:     'eTerminal_Report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      {user ? (
        <>
          <h1 style={{ textAlign: 'center' }}>TALUKDER AUTO RICE MILL</h1>

          <Form style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {['scaleId', 'startDate', 'endDate', 'truckName', 'partyName', 'goodsName', 'gross', 'tare', 'net'].map((field, idx) => (
              <Form.Group style={{ width: "200px", margin: "5px" }} className="mb-3" controlId={`formControl${idx}`} key={idx}>
                <Form.Control 
                  type={field.includes("Date") ? "date" : "text"}
                  placeholder={`Filter by ${field.replace(/([A-Z])/g, ' $1')}`} 
                  name={field}
                  value={filters[field]}
                  onChange={handleFilterChange} 
                />
              </Form.Group>
            ))}
            <Button onClick={handleExport} variant="outline-primary" style={{ margin: "5px" }}>Export</Button>
          </Form>

          <div ref={printRef} className="print-area" style={{ overflowX: "auto", margin: "20px 0" }}>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th>ScaleID</th>
                  <th>Date</th>
                  <th>Truck Name</th>
                  <th>Party Name</th>
                  <th>Goods Name</th>
                  <th>Gross</th>
                  <th>Tare</th>
                  <th>Net</th>
                  <th>Scale Fees</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.weightDate || 'N/A'}</td>
                      <td>{item.vehicleNo || 'N/A'}</td>
                      <td>{item.partyName || 'N/A'}</td>
                      <td>{item.itemName || 'N/A'}</td>
                      <td>{item.grossQuantity || 'N/A'}</td>
                      <td>{item.tareQuantity || 'N/A'}</td>
                      <td>{item.netQuantity || 'N/A'}</td>
                      <td>{item.scaleFees || 'N/A'}</td>
                      <td>
                        <Button
                          variant="outline-info"
                          onClick={() => navigate(`/view/${item.id}`, { state: item })}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Card style={{ textAlign: 'center' }}>
          <Card.Body>
            <h1>YOU NEED TO LOGIN</h1>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Console;
