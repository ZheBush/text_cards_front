import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationState } from "../types";

interface OneHistoryCardProps {
  id: string;
  title: string;
  onFileUploaded?: () => void;
}

const OneHistoryCard: React.FC<OneHistoryCardProps> = ({ id, title, onFileUploaded }) => {
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleCardClick = () => {
    navigate("/cards", {
      state: { cardListId: id, title: title } as LocationState,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/card_lists/${id}/upload_file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (response.ok) {
        alert("File uploaded successfully");
        setSelectedFile(null);
        setIsUploadModalOpen(false);
        if (onFileUploaded) onFileUploaded();
      } else {
        const err = await response.json();
        alert(`Upload failed: ${err.detail || "Unknown error"}`);
      }
    } catch {
      alert("Network error");
    } finally {
      setIsUploading(false);
    }
  };

  const modalStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalContentStyles: React.CSSProperties = {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "90%",
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        style={{
          height: "20vh",
          width: "20vw",
          backgroundColor: "rgb(240,240,240)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          boxShadow: "0 1px 4px -1px rgba(0,0,0,0.2)",
          outline: "1px solid rgb(4,120,87)",
          position: "relative",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgb(230,230,230)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(240,240,240)")}
      >
        <div style={{ textAlign: "center", color: "rgb(40,40,40)", fontWeight: 400, fontSize: 18, width: "100%", padding: "8px" }}>
          {title}
        </div>
        <button
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            backgroundColor: "rgb(4,120,87)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "4px 8px",
            fontSize: "12px",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsUploadModalOpen(true);
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgb(24,140,107)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(4,120,87)")}
        >
          Upload file
        </button>
      </div>

      {isUploadModalOpen && (
        <div style={modalStyles} onClick={() => setIsUploadModalOpen(false)}>
          <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Upload file for "{title}"</h3>
            <input type="file" onChange={handleFileChange} style={{ margin: "16px 0", width: "100%" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "rgb(4,120,87)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OneHistoryCard;