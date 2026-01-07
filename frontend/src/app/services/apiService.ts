

const apiService = {
    // Helper to get the base URL
    getBaseUrl: () => process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000',

    // Helper to get headers with Bearer token
    getHeaders: () => {
        const token = localStorage.getItem('token');
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // Only add Authorization if token exists
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    },

    // --- GENERIC METHODS (Fixes your error) ---

    // 1. Generic GET
    get: async (url: string) => {
        const response = await fetch(`${apiService.getBaseUrl()}${url}`, {
            method: 'GET',
            headers: apiService.getHeaders()
        });
        return apiService.handleResponse(response);
    },

    // 2. Generic POST (This fixes the "is not a function" error)
    post: async (url: string, data: any) => {
        const response = await fetch(`${apiService.getBaseUrl()}${url}`, {
            method: 'POST',
            headers: apiService.getHeaders(),
            body: JSON.stringify(data)
        });
        return apiService.handleResponse(response);
    },

    // --- SPECIFIC METHODS (Keep these for your other pages) ---

    getListingDetail: async (id: string) => {
        const response = await fetch(`${apiService.getBaseUrl()}/api/listings/${id}/`, {
            method: 'GET',
            headers: apiService.getHeaders()
        });
        return response.json();
    },

    postReservation: async (listingId: string, startDate: Date, endDate: Date, totalPrice: number) => {
        const response = await fetch(`${apiService.getBaseUrl()}/api/listings/${listingId}/reservations/`, {
            method: 'POST',
            headers: apiService.getHeaders(),
            body: JSON.stringify({
                startDate: startDate.toISOString().split('T')[0], 
                endDate: endDate.toISOString().split('T')[0],
                totalPrice: totalPrice
            })
        });
        return response.json();
    },

    getReservations: async () => {
        const response = await fetch(`${apiService.getBaseUrl()}/api/listings/reservations/`, {
            method: 'GET',
            headers: apiService.getHeaders()
        });
        return response.json();
    },

    deleteReservation: async (id: string) => {
        const response = await fetch(`${apiService.getBaseUrl()}/api/listings/reservations/${id}/`, {
            method: 'DELETE',
            headers: apiService.getHeaders()
        });
        return response.json();
    },

    createListing: async (formData: FormData) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiService.getBaseUrl()}/api/listings/create/`, {
            method: 'POST',
            body: formData,
            headers: {
                // No Content-Type for FormData, browser sets it automatically
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return response.json();
    },
    delete: async (url: string) => {
        const response = await fetch(`${apiService.getBaseUrl()}${url}`, {
            method: 'DELETE',
            headers: apiService.getHeaders()
        });
        return apiService.handleResponse(response);
    },

    deleteListingImage: async (listingId: string, imageId: number) => {
        return await apiService.delete(`/api/listings/${listingId}/images/${imageId}/delete/`);
    },
    deleteListing: async (id: string): Promise<any> => {
        const response = await fetch(`${apiService.getBaseUrl()}/api/listings/${id}/delete/`, {
            method: 'DELETE',
            headers: apiService.getHeaders()
        });
    
        if (response.status === 204) {
            return { success: true };
        }
    
        return response.json();
    },
    updateListing: async (id: string, formData: FormData) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiService.getBaseUrl()}/api/listings/${id}/update/`, {
            method: 'POST', // Using POST for easier file handling compatible with Django
            body: formData,
            headers: {
                // No Content-Type header needed for FormData (browser sets it)
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return apiService.handleResponse(response);
    },
   
    postReview: async (listingId: string, rating: number, comment: string) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiService.getBaseUrl()}/api/listings/${listingId}/reviews/`, {
            method: 'POST',
            body: JSON.stringify({ rating, comment }),
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }) // Needs token to know WHO is reviewing
            }
        });
        return apiService.handleResponse(response);
    },

    updateProfile: async (formData: FormData) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiService.getBaseUrl()}/api/auth/edit/`, {
            method: 'POST',
            body: formData,
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return apiService.handleResponse(response);
    },

    // Helper to prevent crashing on non-JSON responses
    handleResponse: async (response: Response) => {
        const text = await response.text();
        let data;
        
        try {
            data = JSON.parse(text);
        } catch (error) {
            // If response is not JSON (it's likely an HTML error page from Django)
            console.error("Non-JSON response received:", text);
            return Promise.reject("Server Error: Check console for details");
        }

        if (!response.ok) {
            const error = (data && data.detail) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    }

    
}



export default apiService;