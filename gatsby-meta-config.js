module.exports = {
  title: `🌰DotoriLog`,
  description: `🌰도토리묵의 개발 블로그 입니다.`,
  author: `[DotoriMook]`,
  introduction: `프론트엔드 주니어 개발자 도토리묵의 기술개발 블로그 입니다.`,
  siteUrl: `https://dev-seolleung2.netlify.app/`, // Your blog site url
  sitemapPath: `https://dev-seolleung2.netlify.app/sitemap.xml`,
  robotsPolicy: [{ userAgent: '*', allow: '/' }],
  social: {
    twitter: `teddyjung8808`, // Your Twitter account
    github: `seolleung2`, // Your GitHub account
    medium: `@seolleung22`, // Your Medium account
    facebook: `dotorimook8808`, // Your Facebook account
    linkedin: ``, // Your LinkedIn account
    instagram: ``, // Your LinkedIn account
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
    `react`,
    `react native`,
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
  ga: '0', // Add your google analytics tranking ID
  ad: '', // Add your google adsense publisherId `ca-pub-xxxxxxxxxx`
}
