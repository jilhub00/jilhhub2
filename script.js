document.addEventListener('DOMContentLoaded', () => {
    // Get all video containers
    const videoContainers = document.querySelectorAll('.videos-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const watchButtons = document.querySelectorAll('.watch-button');

    // Sample video data with more entries for better demonstration
    const videos = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'The Future of AI in Content Creation',
            description: 'Explore how artificial intelligence is revolutionizing the way we create and consume content.',
            thumbnail: 'https://images.unsplash.com/photo-1677442135722-5f11e06a4e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            views: 123456,
            duration: '12:45'
        },
        {
            id: 'someOtherVideoId',
            title: 'Quantum Computing Explained',
            description: 'A deep dive into the principles and potential of quantum computing.',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            views: 98765,
            duration: '18:22'
        },
        {
            id: 'yetAnotherVideoId',
            title: 'Space Exploration: Beyond Mars',
            description: 'Journey with us as we look beyond Mars to the next frontiers of space exploration.',
            thumbnail: 'https://images.unsplash.com/photo-1454789548928-9a7310581f42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            views: 234567,
            duration: '22:10'
        },
        {
            id: 'video4',
            title: 'Cybersecurity in 2025',
            description: 'Understanding the evolving landscape of digital threats and defenses.',
            thumbnail: 'https://images.unsplash.com/photo-156301782-700c-4b77-88e9-41054af4d90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            views: 56789,
            duration: '15:33'
        },
        {
            id: 'video5',
            title: 'Neural Networks and Deep Learning',
            description: 'An introduction to neural networks and how they power modern AI systems.',
            thumbnail: 'https://images.unsplash.com/photo-1676823104043-7592cb33554e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            views: 345678,
            duration: '25:17'
        },
        {
            id: 'video6',
            title: 'Blockchain Revolution',
            description: 'How blockchain technology is changing finance, supply chains, and more.',
            thumbnail: 'https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            views: 198765,
            duration: '19:42'
        }
    ];

    // Function to format view count
    const formatViews = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    // Function to render videos
    const renderVideos = (videoList, container) => {
        container.innerHTML = '';
        if (videoList.length === 0) {
            container.innerHTML = '<p class="no-results">No videos found. Try a different search term.</p>';
            return;
        }
        videoList.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.innerHTML = `
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <span class="video-duration">${video.duration}</span>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                    <div class="video-meta">
                        <span class="video-views"><i class="fas fa-eye"></i> ${formatViews(video.views)} views</span>
                        <button class="watch-button" data-video-id="${video.id}">Watch</button>
                    </div>
                </div>
            `;
            container.appendChild(videoItem);
        });
    };

    // Function to shuffle array
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Function to filter videos based on search term
    const filterVideos = (searchTerm, category = 'All') => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        let filteredVideos = videos;
        
        // Filter by category if not 'All'
        if (category !== 'All') {
            // In a real app, videos would have category properties
            // For demo, we'll just shuffle for variety
            filteredVideos = shuffleArray(filteredVideos);
        }
        
        // Filter by search term
        if (searchTerm) {
            filteredVideos = filteredVideos.filter(video =>
                video.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                video.description.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
        
        return filteredVideos;
    };

    // Render videos in each container
    const renderAllVideos = () => {
        // First container gets all videos
        const featuredVideos = videos.slice(0, 4);
        renderVideos(featuredVideos, videoContainers[0]);
        
        // Second container gets shuffled videos
        const trendingVideos = shuffleArray(videos).slice(0, 4);
        renderVideos(trendingVideos, videoContainers[1]);
    };

    // Initial render
    renderAllVideos();

    // Handle search button click
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const filtered = filterVideos(searchTerm);
        renderVideos(filtered, videoContainers[0]);
        // Clear second container when searching
        videoContainers[1].innerHTML = '';
    });

    // Handle Enter key press in search input
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // Handle category button clicks
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter videos by category
            const category = button.textContent;
            const searchTerm = searchInput.value;
            const filtered = filterVideos(searchTerm, category);
            
            // Render in first container
            renderVideos(filtered.slice(0, 4), videoContainers[0]);
        });
    });

    // Handle watch button clicks
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('watch-button')) {
            const videoId = event.target.dataset.videoId;
            // Show a modal with video player (simplified for this example)
            alert(`Playing video with ID: ${videoId}
In a real application, this would open a video player modal.`);
        }
    });

    // Simulate view count updates
    const updateViewCounts = () => {
        document.querySelectorAll('.video-views').forEach(viewElement => {
            const currentText = viewElement.textContent;
            const currentViews = parseInt(currentText.replace(/\D/g, ''));
            if (!isNaN(currentViews)) {
                const change = Math.floor(Math.random() * 100);
                const newViews = currentViews + change;
                viewElement.innerHTML = `<i class="fas fa-eye"></i> ${formatViews(newViews)} views`;
            }
        });
    };

    // Update view counts every 10 seconds
    setInterval(updateViewCounts, 10000);

    // Add animation to hero section on load
    const heroSection = document.querySelector('.hero-section');
    setTimeout(() => {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 300);
});