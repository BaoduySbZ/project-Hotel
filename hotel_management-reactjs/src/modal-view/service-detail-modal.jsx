import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";

// Style for the modal box
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const ViewServiceModal = ({ service, open, onClose }) => {
    const [details, setDetails] = useState({
        name: "",
        service_price: "",
        description: "",
        icon: "",
    });

    useEffect(() => {
        if (service) {
            setDetails(service);
        } else {
            setDetails({
                name: "",
                service_price: "",
                description: "",
                icon: "",
            });
        }
    }, [service]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    <strong>Chi tiết dịch vụ</strong>
                </Typography>

                <Box mt={2}>
                    <Typography variant="body1">
                        <strong>Tên dịch vụ:</strong> {details.name || "N/A"}
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        <strong>Giá dịch vụ:</strong> {details.service_price || "N/A"}
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        <strong>Mô tả:</strong> {details.description || "N/A"}
                    </Typography>
                    {/* <Typography variant="body1" mt={1}>
                        <strong>Icon URL:</strong>{" "}
                        {details.icon ? (
                            <a href={details.icon} target="_blank" rel="noopener noreferrer">
                                {details.icon}
                            </a>
                        ) : (
                            "N/A"
                        )}
                    </Typography> */}
                    {details.icon && (
                        <Box mt={2} textAlign="center">
                            <img
                                src={details.icon}
                                alt="Service Icon"
                                style={{
                                    maxWidth: "250px",
                                    maxHeight: "250px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    padding: "5px",
                                }}
                            />
                        </Box>
                    )}
                </Box>

                <Box mt={4} display="flex" justifyContent="flex-end">
                    <button className="btn btn-danger admin-btn" onClick={onClose}>
                        Đóng
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewServiceModal;