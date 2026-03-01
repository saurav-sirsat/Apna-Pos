// API Response Structure Fix
// This fixes the mismatch between backend response and frontend expectations

(function() {
    console.log('🔧 Applying API response structure fix...');
    
    // Store original fetch
    const originalFetch = window.fetch;
    
    // Override fetch to fix API responses
    window.fetch = function(...args) {
        const url = args[0];
        const options = args[1] || {};
        
        return originalFetch.apply(this, args).then(response => {
            // Fix login response structure
            if (url.includes('/auth/login') && options.method === 'POST') {
                return response.clone().json().then(data => {
                    console.log('🔍 Original login response:', data);
                    
                    if (data.success && data.data) {
                        // Transform to match frontend expectations
                        const fixedResponse = data.data; // Extract the nested data
                        
                        return new Response(JSON.stringify(fixedResponse), {
                            status: response.status,
                            statusText: response.statusText,
                            headers: response.headers
                        });
                    }
                    
                    return response;
                });
            }
            
            // Fix signup response structure  
            if (url.includes('/auth/signup') && options.method === 'POST') {
                return response.clone().json().then(data => {
                    console.log('🔍 Original signup response:', data);
                    
                    if (data.success && data.data) {
                        const fixedResponse = data.data; // Extract the nested data
                        
                        return new Response(JSON.stringify(fixedResponse), {
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
