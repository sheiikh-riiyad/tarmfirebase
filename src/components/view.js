import React, { useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// ✅ Printable Component (Ensures proper ref attachment)
const PrintableComponent = React.forwardRef(({ id, data }, ref) => (
  <div
    ref={ref} // ✅ Attach ref correctly
    style={{
      width: "100%", // ✅ Ensure full width
      maxWidth: "100%", // ✅ Prevent unnecessary scaling
      textAlign: "center",
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      background: "#fff",
      margin: "0 auto",
    }}
  >
    <h2>Transaction Details</h2>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
      <p><strong>Scale ID:</strong> {id}</p>
      <p><strong>Date:</strong> {data.weightDate}</p>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
      <p><strong>Truck Name:</strong> {data.vehicleNo}</p>
      <p><strong>Party Name:</strong> {data.partyName}</p>
      <p><strong>Goods Name:</strong> {data.itemName}</p>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
      <p><strong>Gross:</strong> {data.grossQuantity}</p>
      <p><strong>Tare:</strong> {data.tareQuantity}</p>
      <p><strong>Net:</strong> {data.netQuantity}</p>
      <p><strong>Scale Fees:</strong> {data.scaleFees}</p>
    </div>
  </div>
));

function View() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  const printRef = useRef(null); // ✅ Ensure ref is initialized

  // ✅ Handle Print Functionality
  const handlePrint = useReactToPrint({
    content: () => {
      console.log("Printing element:", printRef.current); // Debugging
      return printRef.current;
    },
    documentTitle: `Transaction-${id}`,
  });

  // ✅ Handle Export PDF
  const handleExportPDF = () => {
    if (!printRef.current) {
      console.error("No content to export!");
      return;
    }

    html2canvas(printRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Transaction-${id}.pdf`);
    });
  };

  if (!data) return <h1 style={{ textAlign: "center" }}>No Data Found</h1>;

  return (
    <>
      <div style={{ textAlign: "center", padding: "10px", background: "#fff" }}>
        {/* <Button style={{ margin: "5px" }} variant="outline-primary" onClick={handlePrint}>
          Print
        </Button> */}
        <Button variant="outline-success" onClick={handleExportPDF}>
          Export PDF
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          background: "#f5f5f5",
          padding: "20px",
          width: "100%",
        }}
      >
        {/* ✅ Attach ref to PrintableComponent */}
        <PrintableComponent ref={printRef} id={id} data={data} />
      </div>
    </>
  );
}

export default View;
