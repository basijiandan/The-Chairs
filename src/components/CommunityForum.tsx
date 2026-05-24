import React, { useState, useEffect } from 'react';
import { synthInstance } from './ToneSynth';
import { MessageSquare, Heart, PlusCircle, User, Tag, Calendar, Sparkles, Send, Filter } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  category: 'album' | 'concert' | 'lyric' | 'chat';
  author: string;
  content: string;
  likes: number;
  likedByUser?: boolean;
  comments: Comment[];
  createdAt: string;
}

const DEFAULT_POSTS: Post[] = [
  {
    id: 'p1',
    title: '《Shangri-La Is Over》里的吉他滑音音效简直是落日特饮！',
    category: 'album',
    author: '落日飞车在逃听众',
    content: '大家循环播放最新EP了吗？尤其是詠靖主导的双吉他滑音，有一种慵懒带点空气感的微醺，让人一听到就仿佛穿越到了海风吹过的台北盛夏。真心期待下月在Legacy的现场版乐器齐奏！',
    likes: 42,
    likedByUser: false,
    comments: [
      { id: 'c1-1', author: '海风椰子水', content: '同感同感！尤其是最末那段和声器乐垫音，听一次整个人都飘起来了。', createdAt: '2026-05-23' },
      { id: 'c1-2', author: 'Loner孤芳自赏', content: '《Lovely Loner》之后最好听的高中板梦幻独立流行，无可替代！', createdAt: '2026-05-24' }
    ],
    createdAt: '25分钟前'
  },
  {
    id: 'p2',
    title: '重温经典《Rollin\' On》：中板人生里的自洽与温柔治愈',
    category: 'lyric',
    author: '摇摆音乐显微镜',
    content: '这不仅是一首公路旅行之歌，那句“Rollin\' on my friends，我们将金黄色的落日，一颗颗揉进漫长的公路中”，是在对每一个迷茫、疲惫的下班人说：像夕阳缓缓沉入海面一样，放下执着，找到自己的中板生活，那就是最舒服的自洽浪漫。听到吉他尾奏真的感觉被海风温柔拥抱了。',
    likes: 89,
    likedByUser: false,
    comments: [
      { id: 'c2-1', author: '台北走失家', content: '写得太催泪了，上大学时拿着手绘地图去找去听他们的现场，就是这种纯真的感动。', createdAt: '2026-05-24' }
    ],
    createdAt: '2小时前'
  },
  {
    id: 'p3',
    title: '急求一张杭州MAO站或是上海Modern Sky站的门票！',
    category: 'concert',
    author: '手绘地图探路员',
    content: '杭州站的预售票售罄也太神速了吧！一秒钟就全部变成灰色的售罄状态。哪位乐迷同好手头有多余票或是行程变更需要退票的，跪求原价有偿转让一张，真的想去听现场版的《手绘地图》！拼车同行也可以！',
    likes: 15,
    likedByUser: false,
    comments: [
      { id: 'c3-1', author: '橘子色海汽水', content: '去小红书或者闲鱼蹲一蹲试试，听说今年现场安可曲目会根据大合唱预测呢！祝买到票！', createdAt: '2026-05-24' }
    ],
    createdAt: '5小时前'
  }
];

const CATEGORIES = {
  all: { label: '🌟 全部主题 / View All', count: 0 },
  album: { label: '📀 专辑与新作讨论', count: 0 },
  concert: { label: '📅 巡回演唱会 Live', count: 0 },
  lyric: { label: '🎧 歌曲意境解读', count: 0 },
  chat: { label: '🌿 歌迷悠闲吹水', count: 0 }
};

export default function CommunityForum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  
  // New Post Form Controls
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'album' | 'concert' | 'lyric' | 'chat'>('album');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  
  // New Inline Comment Controls (per post ID)
  const [commentInputs, setCommentInputs] = useState<Record<string, { author: string; content: string }>>({});
  
  // Expanded comment subpanels list
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  // Initialize posts from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem('chairs_fan_community_posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(DEFAULT_POSTS);
      }
    } else {
      setPosts(DEFAULT_POSTS);
      localStorage.setItem('chairs_fan_community_posts', JSON.stringify(DEFAULT_POSTS));
    }
  }, []);

  // Save changes to localStorage
  const savePosts = (updated: Post[]) => {
    setPosts(updated);
    localStorage.setItem('chairs_fan_community_posts', JSON.stringify(updated));
  };

  // Helper - Update categories counts live
  const getCategoryCount = (catKey: string) => {
    if (catKey === 'all') return posts.length;
    return posts.filter(p => p.category === catKey).length;
  };

  // Toggle Like with click synthesizer effect
  const handleLike = (postId: string) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const liked = !post.likedByUser;
        if (liked) {
          // Play a sharp sweet pitch
          synthInstance.playBeep(523.25, 0.08); // High C
        } else {
          // Soft pitch down
          synthInstance.playBeep(440.00, 0.08); // A
        }
        return {
          ...post,
          likes: liked ? post.likes + 1 : post.likes - 1,
          likedByUser: liked
        };
      }
      return post;
    });
    savePosts(updated);
  };

  // Submit Comments
  const submitComment = (postId: string) => {
    const input = commentInputs[postId];
    if (!input || !input.author.trim() || !input.content.trim()) {
      alert('请将大名和评论感悟均填写完整哦');
      return;
    }

    const updated = posts.map(post => {
      if (post.id === postId) {
        const newC: Comment = {
          id: `comment-${Date.now()}`,
          author: input.author,
          content: input.content,
          createdAt: '刚刚'
        };
        return {
          ...post,
          comments: [...post.comments, newC]
        };
      }
      return post;
    });

    savePosts(updated);
    
    // Clear comment input fields
    setCommentInputs({
      ...commentInputs,
      [postId]: { author: '', content: '' }
    });

    // Automatically expand comment section to show the new comment
    setExpandedComments({
      ...expandedComments,
      [postId]: true
    });

    // Play retro feedback chord chime
    synthInstance.playBeep(587.33, 0.08); // D5
  };

  // Publish New Forum Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) {
      alert('请将帖子标题、话题内容、以及乐迷昵称均编写完整~');
      return;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      author: newAuthor,
      content: newContent,
      likes: 0,
      likedByUser: false,
      comments: [],
      createdAt: '刚刚'
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // Reset Form Fields
    setNewTitle('');
    setNewAuthor('');
    setNewContent('');
    setShowAddForm(false);

    // Play a delightful vintage warm chord on successful publishing!
    synthInstance.playChords([261.63, 311.13, 392.00, 493.88], 0.8); // Cozy Cm9 vibe
  };

  // Filter posts
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="rounded-2xl border border-[#1A1A1A]/10 bg-vintage-paper p-6 sm:p-8 transition-all">
      {/* Editorial Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-serif italic font-light text-[#1A1A1A] flex items-center gap-2">
            🏖️ 椅子海岸独立粉丝社区 (The Chairs Lounge & Forum)
          </h2>
          <p className="text-xs text-stone-550 font-sans mt-0.5 animate-fade-in">
            和全网椅子乐迷一起，在这里分享新专辑听后感、拼门票、解读暖洋洋的和音意境
          </p>
        </div>
        
        {/* Playful publishing flag */}
        <button
          onClick={() => {
            synthInstance.playBeep(329.63, 0.05); // Soft prompt sound
            setShowAddForm(!showAddForm);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded text-xs font-semibold bg-[#1A1A1A] text-white hover:bg-stone-850 transition-colors shadow-xs select-none cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          {showAddForm ? '收起写作框 / Close' : '倾诉浪漫日落 / New Post'}
        </button>
      </div>

      {/* Slideout/Dropdown Creative Post Publish Form */}
      {showAddForm && (
        <form onSubmit={handleCreatePost} className="mb-8 p-5 sm:p-6 bg-[#EFEDE6] border border-[#1A1A1A]/10 rounded-xl space-y-4 animate-fade-in">
          <div className="border-b border-[#1A1A1A]/10 pb-2 mb-2">
            <h3 className="text-sm font-serif italic text-stone-900 font-bold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#D97706]" />
              落日收音台 / 发布你的讨论
            </h3>
            <p className="text-[10px] text-stone-500 font-sans">
              分享你在椅子和弦织体里听出的每一朵云和每一次海风
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Title */}
            <div className="md:col-span-8">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-600 mb-1">
                讨论主题 / Title
              </label>
              <input
                type="text"
                placeholder="例：在《手绘地图》的副歌里，手风琴的切入实在太妙了..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded bg-white border border-[#1A1A1A]/10 text-stone-900 focus:outline-[#1A1A1A]"
              />
            </div>

            {/* Category selection */}
            <div className="md:col-span-4">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-600 mb-1">
                选择分类板块 / Column
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded bg-white border border-[#1A1A1A]/10 text-stone-900 focus:outline-[#1A1A1A] font-medium"
              >
                <option value="album">📀 专辑与新作讨论</option>
                <option value="concert">📅 巡游演唱会 Live</option>
                <option value="lyric">🎧 歌曲解读/乐段</option>
                <option value="chat">🌿 悠闲吹水小屋</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Nickname */}
            <div className="md:col-span-4">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-600 mb-1">
                乐迷昵称 / Nickname
              </label>
              <input
                type="text"
                placeholder="例：散步到大稻埕"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full text-xs p-2.5 rounded bg-white border border-[#1A1A1A]/10 text-stone-900 focus:outline-[#1A1A1A]"
              />
            </div>
            
            {/* Secret tip code */}
            <div className="md:col-span-8 flex items-end">
              <div className="text-[10px] text-stone-500 font-mono italic p-2 border border-[#1A1A1A]/5 rounded w-full bg-white/40">
                🎸 编曲贴士：发帖成功后，网页音箱将自动播送一段由您触发的复古大调清响和弦。
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-600 mb-1">
              漫谈感言内容 / Discussion Body
            </label>
            <textarea
              rows={4}
              placeholder="在这儿写下你想对椅子乐迷倾诉的话..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded bg-white border border-[#1A1A1A]/10 text-stone-900 focus:outline-[#1A1A1A] leading-relaxed"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-transparent rounded cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#1A1A1A] hover:bg-stone-850 rounded shadow-xs cursor-pointer"
            >
              广播我的浪漫琴音 / Publish
            </button>
          </div>
        </form>
      )}

      {/* Category Horizontal Filter list - Beautiful Editorial Boxes */}
      <div className="flex items-center gap-2 mb-6 pb-2 overflow-x-auto select-none no-scrollbar">
        <Filter className="h-4 w-4 text-stone-500 shrink-0 hidden sm:block" />
        <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500 mr-2 shrink-0 hidden sm:block">
          FILTER / 筛选:
        </span>
        {Object.entries(CATEGORIES).map(([key, value]) => {
          const isActive = key === activeCategory;
          return (
            <button
              key={key}
              onClick={() => {
                synthInstance.playBeep(380 + Math.random() * 80, 0.05);
                setActiveCategory(key);
              }}
              className={`px-3 py-1.5 rounded text-[11px] font-medium shrink-0 transition-all border cursor-pointer ${
                isActive 
                  ? 'bg-[#1A1A1A] text-white border-transparent shadow-xs font-bold' 
                  : 'bg-[#EFEDE6]/30 border-[#1A1A1A]/10 text-stone-650 hover:bg-[#EFEDE6]/85 hover:text-stone-900'
              }`}
            >
              {value.label}
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] ${
                isActive ? 'bg-[#D97706] text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                {getCategoryCount(key)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Discussions Post List container */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-10 bg-[#EFEDE6]/20 border border-[#1A1A1A]/5 rounded-xl">
            <div className="text-3xl mb-2">🏖️</div>
            <p className="text-stone-500 text-xs italic font-serif">海平面波澜不惊，该板块暂时没有帖子讨论</p>
            <p className="text-[10px] text-stone-400 mt-1">来点击右上角“倾诉浪漫日落”写下第一份见解吧！</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isCommentsExpanded = !!expandedComments[post.id];
            
            // Generate temporary inline comment input states safety
            const currentCInput = commentInputs[post.id] || { author: '', content: '' };

            return (
              <div 
                key={post.id} 
                className="bg-[#FFFDFC] border border-[#1A1A1A]/10 rounded-xl p-5 sm:p-6 transition-transform hover:shadow-xs hover:border-[#1A1A1A]/20"
              >
                {/* Meta header labels */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`text-[9px] px-2 py-0.5 rounded-sm font-semibold tracking-wider uppercase inline-flex items-center gap-1 ${
                    post.category === 'album' ? 'bg-[#D97706]/10 text-[#D97706]' :
                    post.category === 'concert' ? 'bg-[#1A1A1A] text-white' :
                    post.category === 'lyric' ? 'bg-[#F9F7F2] text-[#1A1A1A] border border-[#1A1A1A]/10' :
                    'bg-emerald-100/40 text-emerald-800'
                  }`}>
                    {post.category === 'album' ? '📀 专辑与新作' :
                     post.category === 'concert' ? '📅 演出与巡更' :
                     post.category === 'lyric' ? '🎧 词曲意境' : '🌿 歌迷日常'}
                  </span>
                  
                  <span className="text-[10px] font-mono text-stone-400 select-none">
                    Posted by
                  </span>
                  <span className="text-[11px] font-sans font-bold text-stone-700 flex items-center gap-1">
                    <User className="h-3 w-3 text-stone-400" />
                    {post.author}
                  </span>
                  <span className="text-stone-300 select-none">•</span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {post.createdAt}
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="text-base sm:text-lg font-serif italic text-[#1A1A1A] font-light leading-snug mb-3">
                  {post.title}
                </h3>

                {/* Discussion details */}
                <p className="text-stone-850 text-xs sm:text-sm leading-relaxed font-sans font-light border-l border-stone-200 pl-3.5 whitespace-pre-wrap mb-4">
                  {post.content}
                </p>

                {/* Footer interactive toggles and counters bar */}
                <div className="flex flex-wrap items-center justify-between border-t border-[#1A1A1A]/10 pt-4 mt-2 gap-3 text-xs">
                  
                  <div className="flex items-center gap-4">
                    {/* Likes heart button */}
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all select-none cursor-pointer ${
                        post.likedByUser 
                          ? 'bg-[#D97706]/10 text-[#D97706] font-bold scale-102' 
                          : 'bg-[#EFEDE6]/40 hover:bg-[#EFEDE6]/80 text-stone-700'
                      }`}
                    >
                      <Heart className="h-4 w-4" fill={post.likedByUser ? "#D97706" : "none"} />
                      <span>点赞 / {post.likes}</span>
                    </button>

                    {/* Toggler logic */}
                    <button
                      onClick={() => {
                        synthInstance.playBeep(420, 0.05);
                        setExpandedComments({
                          ...expandedComments,
                          [post.id]: !isCommentsExpanded
                        });
                      }}
                      className="flex items-center gap-1.5 text-stone-550 hover:text-stone-900 transition-colors py-1 cursor-pointer select-none"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>
                        {isCommentsExpanded ? '收起评论' : '显示评论 /'} ({post.comments.length})
                      </span>
                    </button>
                  </div>

                  {/* Tiny metadata */}
                  <div className="text-[9px] font-mono text-stone-400 uppercase tracking-widest hidden md:block">
                     CHAIRS POST-REP {post.id.toUpperCase()}
                  </div>
                </div>

                {/* Expanded Inline Comments segment */}
                {isCommentsExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 bg-[#EFEDE6]/30 p-4 rounded-lg space-y-4 animate-fade-in">
                    
                    {/* Header line for comments */}
                    <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A]/60">
                      <span>Live Response / 深度讨论区</span>
                      <span>{post.comments.length} 回音已送达</span>
                    </div>

                    {/* Single Comment loop list */}
                    {post.comments.length === 0 ? (
                      <p className="text-stone-400 text-xs italic font-sans py-2">
                        尚无歌迷回音。快在下方写下你的第一句解读吧！
                      </p>
                    ) : (
                      <div className="space-y-3 pl-1">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-[#FFFDFC] p-3 rounded border border-[#1A1A1A]/5 shadow-3xs text-xs">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-stone-800 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                                {comment.author}
                              </span>
                              <span className="text-[10px] text-stone-450 font-mono select-none">
                                {comment.createdAt}
                              </span>
                            </div>
                            <p className="text-stone-700 leading-relaxed pl-1.5">
                              {comment.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Elegant Comment writing fields */}
                    <div className="space-y-2 border-t border-[#1A1A1A]/10 pt-4">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1 block">
                        📝 填写回音感悟 / Add Comment Response
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-2.5 items-start sm:items-center">
                        {/* Inline author nick */}
                        <div className="w-full sm:w-1/3">
                          <input
                            type="text"
                            placeholder="填写你的大名..."
                            value={currentCInput.author}
                            onChange={(e) => setCommentInputs({
                              ...commentInputs,
                              [post.id]: { ...currentCInput, author: e.target.value }
                            })}
                            className="w-full text-xs p-2 rounded bg-white border border-[#1A1A1A]/10 text-stone-950 focus:outline-[#1A1A1A]"
                          />
                        </div>

                        {/* Inline review text */}
                        <div className="flex-1 w-full relative flex gap-1.5">
                          <input
                            type="text"
                            placeholder="写下对他的见解..."
                            value={currentCInput.content}
                            onChange={(e) => setCommentInputs({
                              ...commentInputs,
                              [post.id]: { ...currentCInput, content: e.target.value }
                            })}
                            className="w-full text-xs p-2 rounded bg-white border border-[#1A1A1A]/10 text-stone-950 focus:outline-[#1A1A1A] pr-10"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                submitComment(post.id);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => submitComment(post.id)}
                            className="px-3.5 py-2 rounded bg-[#1A1A1A] hover:bg-stone-850 text-white flex items-center justify-center cursor-pointer shadow-3xs"
                            title="发送回音"
                          >
                            <Send className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
