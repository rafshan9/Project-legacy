'use client';

import { useState, useEffect } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [showModal, setShowModal] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (registerModal.isOpen) {
            setTimeout(() => setShowModal(true), 10);
        } else {
            setShowModal(false);
        }
    }, [registerModal.isOpen]);

    const handleSubmit = async () => {
        setIsLoading(true);

        // 2. ADD THIS VALIDATION CHECK
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000'}/api/auth/registration/`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    username: name,
                    password1: password,
                    password2: confirmPassword // 3. SEND THE REAL CONFIRMATION HERE
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Registration Successful");
                registerModal.onClose();
                loginModal.onOpen();
            } else {
                console.log(data);
                alert("Error: " + JSON.stringify(data));
            }

        } catch (error) {
            console.error("Network Error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const onToggle = () => {
        setShowModal(false); // Reset animation state
        setTimeout(() => {
            registerModal.onClose();
            loginModal.onOpen();
        }, 300); // Wait for the "slide down" animation to finish
    }
    if (!registerModal.isOpen) {
        return null;
    }

    return (
        <div 
            className={`
                fixed inset-0 z-[100] flex items-center justify-center bg-black/50 
                transition-opacity duration-300
                ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
        >
            <div 
                className={`
                    w-11/12 max-w-[568px] bg-white rounded-xl shadow-xl overflow-hidden relative 
                    transform transition-all duration-300
                    ${showModal ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}
                `}
            >
                
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <button onClick={registerModal.onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="font-bold text-base text-gray-900">Sign up</div>
                    <div className="w-6"></div>
                </div>

                {/* BODY */}
                <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-900">Welcome to Haven</h3>

                    <div className="flex flex-col gap-4 mb-6">
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-400 p-4 rounded-lg outline-none text-gray-900 placeholder-gray-500"
                        />
                         <input 
                            type="text" 
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-400 p-4 rounded-lg outline-none text-gray-900 placeholder-gray-500"
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-400 p-4 rounded-lg outline-none text-gray-900 placeholder-gray-500"
                        />
                        
                        {/* 4. UPDATED CONFIRM PASSWORD INPUT */}
                        <input 
                            type="password" 
                            placeholder="Confirm Password"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-400 p-4 rounded-lg outline-none text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    <div className="text-xs text-gray-500 mb-6 leading-tight">
                        By selecting Agree and continue, I agree to Haven's Terms of Service. 
                    </div>

                    <button 
                        onClick={handleSubmit} 
                        disabled={isLoading}
                        className={`w-full bg-primary text-white font-medium py-3.5 rounded-lg transition mb-6 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                    >
                        {isLoading ? "Loading..." : "Agree and continue"}
                    </button>

                    <div className="text-neutral-500 text-center mt-4 font-light">
                        <p>Already have an account? 
                            <span 
                                onClick={onToggle} 
                                className="text-neutral-800 cursor-pointer hover:underline font-semibold ml-2"
                            >
                                Log in
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RegisterModal;