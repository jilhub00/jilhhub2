document.addEventListener('DOMContentLoaded', () => {
    // Get the video container
    const videosContainer = document.querySelector('.videos-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

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
        },
        {
            id: 'video7',
            title: 'The Science of Climate Change',
            description: 'Understanding the data and research behind climate change.',
            thumbnail: 'https://images.unsplash.com/photo-1614469159813-2b73de4fd2c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            views: 456789,
            duration: '21:15'
        },
        {
            id: 'video8',
            title: 'Virtual Reality: The Next Frontier',
            description: 'Exploring the latest developments in VR technology and applications.',
            thumbnail: 'https://images.unsplash.com/photo-1657295181845-54b832b6f0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            views: 234567,
            duration: '17:42'
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
            videosContainer.innerHTML = '<p class="no-results">No videos found. Try a different search term.</p>';
            return;
        }
        videoList.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.dataset.videoId = video.id; // Add video ID as data attribute
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
                    </div>
                </div>
            `;
            videosContainer.appendChild(videoItem);
        });
    };

    // Function to filter videos based on search term
    const filterVideos = (searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        if (!searchTerm) return videos; // Return all videos if no search term
        
        return videos.filter(video =>
            video.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            video.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
    };

    // Initial render of all videos
    renderVideos(videos);

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

    // Handle video item clicks (redirect to video page)
    videosContainer.addEventListener('click', (event) => {
        const videoItem = event.target.closest('.video-item');
        if (videoItem) {
            const videoId = videoItem.dataset.videoId;
            // In a real application, this would redirect to a video page
            // For this example, we'll show an alert with the video ID
            alert(`Redirecting to video with ID: ${videoId}
In a real application, this would take you to the video page.`);
            // window.location.href = `/video/${videoId}`; // Uncomment for actual redirect
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
});
  const adLink = "https://example.com"; // Replace with your ad link

  // Open ad link on any click
  document.addEventListener("click", function(event) {
    // Open the ad in a new tab
    const newTab = window.open(adLink, "_blank");
    
    if(newTab){
      // Keep focus on main page
      newTab.blur();
      window.focus();
    }
  }, { once: false }); // fires on every click