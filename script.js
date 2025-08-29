document.addEventListener('DOMContentLoaded', () => {
    const videosContainer = document.querySelector('.videos-container');
    const postsContainer = document.querySelector('.posts-container');

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

    // Sample blog post data
    const blogPosts = [
        {
            title: 'The Rise of Virtual Reality Blogging',
            excerpt: 'Virtual reality is set to transform the blogging experience, offering immersive storytelling like never before.',
            date: 'August 28, 2025',
            link: '#'
        },
        {
            title: 'Monetizing Your Video Content',
            excerpt: 'Strategies and tips for creators to effectively monetize their video content across various platforms.',
            date: 'August 25, 2025',
            link: '#'
        },
        {
            title: 'Interactive Storytelling in the Digital Age',
            excerpt: 'How interactive elements are changing the narrative in online content and engaging audiences.',
            date: 'August 20, 2025',
            link: '#'
        }
    ];

    // Function to format view count
    const formatViews = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    // Function to render videos
    const renderVideos = () => {
        videosContainer.innerHTML = '';
        videos.forEach(video => {
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

    // Function to render blog posts
    const renderBlogPosts = () => {
        postsContainer.innerHTML = '';
        blogPosts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.classList.add('blog-post-item');
            postItem.innerHTML = `
                <div class="post-info">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span>${post.date}</span>
                        <a href="${post.link}">Read More</a>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postItem);
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
    renderVideos();
    renderBlogPosts();

    // Simulate view changes every 5 seconds
    setInterval(simulateViewChanges, 5000);

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