'use client';

import { useState, useEffect } from "react";
import useMessageHostModal from "@/app/hooks/useMessageHostModal";
import apiService from "@/app/services/apiService";

interface MessageHostModalProps {
    landlordId: string;
}

const MessageHostModal: React.FC<MessageHostModalProps> = ({ landlordId }) => {
    const messageModal = useMessageHostModal();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Animation Effect
    useEffect(() => {
        if (messageModal.isOpen) {
            setTimeout(() => setShowModal(true), 10);
        } else {
            setShowModal(false);
        }
    }, [messageModal.isOpen]);

    // Handle Submit Logic (Now correctly inside the component)
    const handleSubmit = async () => {
        if (!message || isLoading) return; 
        
        setIsLoading(true);
        
        try {
            const response = await apiService.post(`/api/conversations/start/${landlordId}/`, {
                content: message
            });

            if (response.success) {
                messageModal.onClose();
                setMessage("");
                alert("Message sent successfully!");
            }
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!messageModal.isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[120] bg-black/50 flex items-center justify-center p-4 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white w-full max-w-lg rounded-2xl overflow-hidden transform transition-all duration-300 shadow-2xl ${showModal ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}>
                
                {/* HEADER */}
                <div className="flex items-center justify-between border-b p-4">
                    <button onClick={messageModal.onClose} className="p-2 hover:bg-gray-100 rounded-full transition">✕</button>
                    <h2 className="font-bold text-lg text-gray-900">Contact Host</h2>
                    <div className="w-10"></div>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    <h3 className="text-xl font-semibold text-gray-800">Send a message to the host</h3>
                    
                    <div className="flex flex-col gap-4">
                        <div className="border border-gray-300 rounded-lg p-3">
                            <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                            <textarea 
                                className="w-full h-32 outline-none text-gray-800 resize-none mt-1"
                                placeholder="Tell the host about your trip..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`w-full text-white py-4 rounded-xl font-bold text-lg transition active:scale-[0.98] ${isLoading ? 'bg-gray-400' : 'bg-primary hover:brightness-95'}`}
                    >
                        {isLoading ? "Sending..." : "Send Message"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageHostModal;