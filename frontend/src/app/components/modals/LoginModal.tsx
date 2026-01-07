'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    useEffect(() => {
        if (loginModal.isOpen) {
            setTimeout(() => setShowModal(true), 10);
        } else {
            setShowModal(false);
        }
    }, [loginModal.isOpen]);
    

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000'}/api/users/login/`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username, // Send the simple username
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login Successful");
                // Save the token!
                localStorage.setItem('token', data.access); 
                localStorage.setItem('userId', data.userId);
                
                const userData = {
                    id: data.userId,
                    username: data.userName,
                    is_host: data.is_host // This is the most important part!
                };
                localStorage.setItem('user_data', JSON.stringify(userData));
                
                loginModal.onClose();
                router.refresh(); // Refresh to update the Navbar
                window.location.reload(); // Force reload to ensure state updates
            } else {
                console.log(data);
                alert("Login failed: " + JSON.stringify(data));
            }

        } catch (error) {
            console.error("Network Error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    if (!loginModal.isOpen) {
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
            <div className={`
                w-11/12 max-w-[568px] bg-white rounded-xl shadow-xl overflow-hidden relative 
                transform transition-all duration-300
                ${showModal ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}
            `}>
                
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <button onClick={loginModal.onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="font-bold text-base text-gray-900">Log in</div>
                    <div className="w-6"></div>
                </div>

                {/* BODY */}
                <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-900">Welcome back</h3>

                    {/* USERNAME INPUT (Simplified) */}
                    <div className="border border-gray-400 rounded-lg overflow-hidden mb-4 p-3">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full h-full outline-none text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    {/* PASSWORD INPUT */}
                    <div className="border border-gray-400 rounded-lg overflow-hidden mb-4 p-3">
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-full outline-none text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    {/* BUTTON */}
                    <button 
                        onClick={handleSubmit} 
                        disabled={isLoading}
                        className={`w-full bg-primary font-medium text-white py-3.5 rounded-lg transition mb-6 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                    >
                        {isLoading ? "Loading..." : "Continue"}
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] bg-gray-300 flex-1"></div>
                        <div className="text-xs text-gray-500">or</div>
                        <div className="h-[1px] bg-gray-300 flex-1"></div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <SocialButton icon="/icon-google.svg" label="Continue with Google" />
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-6">
                        <div>
                            No account yet?
                            <span 
                                onClick={() => {
                                    loginModal.onClose();
                                    registerModal.onOpen();
                                }}
                                className="text-gray-900 cursor-pointer hover:underline font-semibold ml-2"
                            >
                                Sign up
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

const SocialButton = ({ icon, label }: { icon: string, label: string }) => (
    <button className="flex items-center justify-between w-full border border-gray-900 rounded-lg p-3 hover:bg-gray-50 transition relative">
        <div className="w-5 h-5 relative">
            <Image 
                src={icon} 
                alt={label}
                fill
                className="object-contain"
            />
        </div>
        <div className="text-sm font-semibold text-gray-900 flex-1 text-center">
            {label}
        </div>
        <div className="w-5"></div>
    </button>
);

export default LoginModal;