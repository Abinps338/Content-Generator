export default[
    {
        name: "Blog Title",
        desc: 'An AI tool that generate blog title depends  on your blog information',
        category:'Blog',
        icon:'https://cdn-icons-png.flaticon.com/128/13461/13461915.png',
        aiPrompt:'Give me 5 blog topic idea in bullet wise only based on give niche & outline and give me result in Rich text editor format',
        slug:'generate-blog-title',
        form: [
            {
                label:'Enter your blog niche',
                field:'input',
                name:'niche',
                required:true
            },
            {
                label:'Enter blog outline',
                field:'textarea',
                name:'outline',

            }
        ]
    },
    {
        name: " YoutubeDescription",
        desc: 'An AI tool that generate blog title depends  on your blog information',
        category:'Youtube tool',
        icon:'https://cdn-icons-png.flaticon.com/128/15647/15647797.png',
        aiPrompt:'Generate youtube description with emoji under 4-5 sentences',
        slug:'youtube-description',
        form: [
            {
                label:'Enter your blog topic/tile',
                field:'input',
                name:'topic',
                required:true
            },
            {
                label:'Enter youtube Outline here',
                field:'textarea',
                name:'outline',

            }
        ]   
    },{
        name: "Blog Title",
        desc: 'An AI tool that generate blog title depends  on your blog information',
        category:'Blog',
        icon:'https://cdn-icons-png.flaticon.com/128/4693/4693321.png',
        aiPrompt:'Give me 5 blog topic idea in bullet wise only based on give niche & outline and give me result in Rich text editor format',
        slug:'generate-blog-title',
        form: [
            {
                label:'Enter your blog niche',
                field:'input',
                name:'niche',
                required:true
            },
            {
                label:'Enter blog outline',
                field:'textarea',
                name:'outline',

            }
        ]
    },
    {
        name: "Youtube Tags",
        desc: 'An AI tool that generate youtube tags depends  on your blog information',
        category:'Blog',
        icon:'https://cdn-icons-png.flaticon.com/128/10884/10884882.png',
        aiPrompt:'Generate 10 youtube tags in bulltet point based on the youtube title.',
        slug:'youtube-tag',
        form: [
            {
                label:'Enter your youtube title',
                field:'input',
                name:'niche',
                required:true
            },
            {
                label:'Enter youtube video Outline here (Optional)',
                field:'textarea',
                name:'outline',

            }
        ]
    },{
        name: 'Add Emoji to Text',
        desc:'An Ai tool that serves as your personal blog post tite',
        category: 'blog',
        icon:'https://cdn-icons-png.flaticon.com/128/18585/18585926.png',
        slug: 'add-emoji-to-text',
        aiPrompt: 'Add Emoji to outline text depends on outline and response ',
        form: [
            {
                label:"Enter your text to add emojis",
                field:'textarea',
                name:'outline',
                required:true
            }
        ]
    }
]