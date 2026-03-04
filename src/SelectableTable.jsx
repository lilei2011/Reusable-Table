import React, { useRef, useEffect } from "react";
import { FaDownload, FaCircle } from "react-icons/fa";
import "./SelectableTable.css";

export default function SelectableTable({
  data,
  name = "Selectable Table",
  isSelectable = true,
}) {
  const headerNames = Object.keys(data[0] || {});
  const [selectedRows, setSelectedRows] = React.useState([]);
  const selectAllRef = useRef(null);

  const handleRowSelect = (row) => {
    if (selectedRows.includes(row)) {
      setSelectedRows(selectedRows.filter((r) => r !== row));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedRows([...data]);
    } else {
      setSelectedRows([]);
    }
  };
  const printDownloadAlert = () => {
    const availableFiles = selectedRows.filter(
      (row) => row.status === "available",
    );
    let fileString = availableFiles
      .map((file) => `${file.device}  ${file.path}`)
      .join("\n");
    alert(`Downloading ${availableFiles.length} file(s):\n${fileString}`);
  };

  useEffect(() => {
    if (!selectAllRef.current) {
      return;
    }

    if (selectedRows.length < data.length && selectedRows.length > 0) {
      selectAllRef.current.indeterminate = true;
    } else {
      selectAllRef.current.indeterminate = false;
    }
  }, [selectedRows, data]);

  return (
    <div className="table-container">
      <h2>{name}</h2>
      {isSelectable && (
        <div className="table-header">
          <div className="select-all">
            <input
              type="checkbox"
              id="select-all"
              name="select-all"
              value="Select All"
              onChange={(e) => handleSelectAllChange(e)}
              ref={selectAllRef}
              checked={selectedRows.length === data.length}
            />
            <label htmlFor="select-all">
              {selectedRows.length === data.length && "Selected All"}
              {selectedRows.length > 0 &&
                selectedRows.length < data.length &&
                `Selected ${selectedRows.length} `}
              {selectedRows.length === 0 && "None selected"}
            </label>
          </div>
          <button
            className="download-btn"
            disabled={
              selectedRows.filter((row) => row.status === "available")
                .length === 0
            }
            onClick={printDownloadAlert}
          >
            <span className="icon">
              <FaDownload aria-hidden="true" focusable="false" />
            </span>
            Download Selected
          </button>
        </div>
      )}
      <table aria-label={name}>
        <thead>
          <tr>
            {isSelectable && <th></th>}
            {headerNames.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={selectedRows.includes(row) ? "selected" : ""}
              onClick={() => handleRowSelect(row)}
            >
              {isSelectable && (
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Select row ${row.name}`}
                    checked={selectedRows.includes(row)}
                    onChange={() => handleRowSelect(row)}
                  />
                </td>
              )}
              {Object.values(row).map((value, i) => (
                <td key={value}>
                  {value === "available" && (
                    <span className="icon">
                      <FaCircle color="green" />
                    </span>
                  )}
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
