const usernames = [
  'equuskyanite',
  'uponearth',
  'appearbutterfly',
  'astronomyclapper',
  'arrangejoy',
  'flashfussy',
  'stainfencer',
  'drivingcanapes',
  'fluffcancers',
  'lacunauranium',
  'faultyutter',
  'mapanemia',
  'pencilbitter',
  'bottlegrape',
  'tilerblurt',
  'burkittglance',
  'hartebeestwashing',
  'colossallearning',
  'craftif',
  'openhoopoe'
]

const subreddits = [
  'tech',
  'thoughts',
  'politics',
  'religion',
  'games',
  'random'
]

const titles = [
  'Why I Hate awesome',
  '9 Ways awesome Can Make You Invincible',
  'In 10 Minutes, I\'ll Give You The Truth About awesome',
  '11 Methods Of awesome Domination',
  'OMG! The Best awesome Ever!',
  'You Don\'t Have To Be A Big Corporation To Start awesome',
  'How To Find The Right awesome For Your Specific Product(Service).',
  'Proof That awesome Really Works',
  'Avoid The Top 10 awesome Mistakes',
  '14 Days To A Better awesome',
  'Get Rid of awesome For Good',
  'Lies And Damn Lies About awesome',
  'The Secret of awesome'
]

const domains = [
  'example.com',
  'reddit.com',
  'facebook.com',
  'google.com',
  'localhost.com'
]

const tags = [
  'business',
  'social media',
  'conservative',
  'liberal',
  'react',
  'redux',
  'python',
  'machine-learning',
  'deep-learning',
  'fitness',
  'weightlifting'
]

const colors = [
  'green',
  'purple',
  'blue',
  'lightblue',
  'yellow',
  'red',
  'orange'
]

const textContent = [
  '	Hello! I am a software developer and over the years I found that I am extremely unproductive when it comes to finishing one task and then starting another right away. It is best noticeable when I complete something that took me more than one day and then I am guaranteed to not do anything productive for the rest of the last day(doing something for 3.5 days - unproductive for the half of the last day). Same applies to working on side projects. I am focused when I research one problem, implement it, but I have no willpower to continue to the next problem. This affects my career in a bad way and I am sure I am not unique and there are ways to fight it.',
  `After a few days of seemingly bizarre network errors from some, but not all, apps, I realized my phone wasn't getting an ipv4 address. After three calls with poor tech support bodies who didn't know what an ip address is, I tried Sprint's chat support. I was surprised when they promptly told me that all internet data is now ipv6. However, they said they could do a workaround for me.
    Moral, ipv6 is coming. Google says it is at 18% worldwide, and 34% in the US. https://www.google.com/intl/en/ipv6/statistics.html`,
  'Lately, we are writing glue code to connect a bunch of services which finance department pays for. Writing any service which can be acquired from the market is forbidden. Anyone else feels like this?',
  `	Hello HN, I know this is a vague question but for 2018, one of my goals is to improve giving feedback. Feedback as in technical code reviews and also feedback to my teammates and managers.
  There's a lot about how to improve giving feedback face to face but I've always struggled giving thorough code reviews and I'm looking for some suggestions and maybe techniques I can employ to give worthwhile feedback. Currently, I feel like most of my feedback is "oh you should explicitly check type here" or "has this been tested with a particular kind of user?" and nothing past that.

  Any help is appreciated!`,
  `	I'm seeing articles that talk about how Texas is becoming less popular.
    I'm starting a business that will be fairly small for a while (less than $100k for a few years).

    Should I bother doing a Delaware C-Corp, because if a patent troll sues me, I'd have to go to Delaware!

    Otherwise, should I just start a regular Wisconsin business ( or C-Corp )`
]

export function randomTextContent() {
  return textContent[getRandomInt(textContent.length)]
}

export function getRandomInt(maxNum) {
  return Math.floor(Math.random() * Math.floor(maxNum));
}

export function randomTitle() {
  return titles[getRandomInt(titles.length)];
}

export function randomNum() {
  return getRandomInt(10000);
}

export function randomUsername() {
  return usernames[getRandomInt(usernames.length)];
}

export function randomDomain() {
  return domains[getRandomInt(domains.length)]
}

export function randomSubmitTime() {
  return moment().subtract(getRandomInt(100), 'minutes').fromNow();
}

export function randomsubReddit() {
  return subreddits[getRandomInt(subreddits.length)]
}

export function randomColor() {
  return colors[getRandomInt(colors.length)]
}

export function randomThreeTags() {
  return [
    {
      name: tags[getRandomInt(tags.length)],
      link: '#',
      color: randomColor()
    },
    {
      name: tags[getRandomInt(tags.length)],
      link: '#',
      color: randomColor()
    },
    {
      name: tags[getRandomInt(tags.length)],
      link: '#',
      color: randomColor()
    }
  ]
}