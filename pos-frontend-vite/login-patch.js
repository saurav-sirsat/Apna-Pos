// Auto-login fix - This will be injected into the frontend
(function() {
    console.log('🔧 Applying login fix...');
    
    // Override fetch to fix login response structure
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args).then(response => {
            // Fix login response structure
            if (args[0].includes('/auth/login') && args[1]?.method === 'POST') {
                return response.clone().json().then(data => {
                    console.log('🔍 Original response:', data);
                    
                    if (data.success && data.data) {
                        // Transform to match what frontend expects
                        const fixedData = {
                            jwt: data.data.jwt,
                            user: data.data.user,
                            message: data.data.message,
                            title: data.data.title
                        };
                        
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
    
})();
