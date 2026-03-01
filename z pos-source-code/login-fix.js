// Temporary login fix - inject this into browser console
// This fixes the API response structure issue

(function() {
    // Override the fetch to fix login response structure
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args).then(response => {
            // Clone the response to modify it
            const clonedResponse = response.clone();
            
            // If this is a login request, fix the response structure
            if (args[0].includes('/auth/login') && args[1]?.method === 'POST') {
                return clonedResponse.json().then(data => {
                    console.log('Original response:', data);
                    
                    // Transform the response to match what frontend expects
                    if (data.success && data.data) {
                        const fixedData = {
                            jwt: data.data.jwt,
                            user: data.data.user,
                            message: data.data.message,
                            title: data.data.title
                        };
                        console.log('Fixed response:', fixedData);
                        
                        // Create a new response with the fixed data
                        return new Response(JSON.stringify(fixedData), {
                            status: response.status,
                            statusText: response.statusText,
                            headers: response.headers
                        });
                    }
                    return response;
                });
            }
            
            return response;
        });
    };
    
    console.log('Login fix injected!');
})();
