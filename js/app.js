    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const thumb = toggle.querySelector('.toggle-thumb');
    const label = toggle.querySelector('span');

    const setTheme = mode => {
      root.setAttribute('data-theme', mode);
      const isDark = mode === 'dark';
      toggle.setAttribute('aria-pressed', isDark);
      thumb.textContent = isDark ? '🌙' : '☀️';
      label.textContent = isDark ? 'Dark' : 'Light';
      localStorage.setItem('lumen-theme', mode);
    };

    const stored = localStorage.getItem('lumen-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored || (prefersDark ? 'dark' : 'light'));

    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next);
    });


const discordMembers = async ({ server }) => {
  try {
    const response = await fetch(`https://discord.com/api/v9/invites/${server}?with_counts=true&with_expiration=true`);
    const data = await response.json();
    
    // Get the member counts
    const memberCount = data.approximate_member_count;
    const onlineCount = data.approximate_presence_count;
    
    // Display the count on the page
    const heroActions = document.querySelector('.hero-actions');
    const memberDisplay = document.createElement('div');
    memberDisplay.className = 'member-count';
    memberDisplay.innerHTML = `
      <p style="margin-top: 1rem; font-size: 0.95rem; opacity: 0.9;">
        👥 <strong>${memberCount.toLocaleString()}</strong> members • 
        🟢 <strong>${onlineCount.toLocaleString()}</strong> online
      </p>
    `;
    heroActions.appendChild(memberDisplay);
    
  } catch (err) {
    console.error('Failed to fetch Discord member count:', err);
  }
}

if (document.querySelector('.hero-actions')) {
  discordMembers({ server: 'devscreate' });
}

// Team members functionality
// To get avatar URLs:
// 1. Right-click on user's avatar in Discord (browser version)
// 2. Click "Copy Image Address" or "Open Image in New Tab"
// 3. Paste the URL in avatarUrl field below
const teamMembers = [
  { 
    name: 'Alexx',
    avatarUrl: 'https://cdn.discordapp.com/avatars/1144267370769174608/ca49e2a83bab3d72cb1829591036209b.webp',
    role: 'Founder',
    roleColor: '#ff0000' // Replace with actual Discord role color
  },
  { 
    name: 'ブルータス',
    avatarUrl: 'https://cdn.discordapp.com/avatars/1419447976107184128/6091dae2b44a70a8d5ee02d06424db53.webp',
    role: 'Owner',
    roleColor: '#0086e6' // Replace with actual Discord role color
  },
  { 
    name: 'kbzx4',
    avatarUrl: 'https://cdn.discordapp.com/avatars/1339302301940322344/893a65951cd91dac07fac9ea93c6f243.webp',
    role: 'Management',
    roleColor: '#0080db' // Replace with actual Discord role color
  },
  { 
    name: 'ItzTreaty',
    avatarUrl: 'https://cdn.discordapp.com/avatars/876980860769955891/23c8abf6a0a10023cb8e8a1a7323f65a.webp',
    role: 'Management',
    roleColor: '#0080db' // Replace with actual Discord role color
  },
  { 
    name: 'Chara',
    avatarUrl: 'https://cdn.discordapp.com/avatars/1341372348741324801/ecf2e90e3cf5fb0488cc96e3db48fbf4.webp',
    role: 'Management',
    roleColor: '#0080db' // Replace with actual Discord role color
  },
  { 
    name: 'AFK / cm | averydoesmagic 🔥 105',
    avatarUrl: 'https://cdn.discordapp.com/avatars/567185519063203846/8125888cf7952d1e7168135ed59b2f4f.webp',
    role: 'Management',
    roleColor: '#0080db' // Replace with actual Discord role color
  },
  { 
    name: 'wintercoder1',
    avatarUrl: 'https://cdn.discordapp.com/avatars/983692760072745020/74b7f4384209d260797538f40953e02e.webp',
    role: 'Administrator',
    roleColor: '#0095ff' // Replace with actual Discord role color
  }
];

async function loadTeamMembers() {
  const grid = document.getElementById('team-grid');
  if (!grid) return;
  
  for (const member of teamMembers) {
    try {
      const card = document.createElement('div');
      card.className = 'card team-card';
      
      // Use provided avatar URL or fallback to placeholder
      const avatarUrl = member.avatarUrl && member.avatarUrl.trim() !== ''
        ? member.avatarUrl
        : 'https://cdn.discordapp.com/embed/avatars/0.png';
      
      card.innerHTML = `
        <img class="team-avatar" src="${avatarUrl}" alt="${member.name}">
        <h3 class="team-name" style="color: ${member.roleColor || 'var(--text)'}; text-shadow: 0 0 20px ${member.roleColor || 'transparent'}80, 0 0 40px ${member.roleColor || 'transparent'}40;">${member.name}</h3>
        <p class="team-role">${member.role}</p>
      `;
      
      grid.appendChild(card);
    } catch (err) {
      console.error('Failed to load team member:', err);
    }
  }
}

if (document.getElementById('team-grid')) {
  loadTeamMembers();
}

// Search functionality
const pages = [
  {
    title: 'Home',
    url: 'index.html',
    content: [
      'A discord server for developers, not like any other!',
      'We are a community of developers who are passionate about learning and sharing our knowledge with others.',
      'Diverse - We have a variety of channels for different languages and frameworks.',
      'Helpful - We are always here to help you with your projects and questions.',
      'Join the server'
    ]
  },
  {
    title: 'Team',
    url: 'team.html',
    content: [
      'Our team',
      'Meet the people behind DevsCreate.',
      ...teamMembers.map(m => `${m.name} - ${m.role}`)
    ]
  },
  {
    title: 'Contact',
    url: 'contact.html',
    content: [
      'Get in touch',
      'Connect with us through our social channels and community platforms.',
      'Discord Server - Join our community of developers',
      'GitHub - Check out our open source projects'
    ]
  }
];

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

if (searchInput && searchResults) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      searchResults.classList.remove('show');
      return;
    }
    
    const results = [];
    
    pages.forEach(page => {
      page.content.forEach(text => {
        if (text.toLowerCase().includes(query)) {
          results.push({ page: page.title, url: page.url, text });
        }
      });
    });
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
      searchResults.classList.add('show');
      return;
    }
    
    const highlightQuery = (text, query) => {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<span class="search-result-highlight">$1</span>');
    };
    
    searchResults.innerHTML = results
      .slice(0, 10)
      .map(result => `
        <div class="search-result-item" onclick="window.location.href='${result.url}'">
          <div class="search-result-page">${result.page}</div>
          <div class="search-result-text">${highlightQuery(result.text, query)}</div>
        </div>
      `)
      .join('');
    
    searchResults.classList.add('show');
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchResults.classList.remove('show');
    }
  });
  
  // Prevent closing when clicking inside search container
  searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}