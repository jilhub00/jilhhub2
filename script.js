document.addEventListener('DOMContentLoaded', () => {
    const videosContainer = document.querySelector('.videos-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Sample video data (replace with actual data from your platform)
    const videos = [
        {
            id: 'dQw4w9WgXcQ', // Example YouTube ID
            title: 'The Future of AI in Content Creation',
            description: 'Explore how artificial intelligence is revolutionizing the way we create and consume content.',
            thumbnail: 'https://via.placeholder.com/300x200?text=Video+Thumbnail+1',
            views: 123456
        },
        {
            id: 'someOtherVideoId',
            title: 'Quantum Computing Explained',
            description: 'A deep dive into the principles and potential of quantum computing.',
            thumbnail: 'https://via.placeholder.com/300x200?text=Video+Thumbnail+2',
            views: 98765
        },
        {
            id: 'yetAnotherVideoId',
            title: 'Space Exploration: Beyond Mars',
            description: 'Journey with us as we look beyond Mars to the next frontiers of space exploration.',
            thumbnail: 'https://via.placeholder.com/300x200?text=Video+Thumbnail+3',
            views: 234567
        },
        {
            id: 'video4',
            title: 'Cybersecurity in 2025',
            description: 'Understanding the evolving landscape of digital threats and defenses.',
            thumbnail: 'https://via.placeholder.com/300x200?text=Video+Thumbnail+4',
            views: 56789
        }
    ];


    // Function to format view count
    const formatViews = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    // Function to render videos
    const renderVideos = (videoList) => {
        videosContainer.innerHTML = '';
        if (videoList.length === 0) {
            videosContainer.innerHTML = '<p>No videos found. Try a different search term.</p>';
            return;
        }
        videoList.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.innerHTML = `
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                    <div class="video-meta">
                        <span>Views: <span class="video-views-count">${formatViews(video.views)}</span></span>
                        <button class="watch-button" data-video-id="${video.id}">Watch</button>
                    </div>
                </div>
            `;
            videosContainer.appendChild(videoItem);
        });
    };

    // Function to simulate random view count changes
    const simulateViewChanges = () => {
        document.querySelectorAll('.video-views-count').forEach(viewCountElement => {
            let currentViews = parseFloat(viewCountElement.textContent.replace('M', '').replace('K', '')) * (viewCountElement.textContent.includes('M') ? 1000000 : (viewCountElement.textContent.includes('K') ? 1000 : 1));
            const change = Math.floor(Math.random() * 200) - 100; // Random change between -100 and +99
            currentViews = Math.max(100, currentViews + change); // Ensure views don't go too low
            viewCountElement.textContent = formatViews(currentViews);
        });
    };

    // Initial render
    renderVideos(videos);

    // Simulate view changes every 5 seconds (only for initially loaded videos)
    setInterval(simulateViewChanges, 5000);

    // Function to filter videos based on search term
    const filterVideos = (searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return videos.filter(video =>
            video.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            video.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
    };

    // Handle search button click
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const filtered = filterVideos(searchTerm);
        renderVideos(filtered);
    });

    // Handle Enter key press in search input
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // Handle watch button clicks (for integrating with YouTube/Vimeo later)
    videosContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('watch-button')) {
            const videoId = event.target.dataset.videoId;
            // For YouTube, you might open a modal with an iframe:
            const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            window.open(youtubeEmbedUrl, '_blank'); // Opens in a new tab for simplicity
        }
    });
});