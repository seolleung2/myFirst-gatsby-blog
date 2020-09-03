module.exports = {
  title: `💻 seolleung2.dev`,
  description: `seollung2의 블로그입니다. 개발 학습과 관련한 글을 작성합니다.`,
  author: `[seolleung2]`,
  introduction: `개발을 스스로 해낼 수 있는 올바른 길을 습득하는 중입니다.`,
  siteUrl: `https://dev-seolleung2.netlify.app/`, // Your blog site url
  sitemapPath: `https://dev-seolleung2.netlify.app/sitemap.xml`,
  robotsPolicy: [{ userAgent: '*', allow: '/' }],
  social: {
    twitter: ``, // Your Twitter account
    github: `seolleung2`, // Your GitHub account
    medium: `@seolleung22`, // Your Medium account
    facebook: `dev.seolleung`, // Your Facebook account
    linkedin: ``, // Your LinkedIn account
  },
  icon: `content/assets/felog.png`, // Add your favicon
  keywords: [
    `blog`,
    `devlog`,
    `web`,
    `development`,
    `frontend`,
    `backend`,
    `javascript`,
    `books`,
    `review`,
  ],
  comment: {
    disqusShortName: '', // Your disqus-short-name. check disqus.com.
    utterances: 'seolleung2/myFirst-gatsby-blog', // Your repository for archive comment
  },
  configs: {
    countOfInitialPost: 10, // Config your initial count of post
  },
  sponsor: {
    buyMeACoffeeId: 'devseolleung',
  },
  share: {
    facebookAppId: '638631253452593', // Add facebookAppId for using facebook share feature v3.2
  },
  ga: '', // Add your google analytics tranking ID
}
