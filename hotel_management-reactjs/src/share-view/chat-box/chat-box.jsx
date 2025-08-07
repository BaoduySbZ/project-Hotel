import React, { useState, useEffect } from 'react';
import '../chat-box/chatBox.css'; // Import file CSS
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002'); // Kết nối với server

const BoxChat = () => {
    const [messages, setMessages] = useState([
        { text: 'Xin chào, tôi có thể giúp gì cho bạn?', sender: 'bot' },
        { text: 'Bạn có thể tư vấn giúp tôi?', sender: 'user' },
        { text: 'Chắc chắn rồi, bạn cần hỗ trợ gì?', sender: 'bot' },
    ]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái mở/đóng box chat

    useEffect(() => {
        // Nhận tin nhắn từ server
        socket.on('chat message', (msg) => {
            console.log("Received message: ", msg);
            // Chỉ thêm tin nhắn từ server (sender là 'bot')
            if (msg.sender === 'bot') {
                setMessages((prevMessages) => [...prevMessages, msg]);
            }
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const handleSend = () => {
        if (input.trim()) {
            const message = { text: input, sender: 'user' }; // Định nghĩa sender
            // Gửi tin nhắn đến server
            socket.emit('chat message', message);
            setMessages([...messages, message]);
            setInput('');
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="chat-icon" onClick={toggleChat}>
                <i className="fa-brands fa-facebook-messenger"></i>{/* Dùng class FontAwesome từ CDN */}
            </div>
            <div className={`chat-box ${isOpen ? 'chat-box--active' : ''}`}>
                <div className="chat-box__header">Hỗ trợ trực tuyến</div>
                <div className="chat-box__body">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-box__message ${msg.sender === 'user' ? 'chat-box__message--user' : ''}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-box__footer">
                    <input
                        type="text"
                        className="form-control"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                    />
                    <button className="btn btn-primary ms-2" onClick={handleSend}>Gửi</button>
                </div>
            </div>
        </>
    );
};

export default BoxChat;
