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